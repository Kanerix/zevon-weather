import { ReactNode, useState } from 'react'
import { AppShell } from '@mantine/core'

import MyNavbar from '../components/Navbar'
import MyHeader from '../components/Header'

export default function Layout({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<AppShell
				navbar={<MyNavbar open={open} setOpen={setOpen} />}
				header={<MyHeader open={open} setOpen={setOpen} />}
				fixed
				styles={(theme) => ({
					main: {
						backgroundColor: theme.colors.dark[8],
					},
				})}
			>
				{children}
			</AppShell>
		</>
	)
}
