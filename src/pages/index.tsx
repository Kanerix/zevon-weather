import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Box, Grid, DefaultMantineColor, Paper, Text } from '@mantine/core'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

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
				<Paper p='md'>
					<Text size='xl'>Prices something:</Text>
					<Chart
						options={{
							chart: {
								id: 'basic-bar',
								toolbar: {
									show: false,
								},
							},
							xaxis: {
								categories: ['1', '2', '3', '4', '5'],
							},
							yaxis: {
								title: {
									text: 'Price (DKK/Energy)',
								},
							},
							stroke: {
								curve: 'smooth',
							},
						}}
						series={[{ name: 'Price', data: [23, 32, 38, 23, 32] }]}
						type='line'
					/>
				</Paper>
			</Grid.Col>
		</Grid>
	)
}

export default Home
