import { Grid, Paper } from '@mantine/core'
import type { NextPage } from 'next'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import { withSessionSsr } from '../../lib/withSession'
import { User } from '../../@types/user'

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
	const user = req.session.user

	if (user === undefined) {
		res.setHeader('location', '/login')
		res.statusCode = 302
		res.end()

		return {
			props: {
				user: { username: '', email: '', isLoggedIn: false } as User,
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
						https://www.nordpoolgroup.com/api/navigation/grid
					</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Sources
