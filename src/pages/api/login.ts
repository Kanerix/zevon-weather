<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
=======
import { sign } from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { LoginResponse } from '../../@types/api'
import prisma from '../../lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<LoginResponse>
) {
>>>>>>> main
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, password } = req.body

		if (typeof username !== 'string' || typeof password !== 'string') {
<<<<<<< HEAD
			console.log(typeof username, ' ', typeof password)
			res.status(400).json({ error: 'Invalid username or password' })
=======
			res.status(400).json({ error: 'Invalid input' })
>>>>>>> main
			return
		}

		const user = await prisma.user.findUnique({
			where: { username: username },
		})

		if (!user) {
<<<<<<< HEAD
			res.status(400).json({ error: 'User not found' })
=======
			res.status(400).json({ error: 'Invalid username or password' })
>>>>>>> main
			return
		}

		if (user.password !== password) {
<<<<<<< HEAD
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
=======
			res.status(400).json({ error: 'Invalid username or password' })
			return
		}

		const jwt = sign(user.username, process.env.JWT_SECRET!)
		res.status(200).json({ token: jwt })
		return
	} catch (error) {
		console.log(error)
>>>>>>> main
		return
	}
}
