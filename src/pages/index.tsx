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
					<Chart
						options={{
							title: {
								text: 'Energy Price from the last hour',
							},
							chart: {
								id: 'basic-bar',
								toolbar: {
									show: false,
								},
							},
							xaxis: {
								title: {
									text: 'Time',
								},
								categories: [
									'60 MIN',
									'45 MIN',
									'30 MIN',
									'15 MIN',
									'NOW',
								],
							},
							yaxis: {
								title: {
									text: 'Price',
								},
							},
							stroke: {
								curve: 'smooth',
							},
							tooltip: {
								theme: 'dark',
							},
						}}
						series={[
							{
								name: 'Price',
								data: [23, 32, 38, 23, 32],
							},
						]}
						type='line'
					/>
				</Paper>
			</Grid.Col>
		</Grid>
	)
}

export default Home
