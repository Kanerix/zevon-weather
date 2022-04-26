import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { useState } from 'react'

import { GlobalChartStyle } from '../components/GlobalChartStyle'
import AuthProvider from '../context/auth'
import { NotificationsProvider } from '@mantine/notifications'

export default function (props: AppProps) {
	const [open, setOpen] = useState(false)

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
			<AuthProvider>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'dark',
						fontFamily: 'Poppins',
					}}
				>
					<NotificationsProvider>
						<Component {...pageProps} />
					</NotificationsProvider>
				</MantineProvider>
			</AuthProvider>
		</>
	)
}
