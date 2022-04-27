import type { NextPage } from 'next'
import { Grid, Paper, Skeleton, Text } from '@mantine/core'
import axios from 'axios'
import useSWR from 'swr'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import PowerChart from '../../components/PowerChart'
import formatPredictionData from '../../lib/formatPredictionData'
import { withSessionSsr } from '../../lib/withSession'
import { NordpoolData } from '../../@types/nordpoolApi'
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

const Automation: NextPage = () => {
	const { data, error } = useSWR('predictionData', async () => {
		const res = await axios.get('/api/nordpool/predictions')
		const json = res.data as NordpoolData

		return formatPredictionData(json)
	})

	const Chart = () => (
		<>
			<Text
				sx={{
					fontSize: '28px',
					fontWeight: '500',
					marginBottom: '12px',
				}}
			>
				Power price predictions for
				{' ' +
					(() => {
						const today = new Date()

						let tomorrow = new Date()
						tomorrow.setDate(today.getDate() + 1)

						return tomorrow.toDateString()
					})()}
			</Text>
			<Text
				size='xl'
				sx={{
					marginBottom: '12px',
				}}
			>
				Power prices (DKK/MWh)
			</Text>
			{(() => {
				if (!data) {
					return <Skeleton height={836} />
				}

				return (
					<PowerChart
						chartData={{
							eastDenmark: data.eastDenmark,
							westDenmark: data.westDenmark,
						}}
						chartSeries={data.chartSeries}
					/>
				)
			})()}
		</>
	)

	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col xl={9}>
					<DashbaordHeader header='Automation' />
				</Grid.Col>
				<Grid.Col xl={9}>
					<Paper p='xl'>
						<Chart />
					</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Automation
