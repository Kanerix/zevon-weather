import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, password } = req.body

		if (typeof username !== 'string' || typeof password !== 'string') {
			console.log(typeof username, ' ', typeof password)
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
			isLoggedIn: true,
			username: user.username,
		}

		await req.session.save()
		res.send({ ok: true })
		return
	} catch (error) {
		console.error(error)
		return
	}
}
