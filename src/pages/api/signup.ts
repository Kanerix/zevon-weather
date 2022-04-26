import type { NextApiRequest, NextApiResponse } from 'next'

import { SignupResponse } from '../../@types/api'

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
			res.status(400).json({ error: 'Password does not match' })
			return
		}

		prisma.user.create({
			data: {
				username,
				email,
				password,
			},
		})
	} catch (error) {
		console.log(error)
	}
	return
}
