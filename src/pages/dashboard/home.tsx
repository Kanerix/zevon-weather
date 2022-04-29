import type { GetServerSideProps, NextPage } from 'next'
import { Grid, Paper, Text, Skeleton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import useSWR from 'swr'
import axios from 'axios'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import PowerChart from '../../components/PowerChart'
import PriceColumn from '../../components/PriceColumn'
import formatMonthlyData from '../../lib/formatMonthlyData'
import { withSessionSsr } from '../../lib/withSession'
import type { NordpoolData } from '../../@types/nordpoolAPI'
import { User } from '../../@types/user'

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

const Home: NextPage = () => {
	const { data, error } = useSWR('/api/nordpool/monthly', async (url) => {
		const res = await axios.get(url)
		const json = res.data as NordpoolData

		return formatMonthlyData(json)
	})

	if (error) {
		showNotification({
			autoClose: 5000,
			title: 'Error:',
			message: error.message,
			color: 'red',
			icon: <IconAlertCircle />,
		})
	}

	const PageContent = () => {
		if (!data) {
			return (
				<>
					<Grid.Col md={12} lg={6} xl={4.5}>
						<Skeleton height={123} />
					</Grid.Col>
					<Grid.Col md={12} lg={6} xl={4.5}>
						<Skeleton height={123} />
					</Grid.Col>
					<Grid.Col md={12} lg={6} xl={4.5}>
						<Skeleton height={123} />
					</Grid.Col>
					<Grid.Col md={12} lg={6} xl={4.5}>
						<Skeleton height={123} />
					</Grid.Col>

					<Grid.Col xl={9}>
						<Skeleton height={836} />
					</Grid.Col>
				</>
			)
		}

		const AveragePrice = (array: number[]): number =>
			Math.round(array.reduce((a, b) => a + b, 0) / array.length)

		const AveragePriceWest = AveragePrice(data.westDenmark)
		const AveragePriceEast = AveragePrice(data.eastDenmark)

		const CurrentPriceWest = data.westDenmark[data.westDenmark.length - 1]
		const CurrentPriceEast = data.eastDenmark[data.eastDenmark.length - 1]

		return (
			<>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							AveragePriceEast < AveragePriceWest
								? 'red'
								: 'green'
						}
						header='AVERAGE PRICE WEST'
						footer={`LAST ${data.chartSeries.length} DAYS`}
						price={AveragePriceWest}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							AveragePriceEast > AveragePriceWest
								? 'red'
								: 'green'
						}
						header='AVERAGE PRICE EAST'
						footer={`LAST ${data.chartSeries.length} DAYS`}
						price={AveragePriceEast}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							CurrentPriceEast < CurrentPriceWest
								? 'red'
								: 'green'
						}
						header='WEST DENMARK'
						footer='CURRENT PRICE'
						price={CurrentPriceWest}
					/>
				</Grid.Col>
				<Grid.Col md={12} lg={6} xl={4.5}>
					<PriceColumn
						color={
							CurrentPriceEast > CurrentPriceWest
								? 'red'
								: 'green'
						}
						header='EAST DENMARK'
						footer='CURRENT PRICE'
						price={CurrentPriceEast}
					/>
				</Grid.Col>
				<Grid.Col xl={9}>
					<Paper p='xl'>
						<Text
							sx={{
								fontSize: '28px',
								fontWeight: '500',
								marginBottom: '12px',
							}}
						>
							Power prices last month
						</Text>
						<Text
							size='xl'
							sx={{
								marginBottom: '12px',
							}}
						>
							Power prices (DKK/MWh)
						</Text>
						<PowerChart
							chartData={{
								westDenmark: data.westDenmark,
								eastDenmark: data.eastDenmark,
							}}
							chartSeries={data.chartSeries}
						/>
					</Paper>
				</Grid.Col>
			</>
		)

		return null
	}

	return (
		<DashboardLayout>
			<Grid justify='center'>
				<Grid.Col xl={9}>
					<DashbaordHeader header='Dashboard' />
				</Grid.Col>
				{(() => {
					if (PageContent) {
						return <PageContent />
					}
				})()}
			</Grid>
		</DashboardLayout>
	)
}

export default Home
