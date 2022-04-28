import { Code, Grid, List, Paper, Text } from '@mantine/core'
import type { NextPage } from 'next'

import DashbaordHeader from '../../components/DashboardHeader'
import DashboardLayout from '../../layouts/dashboard'
import { withSessionSsr } from '../../lib/withSession'
import { User } from '../../@types/user'
import RequestEventComponent from '../../components/EventComponent'

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
					<Paper p='md'>
						<Text
							mb='md'
							sx={{
								fontSize: '28px',
								fontWeight: '500',
							}}
						>
							Automation usage
						</Text>
						<Text size='lg' mb='md'>
							This is a guide on how to use the automation feature
							found at the automation tab of the
						</Text>
						<Text size='lg' mb='md'>
							Before getting started you will need to get familiar
							with the point under.
						</Text>
						<List size='lg' mb='xl'>
							<List.Item>
								Basic understanding of the chart found at the
								automation tab
							</List.Item>
							<List.Item>
								Basic knowledge of setting up a REST API
							</List.Item>
							<List.Item>Basic http/https knowledge</List.Item>
						</List>
						<Text size='lg' mb='md'>
							When creating an event, you first need to give it a
							title. A title is a short description of what the
							event should do. This can be stuff like "Turn on
							washer" or "Turn off lamp".
						</Text>
						<Text size='lg' mb='md'>
							After setting the title, you will need to provide a
							endpoint for the event. An endpoint is a URL (often
							for a REST API) that is used by the server to send a
							signal to. This is a basic get request with no body
							provided in the body.
						</Text>
						<Text size='lg' mb='md'>
							At last you will need to provide a timestamp for
							when the signal should be send to the endpoint. It
							is here you will take a look at the chart and choose
							when you feel the time is right.
						</Text>
						<Text size='lg'>
							After this you hit create and you will see the event
							displayed like this:
						</Text>
					</Paper>
				</Grid.Col>
				<Grid.Col xl={9}>
					<RequestEventComponent
						event={{
							id: '',
							title: 'Turn on lamp',
							endpoint: 'http://example/api/lamp',
							timeToExecute: new Date().toISOString(),
						}}
					/>
				</Grid.Col>

				<Grid.Col xl={9}>
					<Paper p='md'>
						<Text size='lg' mb='md'>
							This means that the event is ready and the signal
							will be send when the time is right.
						</Text>
						<Text size='lg'>
							There are two buttons,{' '}
							<Code sx={{ fontSize: '16px' }}>Delete</Code> and{' '}
							<Code sx={{ fontSize: '16px' }}>Test</Code>. The
							delete button does what it says, it deletes the
							event. The test button will send the signal to the
							endpoint and display the response. This means you
							can check if you have setup the REST API at correct
							at your end.
						</Text>
					</Paper>
				</Grid.Col>
			</Grid>
		</DashboardLayout>
	)
}

export default Docs
