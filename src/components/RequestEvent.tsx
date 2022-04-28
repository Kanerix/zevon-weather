import { Box, Button, Code, Paper, Text } from '@mantine/core'

import { RequestEvent } from '../@types/event'

interface Props {
	event: RequestEvent
}

export default function RequestEventComponent({ event }: Props) {
	const date = new Date(event.timeToExecute)

	return (
		<Paper
			p='md'
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text>{event.title}</Text>
				<Code>{event.endpoint}</Code>
				<Text>{'Kl ' + date.getHours() + '.' + date.getMinutes()}</Text>
				<Button variant='default'>Delete</Button>
			</Box>
		</Paper>
	)
}
