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
import type { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
		},
	})

	const handleSubmit = (values: typeof form.values) => console.log(values)

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
						type='email'
						label='Email'
						placeholder='your@email.com'
						{...form.getInputProps('email')}
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
