import { NextPage } from 'next'
import Link from 'next/link'
import { Box, Button, Text } from '@mantine/core'

const Home: NextPage = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
		>
			<Text size='xl'>Save money while helping our enviroment!</Text>
			<Box
				sx={{
					display: 'felx',
					button: {
						margin: '16px',
					},
				}}
			>
				<Link href='/login'>
					<Button variant='default'>Login</Button>
				</Link>
				<Link href='/signup'>
					<Button>Signup</Button>
				</Link>
			</Box>
		</Box>
	)
}

export default Home
