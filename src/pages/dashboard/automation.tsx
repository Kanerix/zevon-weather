import type { GetStaticProps, NextPage } from 'next'
import { Grid, Paper, Text } from '@mantine/core'

import { Data } from '../../@types/powerData'
import PowerChart from '../../components/PowerChart'
import DashboardLayout from '../../layouts/dashboard'

export interface Props {
	chartData: {
		eastDenmark: number[]
		westDenmark: number[]
	}
	chartSeries: string[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const data = await fetch(
		'https://www.nordpoolgroup.com/api/marketdata/page/10?currency=,,DKK,DKK'
	)

	const json = (await data.json()) as Data

	let eastDenmark = []
	let westDenmark = []
	let chartSeries = []

	for (let row of json.data.Rows) {
		if (
			[
				'Min',
				'Max',
				'Average',
				'Peak',
				'Off-peak 1',
				'Off-peak 2',
			].includes(row.Name)
		) {
			continue
		}

		chartSeries.unshift('Kl. ' + row.Name.replaceAll('&nbsp;', ' '))

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

const Automation: NextPage<Props> = ({ chartData, chartSeries }) => {
	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col xl={9}>
					<Paper p='xl'>
						<Text
							sx={{
								fontSize: '28px',
								fontWeight: '500',
								marginBottom: '12px',
							}}
						>
							Power price predictions for
							{' ' +
								(() => {
									const today = new Date()

									let tomorrow = new Date()
									tomorrow.setDate(today.getDate() + 1)

									return tomorrow.toDateString()
								})()}
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
export default Automation
