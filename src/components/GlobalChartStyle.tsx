import { Global } from '@mantine/core'

export function GlobalChartStyle() {
	return (
		<Global
			styles={[
				{
					'&.apexcharts-canvas:hover': {
						'.apexcharts-xaxistooltip': {
							background: '#0a0a0a',
							border: 'none',
							opacity: 0.975,
							borderRadius: 7,
							'&:before': { display: 'none' },
							'&:after': { display: 'none' },
						},
						'.apexcharts-tooltip.apexcharts-theme-dark': {
							background: '#0a0a0a',
							boxShadow: 'none',
							opacity: 0.975,
							borderRadius: 7,
						},
					},
				},
				{},
			]}
		/>
	)
}
