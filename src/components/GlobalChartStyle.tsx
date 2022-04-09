import { Global } from '@mantine/core'

export function GlobalChartStyle() {
	return (
		<Global
			styles={[
				{
					'&.apexcharts-canvas': {
						'.apexcharts-xaxistooltip.apexcharts-theme-dark': {
							background: 'rgba(10,10,10,0.8)',
							backdropFilter: 'blur(2px)',
							border: 'none',
							borderRadius: 7,
							'&:before': { display: 'none' },
							'&:after': { display: 'none' },
						},
						'.apexcharts-tooltip.apexcharts-theme-dark': {
							background: 'rgba(10,10,10,0.8)',
							backdropFilter: 'blur(2px)',
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
