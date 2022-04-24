import type { NextApiRequest, NextApiResponse } from 'next'

type LoginData = {
	nameOrEmail: string
	password: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<LoginData>
) {
	if (req.method !== 'GET') {
		res.status(400).end('Bad request')
		return
	}
}
