import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'
import { SignupResponse } from '../../@types/api'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		const { username, email, password, confirmPassword } = req.body

		console.log(req.body)

		if (!/^\S+@\S+$/.test(email)) {
			res.status(400).json({ error: 'Invalid email' })
			return
		}

		if (password !== confirmPassword) {
			res.status(400).json({ error: 'Passwords does not match' })
			return
		}

		await prisma.user.create({
			data: { username: username, email: email, password: password },
		})

		res.redirect(307, '/login')
		return
	} catch (error) {
		console.error(error)
		return
	}
}
