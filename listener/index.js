import { Prisma } from '@prisma/client'

const prisma = new Prisma()

setInterval(async () => {
	const events = prisma.event.findMany({})

	console.log(events)
}, 1000)
