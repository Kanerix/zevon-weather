import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/withSession'

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, password } = req.body.values

		if (typeof username !== 'string' || typeof password !== 'string') {
			res.status(400).json({ error: 'Invalid username or password' })
			return
		}

		const user = await prisma.user.findUnique({
			where: { username: username },
		})

		if (!user) {
			res.status(400).json({ error: 'User not found' })
			return
		}

		if (user.password !== password) {
			res.status(400).json({ error: 'Invalid password' })
			return
		}

		req.session.user = {
			id: user.id,
			username: user.username,
			isLoggedIn: true,
		}

		await req.session.save()
		res.send({ ok: true })
		return
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
		return
	}
}
