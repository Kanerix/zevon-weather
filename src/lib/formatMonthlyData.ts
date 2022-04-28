import { NordpoolData } from '../@types/nordpoolAPI'

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
			data.chartSeries.unshift(row.Name.replaceAll('&nbsp;', ' '))

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
