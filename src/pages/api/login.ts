import { sign } from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { LoginResponse } from '../../@types/api'
import prisma from '../../lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<LoginResponse>
) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, password } = req.body

		if (typeof username !== 'string' || typeof password !== 'string') {
			res.status(400).json({ error: 'Invalid input' })
			return
		}

		const user = await prisma.user.findUnique({
			where: { username: username },
		})

		if (!user) {
			res.status(400).json({ error: 'Invalid username or password' })
			return
		}

		if (user.password !== password) {
			res.status(400).json({ error: 'Invalid username or password' })
			return
		}

		const jwt = sign(user.username, process.env.JWT_SECRET!)
		res.status(200).json({ token: jwt })
		return
	} catch (error) {
		console.log(error)
		return
	}
}
