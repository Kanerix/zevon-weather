import { Global } from '@mantine/core'

export function GlobalChartStyle() {
	return (
		<Global
			styles={[
				{
					'&.apexcharts-canvas': {
						'.apexcharts-xaxistooltip': {
							background: '#0a0a0a',
							border: 'none',
							opacity: 0.975,
							borderRadius: 5,
							'&:before': { borderBottomColor: 'transparent' },
							'&:after': { borderBottomColor: 'transparent' },
						},
						'.apexcharts-tooltip.apexcharts-theme-dark': {
							background: '#0a0a0a',
							boxShadow: 'none',
							opacity: 0.975,
							borderRadius: 5,
						},
					},
				},
				{},
			]}
		/>
	)
}
