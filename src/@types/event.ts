export interface EndpointEvent {
	id: string
	title: string
	type: 'POST' | 'GET' | 'PUT' | 'DELETE'
	timeToExecute: string
	endpoint: string
}
