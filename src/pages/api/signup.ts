import type { NextApiRequest, NextApiResponse } from 'next'

type SignupData = {
	name: string
	email: string
	password: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<SignupData>
) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}
	// Create user
}
