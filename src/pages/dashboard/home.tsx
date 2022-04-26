import type { GetStaticProps, NextPage } from 'next'
import { Box, Grid, DefaultMantineColor, Paper, Text } from '@mantine/core'

import PowerChart from '../../components/PowerChart'
import DashboardLayout from '../../layouts/dashboard'
import { Data } from '../../@types/powerData'

interface Props {
	chartData: {
		eastDenmark: number[]
		westDenmark: number[]
	}
	chartSeries: string[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const data = await fetch(
		'https://www.nordpoolgroup.com/api/marketdata/page/11?currency=,,DKK,DKK'
	)

	const json = (await data.json()) as Data

	let eastDenmark = []
	let westDenmark = []
	let chartSeries = []

	for (let row of json.data.Rows) {
		chartSeries.unshift(row.Name)

		for (let column of row.Columns.filter((column) =>
			column.Name.startsWith('DK')
		)) {
			if (column.Name == 'DK1') {
				eastDenmark.unshift(parseInt(column.Value.replaceAll(' ', '')))
			} else {
				westDenmark.unshift(parseInt(column.Value.replaceAll(' ', '')))
			}
		}
	}

	return {
		props: {
			chartData: {
				westDenmark: eastDenmark,
				eastDenmark: westDenmark,
			},
			chartSeries: chartSeries,
		},
	}
}

const Home: NextPage<Props> = ({ chartData, chartSeries }) => {
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
					<Text size='xl'>{price} DKK/MWh</Text>
					<Text>{footer}</Text>
				</Box>
			</Box>
		</Paper>
	)

	const AveragePrice = (array: number[]): number =>
		Math.round(array.reduce((a, b) => a + b, 0) / array.length)

	const AveragePriceWest = AveragePrice(chartData.westDenmark)
	const AveragePriceEast = AveragePrice(chartData.eastDenmark)

	const CurrentPriceWest =
		chartData.westDenmark[chartData.westDenmark.length - 1]
	const CurrentPriceEast =
		chartData.eastDenmark[chartData.eastDenmark.length - 1]

	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							AveragePriceEast < AveragePriceWest
								? 'red'
								: 'green'
						}
						header='AVERAGE PRICE WEST'
						footer={`LAST ${chartSeries.length} DAYS`}
						price={AveragePriceWest}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							AveragePriceEast > AveragePriceWest
								? 'red'
								: 'green'
						}
						header='AVERAGE PRICE EAST'
						footer={`LAST ${chartSeries.length} DAYS`}
						price={AveragePriceEast}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							CurrentPriceEast < CurrentPriceWest
								? 'red'
								: 'green'
						}
						header='WEST DENMARK'
						footer='CURRENT PRICE'
						price={CurrentPriceWest}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							CurrentPriceEast > CurrentPriceWest
								? 'red'
								: 'green'
						}
						header='EAST DENMARK'
						footer='CURRENT PRICE'
						price={CurrentPriceEast}
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
							Power prices last month
						</Text>
						<Text
							size='xl'
							sx={{
								marginBottom: '12px',
							}}
						>
							Power prices (DKK/MWh)
						</Text>
						<PowerChart
							chartData={chartData}
							chartSeries={chartSeries}
						/>
					</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Home
