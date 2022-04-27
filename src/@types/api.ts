export interface SignupRequest {
	email: string
	username: string
	password: string
}

export interface SignupResponse {
	error?: string
	token?: string
}

export interface LoginRequest {
	email: string
	password: string
}
