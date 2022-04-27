import { Box, DefaultMantineColor, Text, Paper } from '@mantine/core'

interface Props {
	color: DefaultMantineColor
	header: string
	footer: string
	price: number
}

export default function PriceColumn({ color, header, footer, price }: Props) {
	return (
		<Paper p='md'>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Text
					color={color}
					sx={{
						paddingRight: '16px',
						marginRight: '16px',
						fontSize: '34px',
						fontWeight: '500',
						borderRight: '2px solid #9f9f9f',
					}}
				>
					{price}
				</Text>
				<Box>
					<Text>{header}</Text>
					<Text size='xl'>{price} DKK/MWh</Text>
					<Text>{footer}</Text>
				</Box>
			</Box>
		</Paper>
	)
}
