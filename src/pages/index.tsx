import type { GetServerSideProps, NextPage } from 'next'
import { Box, Grid, DefaultMantineColor, Paper, Text } from '@mantine/core'

import EnergyChart from '../components/EnergyChart'

interface DataRowColumn {
	Index: number
	Name: string
	CombinedName: string
	Value: string
	DateTimeForData: string
}

interface DataRow {
	Name: string
	Columns: DataRowColumn[]
}

interface Data {
	data: {
		Rows: DataRow[]
	}
}

interface Props {
	chartData: {
		eastDenmark: number[]
		westDenmark: number[]
	}
	chartSeries: string[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const data = await fetch(
		'https://www.nordpoolgroup.com/api/marketdata/page/11?'
	)

	const json = (await data.json()) as Data

	let westDenmark: number[] = []
	let eastDenmark: number[] = []

	json.data.Rows.map((row) => {
		row.Columns.filter((column) => column.Name.startsWith('DK')).map(
			(column) => {
				if (column.Name == 'DK1') {
					westDenmark.push(parseInt(column.Value))
				} else {
					eastDenmark.push(parseInt(column.Value))
				}
			}
		)[0]

		return {
			westDenmark: westDenmark,
			eastDenmark: eastDenmark,
		}
	})

	const chartSeries = json.data.Rows.map((row) => {
		return row.Name
	}).reverse()

	return {
		props: {
			chartData: {
				westDenmark: westDenmark,
				eastDenmark: eastDenmark,
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
					<Text size='xl'>{price} EUR/MWh</Text>
					<Text>{footer}</Text>
				</Box>
			</Box>
		</Paper>
	)

	const AveragePrice = (array: number[]): number => {
		let sum = 0

		array.forEach((price) => {
			sum += price
		})

		return Math.round(sum / chartData.westDenmark.length)
	}

	const AveragePriceWest = AveragePrice(chartData.westDenmark)
	const AveragePriceEast = AveragePrice(chartData.eastDenmark)

	return (
		<Grid justify='center'>
			<Grid.Col md={12} lg={6} xl={4.5}>
				<PriceColumn
					color={
						AveragePriceEast < AveragePriceWest ? 'red' : 'green'
					}
					header='AVERAGE PRICE WEST'
					footer={`LAST ${chartSeries.length} DAYS`}
					price={AveragePriceWest}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={6} xl={4.5}>
				<PriceColumn
					color={
						AveragePriceEast > AveragePriceWest ? 'red' : 'green'
					}
					header='AVERAGE PRICE EAST'
					footer={`LAST ${chartSeries.length} DAYS`}
					price={AveragePriceEast}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={6} xl={4.5}>
				<PriceColumn
					color='blue'
					header='CURRENT PRICE'
					footer='WEST DENMARK'
					price={
						chartData.westDenmark[chartData.westDenmark.length - 1]
					}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={6} xl={4.5}>
				<PriceColumn
					color='blue'
					header='CURRENT PRICE'
					footer='EAST DENMARK'
					price={
						chartData.eastDenmark[chartData.eastDenmark.length - 1]
					}
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
						Energy prices (EUR/MWh)
					</Text>
					<EnergyChart
						chartData={chartData}
						chartSeries={chartSeries}
					/>
				</Paper>
			</Grid.Col>
		</Grid>
	)
}

export default Home
