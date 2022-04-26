import { Button, Center, Group, Paper, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import type { NextPage } from 'next'
import Link from 'next/link'
import { SignupResponse } from '../@types/api'

import { useAuth } from '../context/auth'

const Signup: NextPage = () => {
	const auth = useAuth()
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

	const handleSubmit = async (values: typeof form.values) => {
		const res = fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})

		try {
			const data = (await res).json() as unknown as SignupResponse
			if (data.error) {
				showNotification({
					id: 'error',
					autoClose: 5000,
					title: 'Error:',
					message: data.error,
					color: 'red',
					icon: <IconAlertCircle />,
				})
				return
			}

			if (data.token) {
				auth.setJwt(data.token)
				return
			}

			throw new Error('Auth servers seems to be down')
		} catch (e) {
			showNotification({
				id: 'signupError',
				autoClose: 5000,
				title: 'Error:',
				message: 'Auth servers seems to be down',
				color: 'red',
				icon: <IconAlertCircle />,
			})
			return
		}
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
						placeholder='gamername420'
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
