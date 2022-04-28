import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/withSession'

export default withSessionRoute(signinRoute)

async function signinRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, email, password, confirmPassword } = req.body.values

		if (
			typeof username !== 'string' ||
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string'
		) {
			res.status(400).json({ error: 'Invalid input' })
			return
		}

		if (!/^\S+@\S+$/.test(email)) {
			res.status(400).json({ error: 'Invalid email' })
			return
		}

		if (password !== confirmPassword) {
			res.status(400).json({ error: 'Passwords does not match' })
			return
		}

		const exsists = await prisma.user.findUnique({
			where: { username: username },
		})

		if (exsists) {
			res.status(400).json({ error: 'Username already exists' })
			return
		}

		const user = await prisma.user.create({
			data: { username: username, email: email, password: password },
		})

		req.session.user = {
			id: user.id,
			username: user.username,
			isLoggedIn: true,
		}

		await req.session.save()
		res.send({ ok: true })
		return
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
		console.error(error)
		return
	}
}
