import type { NextPage } from 'next'
import Link from 'next/link'
import {
	Button,
	Center,
	Checkbox,
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

const Signup: NextPage = () => {
	const form = useForm({
		initialValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			termsOfService: false,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
			password: (value) =>
				value.length > 8
					? null
					: 'Password must be at least 8 characters',
			termsOfService: (value) =>
				value ? null : 'You must agree to the terms of service',
		},
	})

	const { mutateUser } = useUser({
		redirectTo: '/dashboard/home',
	})

	const handleSubmit = async (values: typeof form.values) => {
		mutateUser(async () => {
			try {
				const res = await axios.post('/api/auth/signup', {
					headers: {
						'Content-Type': 'application/json',
					},
					values,
				})

				return await res.data
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
						Signup
					</Text>
					<TextInput
						mb='md'
						required
						id='email'
						type='email'
						label='Email'
						placeholder='your@email.com'
						{...form.getInputProps('email')}
					/>
					<TextInput
						mb='md'
						required
						id='username'
						type='text'
						label='Username'
						placeholder='gamertag420'
						{...form.getInputProps('username')}
					/>
					<TextInput
						mb='md'
						required
						id='password'
						type='password'
						label='Password'
						placeholder='********'
						{...form.getInputProps('password')}
					/>
					<TextInput
						mb='md'
						required
						id='confirmPassword'
						type='password'
						label='Confirm password'
						placeholder='********'
						{...form.getInputProps('confirmPassword')}
					/>
					<Checkbox
						mb='md'
						id='termsOfService'
						label='I agree to sell my privacy'
						{...form.getInputProps('termsOfService', {
							type: 'checkbox',
						})}
					/>
					<Group position='right' mb='md'>
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
