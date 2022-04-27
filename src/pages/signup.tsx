import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, Center, Group, Paper, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'

import useUser from '../lib/useUser'
import axios from 'axios'

const Signup: NextPage = () => {
	const form = useForm({
		initialValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
		},
	})

	const { mutateUser } = useUser({
		redirectTo: '/dashboard/home',
	})

	const handleSubmit = async (values: typeof form.values) => {
		mutateUser(async () => {
			try {
				const res = await axios.post('/api/signup', {
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				})

				return await res.data
			} catch (error: any) {
				showNotification({
					id: 'error',
					autoClose: 5000,
					title: 'Error:',
					message: error.message,
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
						Signup
					</Text>
					<TextInput
						required
						type='email'
						label='Email'
						placeholder='your@email.com'
						{...form.getInputProps('email')}
					/>
					<TextInput
						required
						type='text'
						label='Username'
						placeholder='gamertag420'
						{...form.getInputProps('username')}
					/>
					<TextInput
						required
						type='password'
						label='Password'
						placeholder='********'
						{...form.getInputProps('password')}
					/>
					<TextInput
						required
						type='password'
						label='Confirm password'
						placeholder='********'
						{...form.getInputProps('confirmPassword')}
					/>
					<Group position='right' mt='md'>
						<Button type='submit' fullWidth>
							Signup
						</Button>
					</Group>
					<Group position='right' mt='md'>
						<Link href='/login'>
							<Text
								sx={{
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
							>
								Already have an account?
							</Text>
						</Link>
					</Group>
				</form>
			</Paper>
		</Center>
	)
}

export default Signup
