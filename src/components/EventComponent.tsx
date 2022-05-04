import { useRouter } from 'next/router'
import { Box, Button, Code, Paper, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import axios from 'axios'

import { EndpointEvent } from '../@types/event'

interface Props {
	event: EndpointEvent
	disabled?: boolean
}

export default function RequestEventComponent({ event, disabled }: Props) {
	const date = new Date(event.timeToExecute).toLocaleDateString('en-GB', {
		timeZone: 'Europe/Copenhagen',
		hour: 'numeric',
		minute: 'numeric',
	})

	const router = useRouter()

	const handleTest = async () => {
		if (disabled) {
			return
		}

		try {
			await axios.post('/api/event/test', {
				headers: {
					'Content-Type': 'application/json',
				},
				data: { endpoint: event.endpoint, type: event.type },
			})

			showNotification({
				autoClose: 5000,
				title: 'Success:',
				message: 'The request was successful',
				color: 'green',
				icon: <IconAlertCircle />,
			})
		} catch (error: any) {
			showNotification({
				autoClose: 5000,
				title: 'Error:',
				message: error?.message,
				color: 'red',
				icon: <IconAlertCircle />,
			})
		}
	}

	const handleDelete = async () => {
		if (disabled) {
			return
		}

		try {
			await axios.delete(`/api/event/delete`, {
				headers: {
					'Content-Type': 'application/json',
				},
				data: { id: event.id, type: event.type },
			})

			router.reload()
		} catch (error: any) {
			showNotification({
				autoClose: 5000,
				title: 'Error:',
				message: error?.response?.data.error,
				color: 'red',
				icon: <IconAlertCircle />,
			})
		}
	}

	return (
		<Paper
			p='md'
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text>{event.title}</Text>
				<Code
					sx={{
						maxWidth: '300px',
						overflow: 'hidden',
					}}
				>
					{event.endpoint}
				</Code>
				<Text>{event.type}</Text>
				<Text>{date}</Text>
				<Box>
					<Button variant='default' onClick={handleTest} mr='xs'>
						Test
					</Button>
					<Button variant='default' onClick={handleDelete}>
						Delete
					</Button>
				</Box>
			</Box>
		</Paper>
	)
}
