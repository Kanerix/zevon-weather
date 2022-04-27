import { Text, Box } from '@mantine/core'

export default function Custom404() {
	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<Text
					size='xl'
					sx={{
						borderRight: '1px solid',
						paddingRight: '8px',
						marginRight: '8px',
					}}
				>
					404
				</Text>
				<Text
					size='xl'
					sx={{
						textAlign: 'center',
					}}
				>
					Siden blev ikke fundet
				</Text>
			</Box>
		</Box>
	)
}
