import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Grid, Paper, Skeleton, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconClock } from '@tabler/icons'
import axios from 'axios'
import useSWR from 'swr'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import CreateEventForm from '../../components/CreateEventForm'
import PowerChart from '../../components/PowerChart'
import EventComponent from '../../components/EventComponent'
import formatPredictionData from '../../lib/formatPredictionData'
import prisma from '../../lib/prisma'
import { withSessionSsr } from '../../lib/withSession'
import { NordpoolData } from '../../@types/nordpoolAPI'
import { User } from '../../@types/user'
import { EndpointEvent } from '../../@types/event'

interface Props {
	events: EndpointEvent[]
}

export const getServerSideProps = withSessionSsr<any>(async ({ req, res }) => {
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

	const prismaEvents = await prisma.event.findMany({
		where: { user: { username: user.username } },
	})

	const events: EndpointEvent[] = []

	for (let event of prismaEvents) {
		events.push({
			id: event.id,
			title: event.title,
			type: event.type as 'POST' | 'PUT' | 'DELETE' | 'GET',
			timeToExecute: event.timeToExecute.toISOString(),
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
	const router = useRouter()

	const { data, error } = useSWR('predictionData', async () => {
		const res = await axios.get('/api/nordpool/predictions')
		const json = res.data as NordpoolData

		return formatPredictionData(json)
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
						let tomorrow = new Date()
						tomorrow.setDate(new Date().getDate() + 1)

						return tomorrow.toLocaleDateString('en-GB', {
							month: 'long',
							weekday: 'long',
							day: 'numeric',
							year: 'numeric',
						})
					})()}
			</Text>
			<Text mb='md' size='xl'>
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
					<Paper p='md'>
						<Chart />
					</Paper>
				</Grid.Col>
				<Grid.Col xl={9}>
					<Paper p='md'>
						<CreateEventForm />
					</Paper>
				</Grid.Col>
				{events.map((event, index) => (
					<Grid.Col xl={9} key={index}>
						<EventComponent event={event} />
					</Grid.Col>
				))}
			</Grid>
		</DashboardLayout>
	)
}

export default Automation
