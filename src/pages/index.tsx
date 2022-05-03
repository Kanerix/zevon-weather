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
			<Text
				size='xl'
				sx={{
					fontSize: '40px',
					textAlign: 'center',
					fontWeight: 'bold',
					marginBottom: '30px',
				}}
			>
				Zevon Weather
			</Text>
			<Text
				size='xl'
				sx={{
					fontSize: '40px',
					textAlign: 'center',
					marginBottom: '30px',
				}}
			>
				Save money while <br /> helping our enviroment!
			</Text>
			<Box
				sx={{
					display: 'felx',
					button: {
						margin: '16px',
					},
				}}
			>
				<Link href='/login'>
					<Button variant='default' size='xl'>
						Login
					</Button>
				</Link>
				<Link href='/signup'>
					<Button size='xl'>Signup</Button>
				</Link>
			</Box>
		</Box>
	)
}

export default Home
