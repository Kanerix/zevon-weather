import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/withSession'

export default withSessionRoute(createEventRoute)

async function createEventRoute(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'DELETE') {
		res.status(400).end('Bad request')
		return
	}

	try {
		if (!req.session.user || !req.session.user.isLoggedIn) {
			res.status(401).json({ error: 'Not authorized' })
			return
		}

		const id = req.body.id

		if (typeof id !== 'string') {
			res.status(400).json({ error: 'Invalid input' })
			return
		}

		const event = await prisma.event.findUnique({
			where: { id: id },
		})

		if (!event) {
			res.status(400).json({ error: 'Event not found' })
			return
		}

		await prisma.event.delete({
			where: { id: id },
		})

		res.send({ ok: true })
		return
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
		return
	}
}
