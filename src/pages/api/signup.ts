import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { SignupResponse } from '../../@types/api'
import { sign } from 'jsonwebtoken'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SignupResponse>
) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, email, password, confirmPassword } = req.body

		if (!/^\S+@\S+$/.test(email)) {
			res.status(400).json({ error: 'Invalid email' })
			return
		}

		if (password !== confirmPassword) {
			res.status(400).json({ error: 'Passwords does not match' })
			return
		}

		const user = await prisma.user.create({
			data: { username: username, email: email, password: password },
		})

		const jwt = sign(user.username, process.env.JWT_SECRET!)

		res.status(200).json({ token: jwt })
		return
	} catch (error) {
		console.log(error)
		return
	}
}
