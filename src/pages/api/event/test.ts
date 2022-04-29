import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import axios from 'axios'

import { sessionOptions } from '../../../lib/withSession'

export default withIronSessionApiRoute(testEventRoute, sessionOptions)

async function testEventRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		if (!req.session.user || !req.session.user.isLoggedIn) {
			res.status(401).json({ error: 'Not authorized' })
			return
		}

		const { endpoint, type } = req.body.data

		if (typeof endpoint !== 'string' || typeof type !== 'string') {
			res.status(400).json({ error: 'Invalid input' })
			return
		}

		try {
			const testRes = await axios(endpoint, {
				method: type,
			})

			res.status(testRes.status).send({ ok: true })
			return
		} catch (error: any) {
			res.status(400).json({ error: error.message })
			return
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
		return
	}
}
