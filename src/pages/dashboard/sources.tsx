import { Grid, Paper } from '@mantine/core'
import type { NextPage } from 'next'
import { DashbaordHeader } from '../../components/DashboardHeader'

import DashboardLayout from '../../layouts/dashboard'

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
