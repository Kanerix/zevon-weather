import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import {
	Group,
	Navbar,
	Paper,
	Text,
	ThemeIcon,
	UnstyledButton,
} from '@mantine/core'
import { IconApi, IconHelp, IconHome, IconAlarm } from '@tabler/icons'

import { Page } from '../@types/page'

interface MyNavbarProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export default function MyNavbar(props: MyNavbarProps) {
	const router = useRouter()

	const pages: Page[] = [
		{
			path: '/dashboard/home',
			label: 'Home',
			color: 'blue',
			icon: <IconHome />,
		},
		{
			path: '/dashboard/automation',
			label: 'Automation',
			color: 'green',
			icon: <IconAlarm />,
		},
		{
			path: '/dashboard/documentation',
			label: 'Documentation',
			color: 'violet',
			icon: <IconApi />,
		},
		{
			path: '/dashboard/sources',
			label: 'Sources',
			color: 'red',
			icon: <IconHelp />,
		},
	]

	return (
		<Navbar
			p='xs'
			hiddenBreakpoint='sm'
			hidden={!props.open}
			width={{ sm: 210, md: 250 }}
		>
			<Navbar.Section mt='xs'>
				{pages.map((item, index) => {
					const selected = router.asPath === item.path

					return (
						<Link key={index} href={item.path} passHref>
							<UnstyledButton
								onClick={() => {
									if (props.open) {
										props.setOpen(false)
									}
								}}
								sx={(theme) => ({
									display: 'block',
									width: '100%',
									padding: theme.spacing.xs,
									marginBottom: '4px',
									borderRadius: theme.radius.sm,
									color: theme.colors.dark[0],
									textDecoration: 'none',
									background: selected
										? theme.colors.dark[6]
										: theme.colors.dark[7],
									'&:hover': {
										background: theme.colors.dark[6],
									},
								})}
							>
								<Group>
									<ThemeIcon
										color={item.color}
										variant='light'
									>
										{item.icon}
									</ThemeIcon>
									<Text>{item.label}</Text>
								</Group>
							</UnstyledButton>
						</Link>
					)
				})}
			</Navbar.Section>
		</Navbar>
	)
}
