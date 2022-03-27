import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EnergyChartProps {
	chartData: number[]
}

export default function EnergyChart({ chartData }: EnergyChartProps) {
	return (
		<Chart
			options={{
				chart: {
					id: 'basic-bar',
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
					categories: [
						'120 MIN',
						'105 MIN',
						'90 MIN',
						'75 MIN',
						'60 MIN',
						'45 MIN',
						'30 MIN',
						'15 MIN',
						'NOW',
					],
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
					data: chartData,
				},
			]}
			type='line'
		/>
	)
}
