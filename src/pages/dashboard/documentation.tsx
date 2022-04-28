import { Grid, Paper } from '@mantine/core'
import type { NextPage } from 'next'

import DashbaordHeader from '../../components/DashboardHeader'
import DashboardLayout from '../../layouts/dashboard'
import { withSessionSsr } from '../../lib/withSession'
import { User } from '../../types/user'

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

const Docs: NextPage = () => {
	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col xl={9}>
					<DashbaordHeader header='Documentation' />
				</Grid.Col>
				<Grid.Col xl={9}>
					<Paper p='md'>sdfa</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Docs
