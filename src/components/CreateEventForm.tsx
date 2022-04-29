import { useRouter } from 'next/router'
import { Button, Group, Paper, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconClock } from '@tabler/icons'
import axios from 'axios'

export default function CreateEventPopup() {
	const router = useRouter()
	const form = useForm({
		initialValues: {
			title: '',
			endpoint: '',
			type: '',
			timeToExecute: new Date(),
		},
		validate: {
			type: (value) =>
				['POST', 'PUT', 'DELETE', 'GET'].includes(value)
					? null
					: 'Invalid type',
		},
	})

	const handleSubmit = async (values: typeof form.values) => {
		try {
			await axios.post('/api/event/create', {
				headers: {
					'Content-Type': 'application/json',
				},
				values,
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
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput
				mb='md'
				required
				type='text'
				label='Title'
				placeholder='Turn on washer'
				{...form.getInputProps('title')}
			/>
			<TextInput
				mb='md'
				required
				type='text'
				label='Endpoint'
				placeholder='http://example.com/api/enable'
				{...form.getInputProps('endpoint')}
			/>
			<TextInput
				mb='md'
				required
				type='text'
				label='Type'
				placeholder='POST'
				{...form.getInputProps('type')}
			/>
			<TimeInput
				mb='md'
				required
				clearable
				label='Event time'
				icon={<IconClock size={16} />}
				value={form.values.timeToExecute}
				onChange={(date) =>
					form.setFieldValue(
						'timeToExecute',
						(() => {
							const tomorrow = new Date(date)
							tomorrow.setDate(date.getDate() + 1)

							return tomorrow
						})()
					)
				}
			/>
			<Group position='right'>
				<Button fullWidth type='submit' mt='md'>
					Create
				</Button>
			</Group>
		</form>
	)
}
