import { useRouter } from 'next/router'
import Link from 'next/link'
import {
	DefaultMantineColor,
	Group,
	Navbar,
	Text,
	ThemeIcon,
	UnstyledButton,
} from '@mantine/core'
import {
	IconApi,
	IconDatabase,
	IconHelp,
	IconHome,
	TablerIconProps,
} from '@tabler/icons'
import { PropsWithChildren } from 'react'

interface Page {
	path: string
	label: string
	color: DefaultMantineColor
	icon: PropsWithChildren<TablerIconProps>
}

export default function MyNavbar() {
	const router = useRouter()

	const pages: Page[] = [
		{
			path: '/',
			label: 'Home',
			color: 'blue',
			icon: <IconHome />,
		},
		{
			path: '/database',
			label: 'Database',
			color: 'green',
			icon: <IconDatabase />,
		},
		{
			path: '/docs',
			label: 'Docs',
			color: 'violet',
			icon: <IconApi />,
		},
		{
			path: '/sources',
			label: 'Sources',
			color: 'red',
			icon: <IconHelp />,
		},
	]

	return (
		<Navbar width={{ base: 250 }} p='xs'>
			<Navbar.Section mt='xs'>
				{pages.map((item, index) => {
					const selected = router.asPath === item.path

					return (
						<Link key={index} href={item.path} passHref>
							<UnstyledButton
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
