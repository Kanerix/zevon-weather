import { Text, Header, Box, Code, UnstyledButton } from '@mantine/core'
import { IconCloud } from '@tabler/icons'
import Link from 'next/link'

export default function MyHeader() {
	return (
		<Header height={60} p='xs'>
			<Link href='/' passHref>
				<UnstyledButton>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '100%',
						}}
					>
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
						</Box>
						<Code>v0.0.1</Code>
					</Box>
				</UnstyledButton>
			</Link>
		</Header>
	)
}
