import { AppProps } from 'next/app'
import Head from 'next/head'
import { AppShell, MantineProvider } from '@mantine/core'
import { useState } from 'react'

import MyNavbar from '../components/Navbar'
import MyHeader from '../components/Header'
import { GlobalChartStyle } from '../components/GlobalChartStyle'

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
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
					fontFamily: 'Poppins',
				}}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	)
}
