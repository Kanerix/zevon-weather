import { Box, Divider, Text } from '@mantine/core'

interface Props {
	header: string
}

export function DashbaordHeader({ header }: Props) {
	return (
		<Box
			sx={{
				marginBottom: '1rem',
			}}
		>
			<Text
				sx={{
					fontSize: '36px',
				}}
			>
				{header}
			</Text>
			<Divider />
		</Box>
	)
}
