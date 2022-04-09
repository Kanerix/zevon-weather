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
	chartData: number[]
	chartSeries: string[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (
	context
) => {
	const data = await fetch(
		'https://www.nordpoolgroup.com/api/marketdata/page/11?'
	)

	const json = (await data.json()) as Data

	const chartData = json.data.Rows.map((row) => {
		return row.Columns.filter((column) => column.Name === 'DK1').map(
			(column) => parseInt(column.Value)
		)[0]
	}).reverse()

	const chartSeries = json.data.Rows.map((row) => {
		return row.Name
	}).reverse()

	console.log()

	return {
		props: {
			chartData: chartData,
			chartSeries: chartSeries,
		},
	}
}

const Home: NextPage<Props> = ({ chartData, chartSeries }) => {
	const resultStringyfied = (): string => {
		let stringify: string = ''

		let result = Math.round(
			(chartData[chartData.length - 1] / chartData[0] - 1) * 100
		)

		if (result > 0) {
			stringify += '+'
		}

		stringify += `${result}`

		return stringify
	}

	const PriceColumn = ({
		main,
		color,
		header,
		footer,
		price,
	}: {
		main: boolean
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

	return (
		<Grid justify='center'>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					main={false}
					color='green'
					header='LOW PRICE'
					footer={chartData[0] - 50 + ' away'}
					price={50}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					main={true}
					color='blue'
					header='CURRENT PRICE'
					footer='5 away'
					price={chartData[0]}
				/>
			</Grid.Col>
			<Grid.Col md={12} lg={4} xl={3}>
				<PriceColumn
					main={false}
					color='red'
					header='HIGH PRICE'
					footer={120 - chartData[0] + ' away'}
					price={120}
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
						Energy prices (DKK/MWh)
					</Text>
					<Text
						sx={(theme) => ({
							fontSize: '18px',
							fontWeight: '500',
							marginBottom: '24px',
							color: theme.colors.gray[6],
						})}
					>
						({resultStringyfied()}%) Last month
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
