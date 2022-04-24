import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface PowerChartProps {
	chartData: {
		westDenmark: number[]
		eastDenmark: number[]
	}
	chartSeries: string[]
}

export default function PowerChart({
	chartData,
	chartSeries,
}: PowerChartProps) {
	return (
		<Chart
			options={{
				chart: {
					id: 'Power-chart',
					background: 'transparent',
					fontFamily: 'Poppins',
					foreColor: '#909090',
					toolbar: {
						show: false,
					},
					zoom: {
						enabled: false,
					},
					animations: {
						enabled: false,
					},
					sparkline: {
						enabled: false,
					},
				},
				xaxis: {
					crosshairs: {
						stroke: {
							color: '#808080',
						},
					},
					axisBorder: {
						show: false,
					},
					axisTicks: {
						show: false,
					},
					categories: chartSeries,
				},
				states: {
					normal: {
						filter: {
							type: 'none',
						},
					},
					hover: {
						filter: {
							type: 'none',
						},
					},
					active: {
						allowMultipleDataPointsSelection: false,
						filter: {
							type: 'none',
						},
					},
				},
				yaxis: {
					labels: {
						formatter: (value) => value + ' DKK',
					},
				},
				stroke: {
					curve: 'smooth',
					lineCap: 'round',
				},
				grid: {
					show: true,
					strokeDashArray: 4,
					borderColor: '#909090',
				},
				markers: {
					strokeColors: ['#1a1b1e'],
				},
				theme: {
					mode: 'dark',
					palette: 'palette1',
				},
			}}
			series={[
				{
					name: 'Price west',
					type: 'line',
					data: chartData.westDenmark,
				},
				{
					name: 'Price east',
					type: 'line',
					data: chartData.eastDenmark,
				},
			]}
		/>
	)
}
