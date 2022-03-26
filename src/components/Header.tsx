import Link from 'next/link'
import {
	Text,
	Header,
	Box,
	Code,
	UnstyledButton,
	MediaQuery,
	Burger,
	useMantineTheme,
} from '@mantine/core'
import { IconCloud } from '@tabler/icons'
import { Dispatch, SetStateAction } from 'react'

interface MyHeaderProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export default function MyHeader(props: MyHeaderProps) {
	const theme = useMantineTheme()

	return (
		<Header height={60} p='xs'>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					height: '100%',
				}}
			>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={props.open}
						onClick={() => props.setOpen((o) => !o)}
						size='sm'
						color={theme.colors.gray[6]}
						mr='xl'
					/>
				</MediaQuery>
				<Link href='/' passHref>
					<UnstyledButton>
						<MediaQuery
							smallerThan='sm'
							styles={{ display: 'none' }}
						>
							<Box>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<IconCloud
										size='39px'
										color='#339af0'
										fill='#339af0'
										stroke='none'
									/>
									<Text
										sx={{
											paddingInline: '10px',
										}}
										size='xl'
									>
										<strong>Zevon Weather</strong>
									</Text>
									<Code>v0.0.1</Code>
								</Box>
							</Box>
						</MediaQuery>
					</UnstyledButton>
				</Link>
			</Box>
		</Header>
	)
}
