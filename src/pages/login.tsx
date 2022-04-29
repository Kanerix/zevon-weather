import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, Center, Group, Paper, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import axios from 'axios'

import useUser from '../lib/useUser'

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
				const res = await axios.post('/api/auth/login', {
					headers: {
						'Content-Type': 'application/json',
					},
					values,
				})

				return await res.data
			} catch (error: any) {
				showNotification({
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
						mb='md'
						required
						type='text'
						label='Username'
						placeholder='gamertag123'
						{...form.getInputProps('username')}
					/>

					<TextInput
						mb='md'
						required
						type='password'
						label='Password'
						placeholder='********'
						{...form.getInputProps('password')}
					/>
					<Group position='right'>
						<Button type='submit' fullWidth mt='md'>
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
