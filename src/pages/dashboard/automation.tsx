import type { NextPage } from 'next'
import { Grid, Paper, Skeleton, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle } from '@tabler/icons'
import axios from 'axios'
import useSWR from 'swr'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import PowerChart from '../../components/PowerChart'
import RequestEventComponent from '../../components/RequestEvent'
import formatPredictionData from '../../lib/formatPredictionData'
import prisma from '../../lib/prisma'
import { withSessionSsr } from '../../lib/withSession'
import { NordpoolData } from '../../@types/nordpoolApi'
import { User } from '../../@types/user'
import { RequestEvent } from '../../@types/event'

interface Props {
	events: RequestEvent[]
}

export const getServerSideProps = withSessionSsr<any>(async function ({
	req,
	res,
}) {
	if (req.session.user === undefined) {
		res.setHeader('location', '/login')
		res.statusCode = 302
		res.end()

		return {
			props: {
				user: { id: '', username: '', isLoggedIn: false } as User,
			},
		}
	}

	const user = req.session.user

	/* 	const pUser = await prisma.user.findUnique({
		where: { username: user.username },
	})

	if (pUser) {
		await prisma.event.create({
			data: {
				title: 'test',
				timeToExecute: new Date(),
				endpoint: 'http://example.com/api/turnon',
				userId: pUser.id,
			},
		})
	} */

	const prismaEvents = await prisma.event.findMany({
		where: { user: { username: user.username } },
	})

	const events: RequestEvent[] = []

	for (let event of prismaEvents) {
		events.push({
			title: event.title,
			timeToExecute: event.timeToExecute.toString(),
			endpoint: event.endpoint,
		})
	}

	return {
		props: {
			user: req.session.user,
			events: events,
		},
	}
})

const Automation: NextPage<Props> = ({ events }) => {
	const { data, error } = useSWR('predictionData', async () => {
		const res = await axios.get('/api/nordpool/predictions')
		const json = res.data as NordpoolData

		return formatPredictionData(json)
	})

	if (error) {
		showNotification({
			id: 'error',
			autoClose: 5000,
			title: 'Error:',
			message: error.message,
			color: 'red',
			icon: <IconAlertCircle />,
		})
	}

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
				<Grid.Col xl={9}>
					{events.map((event) => (
						<RequestEventComponent event={event} />
					))}
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Automation
