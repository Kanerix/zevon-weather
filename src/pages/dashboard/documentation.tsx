import { Grid, Paper } from '@mantine/core'
import type { NextPage } from 'next'

import { DashbaordHeader } from '../../components/DashboardHeader'
import DashboardLayout from '../../layouts/dashboard'

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
