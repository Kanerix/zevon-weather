import { Grid, Text, Paper, Code } from '@mantine/core'
import type { NextPage } from 'next'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import { withSessionSsr } from '../../lib/withSession'
import { User } from '../../@types/user'
import Link from 'next/link'

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
	const user = req.session.user

	if (user === undefined) {
		res.setHeader('location', '/login')
		res.statusCode = 302
		res.end()

		return {
			props: {
				user: { id: '', username: '', isLoggedIn: false } as User,
			},
		}
	}

	return {
		props: { user: req.session.user },
	}
})

const Sources: NextPage = () => {
	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col xl={9}>
					<DashbaordHeader header='Sources' />
				</Grid.Col>
				<Grid.Col xl={9}>
					<Paper p='md'>
						<Text
							sx={{
								fontSize: '28px',
								fontWeight: '500',
							}}
							mb='xs'
						>
							Nordpool
						</Text>
						<Text my='xs' size='lg'>
							All our data comes from a website hosted by a
							company called Nordpool. Nordpool runs the leading
							power market in Europe offerring day-ahed and
							intraday markets for customers.
						</Text>
						<Text my='xs' size='lg'>
							If you wan't to learn more about Nordpool, you can
							visit them here:{' '}
							<Link href='https://www.nordpoolgroup.com/'>
								<Code
									sx={{ fontSize: '16px', cursor: 'pointer' }}
								>
									www.nordpoolgroup.com
								</Code>
							</Link>
						</Text>
					</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Sources
