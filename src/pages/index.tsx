import type { NextPage } from 'next'
import { Box, Grid, DefaultMantineColor, Paper, Text } from '@mantine/core'
import EnergyChart from '../components/EnergyChart'

const Home: NextPage = () => {
	const PriceColumn = ({
		color,
		header,
		footer,
		price,
	}: {
		color: DefaultMantineColor
		header: string
		footer: string
		price: number
	}) => (
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
					<Text size='xl'>{price} DKK/Energy</Text>
					<Text>{footer}</Text>
				</Box>
			</Box>
		</Paper>
	)

	return (
		<Grid justify='center'>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					color='red'
					header='Low'
					footer='13 away'
					price={23}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					color='blue'
					header='Medium'
					footer='5 away'
					price={32}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					color='green'
					header='High'
					footer='9 away'
					price={38}
				/>
			</Grid.Col>
			<Grid.Col xl={9}>
				<Paper p='xl'>
					<Text
						sx={{
							fontSize: '28px',
							fontWeight: '500',
							marginBottom: '12px',
						}}
					>
						Energy prices
					</Text>
					<Text
						sx={(theme) => ({
							fontSize: '18px',
							fontWeight: '500',
							marginBottom: '24px',
							color: theme.colors.gray[6],
						})}
					>
						(+45%) Last 120 minutes
					</Text>
					<EnergyChart />
				</Paper>
			</Grid.Col>
		</Grid>
	)
}

export default Home
