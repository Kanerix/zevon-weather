const { PrismaClient } = require('@prisma/client')
const axios = require('axios')

const prisma = new PrismaClient()

async function getEvents() {
	const events = await prisma.event.findMany({
		where: { type: { in: ['POST', 'PUT', 'GET', 'DELETE'] } },
	})

	if (events.length !== 0) {
		return events
	}

	return []
}

let events
let i = 11

setInterval(async () => {
	if (i > 10) {
		events = await getEvents()
		i = 0
	}

	if (events.length === 0) {
		return
	}

	for (let event of events) {
		const now = new Date()
		now.setHours(0, 0, 0)

		if (event.timeToExecute < now) {
			try {
				await prisma.event.delete({ where: { id: event.id } })
				const res = axios(event.endpoint, {
					method: event.type,
				})
				console.log('Deleted event: ' + event.id + ' ' + res.status)
			} catch (error) {
				console.log(error)
			}
		}
	}

	i++
}, 1000 * 60)
