import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EnergyChartProps {
	chartData: number[]
}

export default function EnergyChart({ chartData }: EnergyChartProps) {
	const average = Math.round(
		chartData.reduce((a, b) => a + b, 0) / chartData.length
	)

	return (
		<Chart
			options={{
				chart: {
					id: 'energy-chart',
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
					categories: [
						'120 MIN',
						'105 MIN',
						'90 MIN',
						'75 MIN',
						'60 MIN',
						'45 MIN',
						'30 MIN',
						'15 MIN',
						'0 MIN',
					],
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
					name: 'Price',
					type: 'line',
					data: chartData,
				},
			]}
		/>
	)
}
