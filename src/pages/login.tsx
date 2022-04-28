import type { NextPage } from 'next'
import Link from 'next/link'
import {
	Box,
	Button,
	Center,
	Group,
	Paper,
	Text,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'

import useUser from '../lib/useUser'
import axios from 'axios'

const Login: NextPage = () => {
	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
	})

	const { mutateUser } = useUser({
		redirectTo: '/dashboard/home',
	})

	const handleSubmit = (values: typeof form.values) => {
		mutateUser(async () => {
			try {
				const res = await axios.post('/api/login', {
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				})

				return await res.data
			} catch (error: any) {
				console.log(error)
				showNotification({
					id: 'error',
					autoClose: 5000,
					title: 'Error:',
					message: error?.response?.data.error,
					color: 'red',
					icon: <IconAlertCircle />,
				})
			}
		})
	}

	return (
		<Center sx={{ height: '100vh' }}>
			<Paper
				p='md'
				withBorder
				sx={{
					maxWidth: 500,
					width: '100%',
					'& form .mantine-TextInput-root': {
						marginBottom: '36px',
					},
				}}
			>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Text
						sx={{
							display: 'flex',
							justifyContent: 'center',
							fontSize: '24px',
						}}
					>
						Login
					</Text>
					<TextInput
						required
						type='text'
						label='Username'
						placeholder='gamertag123'
						{...form.getInputProps('username')}
					/>

					<TextInput
						required
						type='password'
						label='Password'
						placeholder='********'
						{...form.getInputProps('password')}
					/>
					<Group position='right' mt='md'>
						<Button type='submit' fullWidth>
							Login
						</Button>
					</Group>
					<Group position='right' mt='md'>
						<Link href='/signup'>
							<Text
								sx={{
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
							>
								Don't have an account?
							</Text>
						</Link>
					</Group>
				</form>
			</Paper>
		</Center>
	)
}

export default Login
