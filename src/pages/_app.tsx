/* eslint-disable react/jsx-no-undef */
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AppShell, MantineProvider } from '@mantine/core'
import MyNavbar from '../components/Navbar'
import MyHeader from '../components/Header'

export default function App(props: AppProps) {
	const { Component, pageProps } = props

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
				}}
			>
				<AppShell
					navbar={<MyNavbar />}
					header={<MyHeader />}
					styles={(theme) => ({
						main: {
							backgroundColor: theme.colors.dark[8],
						},
					})}
				>
					<Component {...pageProps} />
				</AppShell>
			</MantineProvider>
		</>
	)
}
