import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, useMantineTheme } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import { GlobalChartStyle } from '../components/GlobalChartStyle'

export default function (props: AppProps) {
	const { Component, pageProps } = props

	return (
		<>
			<Head>
				<title>Zevon Weather</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<GlobalChartStyle />
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
					fontFamily: 'Poppins',
					primaryShade: 6,
				}}
			>
				<NotificationsProvider>
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
		</>
	)
}
