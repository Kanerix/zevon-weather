import { useRouter } from 'next/router'
import { Box, Button, Code, Paper, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import axios from 'axios'

import { RequestEvent } from '../@types/event'

interface Props {
	event: RequestEvent
}

export default function RequestEventComponent({ event }: Props) {
	const date = new Date(event.timeToExecute)

	const router = useRouter()

	const handleTest = async () => {
		try {
			await axios.get(event.endpoint)

			showNotification({
				id: 'error',
				autoClose: 5000,
				title: 'Success:',
				message: 'The request was successful',
				color: 'green',
				icon: <IconAlertCircle />,
			})
		} catch (error: any) {
			showNotification({
				id: 'error',
				autoClose: 5000,
				title: 'Error:',
				message: error?.response?.data.error,
				color: 'red',
				icon: <IconAlertCircle />,
			})
		}
	}

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/event/delete`, {
				headers: {
					'Content-Type': 'application/json',
				},
				data: event.id,
			})

			router.reload()
		} catch (error: any) {
			showNotification({
				id: 'error',
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
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Text>{event.title}</Text>
				<Code>{event.endpoint}</Code>
				<Text>{'Kl ' + date.getHours() + '.' + date.getMinutes()}</Text>
				<Button variant='default' onClick={handleDelete}>
					Delete
				</Button>
			</Box>
		</Paper>
	)
}
