import { Global } from '@mantine/core'

export function GlobalChartStyle() {
	return (
		<Global
			styles={[
				{
					'&.apexcharts-canvas': {
						'.apexcharts-xaxistooltip': {
							background: 'rgba(10,10,10,0.8)',
							border: 'none',
							borderRadius: 7,
							'&:before': { display: 'none' },
							'&:after': { display: 'none' },
						},
						'.apexcharts-tooltip.apexcharts-theme-dark': {
							background: 'rgba(10,10,10,0.8)',
							backdropFilter: 'blur(5px)',
							boxShadow: 'none',
							borderRadius: 7,
						},
					},
				},
				{},
			]}
		/>
	)
}
