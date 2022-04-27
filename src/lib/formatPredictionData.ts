import { NordpoolData } from '../@types/nordpoolApi'

interface PowerChartData {
	eastDenmark: number[]
	westDenmark: number[]
	chartSeries: string[]
}

export default function formatPredictionData(
	json: NordpoolData
): PowerChartData {
	const data: PowerChartData = {
		eastDenmark: [],
		westDenmark: [],
		chartSeries: [],
	}

	try {
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

			data.chartSeries.unshift(
				'Kl. ' + row.Name.replaceAll('&nbsp;', ' ')
			)

			for (let column of row.Columns.filter((column) =>
				column.Name.startsWith('DK')
			)) {
				if (column.Name == 'DK1') {
					data.eastDenmark.unshift(
						parseInt(column.Value.replaceAll(' ', ''))
					)
				} else {
					data.westDenmark.unshift(
						parseInt(column.Value.replaceAll(' ', ''))
					)
				}
			}
		}
	} catch (e) {
		console.error(e)
	}

	return data
}
