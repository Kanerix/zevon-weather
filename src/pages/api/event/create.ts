import { NextApiRequest, NextApiResponse } from 'next'
import { type } from 'os'

import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/withSession'

export default withSessionRoute(createEventRoute)

async function createEventRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(400).end('Bad request')
		return
	}

	try {
		if (!req.session.user || !req.session.user.isLoggedIn) {
			res.status(401).json({ error: 'Not authorized' })
			return
		}

		const { title, timeToExecute, endpoint, type } = req.body.values

		if (
			typeof title !== 'string' ||
			typeof timeToExecute !== 'string' ||
			typeof endpoint !== 'string' ||
			typeof type !== 'string'
		) {
			res.status(400).json({ error: 'Invalid input' })
			return
		}

		const user = await prisma.user.findUnique({
			where: { id: req.session.user.id },
		})

		if (!user) {
			res.status(400).json({ error: 'User not found' })
			return
		}

		await prisma.event.create({
			data: {
				title: title,
				type: type,
				timeToExecute: timeToExecute,
				endpoint: endpoint,
				user: { connect: { id: user.id } },
			},
		})

		res.send({ ok: true })
		return
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
		return
	}
}
