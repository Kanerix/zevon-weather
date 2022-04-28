import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
	Button,
	Grid,
	Group,
	Paper,
	Skeleton,
	Text,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { TimeInput } from '@mantine/dates'
import { IconAlertCircle, IconClock } from '@tabler/icons'
import axios from 'axios'
import useSWR from 'swr'

import DashboardLayout from '../../layouts/dashboard'
import DashbaordHeader from '../../components/DashboardHeader'
import PowerChart from '../../components/PowerChart'
import RequestEventComponent from '../../components/RequestEvent'
import formatPredictionData from '../../lib/formatPredictionData'
import prisma from '../../lib/prisma'
import { withSessionSsr } from '../../lib/withSession'
import { NordpoolData } from '../../@types/nordpoolAPI'
import { User } from '../../@types/user'
import { RequestEvent } from '../../@types/event'

interface Props {
	events: RequestEvent[]
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

	const events: RequestEvent[] = []

	for (let event of prismaEvents) {
		events.push({
			id: event.id,
			title: event.title,
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
			id: 'error',
			autoClose: 5000,
			title: 'Error:',
			message: error.message,
			color: 'red',
			icon: <IconAlertCircle />,
		})
	}

	const form = useForm({
		initialValues: {
			title: '',
			timeToExecute: new Date(),
			endpoint: '',
		},
	})

	const handleSubmit = async (values: typeof form.values) => {
		try {
			await axios.post('/api/event/create', {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			router.reload()
		} catch (error: any) {
			showNotification({
				id: 'error',
				autoClose: 5000,
				title: 'Error:',
				message: error?.response?.data.error,
				color: 'red',
				icon: <IconAlertCircle />,
			})
		}
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
					<Paper p='md'>
						<form onSubmit={form.onSubmit(handleSubmit)}>
							<TextInput
								mb='md'
								required
								label='Title'
								placeholder='Turn on washer'
								{...form.getInputProps('title')}
							/>
							<TextInput
								mb='md'
								required
								label='Endpoint'
								placeholder='http://example.com/api/enable'
								{...form.getInputProps('endpoint')}
							/>
							<TimeInput
								mb='md'
								label='Pick time'
								icon={<IconClock size={16} />}
								defaultValue={new Date()}
								{...form.getInputProps('timeToExecute')}
							/>
							<Button fullWidth type='submit' mb='md'>
								Create
							</Button>
						</form>
					</Paper>
				</Grid.Col>
				{events.map((event, index) => (
					<Grid.Col xl={9} key={index}>
						<RequestEventComponent event={event} />
					</Grid.Col>
				))}
			</Grid>
		</DashboardLayout>
	)
}

export default Automation
