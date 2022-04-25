import { Paper, Text } from '@mantine/core'
import type { NextPage } from 'next'

const Signup: NextPage = () => {
	return (
		<Paper
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Text>Signup</Text>
		</Paper>
	)
}

export default Signup
