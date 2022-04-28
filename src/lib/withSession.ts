import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiHandler,
} from 'next'

import { User } from '../types/user'

export const sessionOptions = {
	cookieName: 'auth',
	password: process.env.TOKEN_PASSWORD as string,
	cookieOptions: {
		secure: false,
	},
}

export function withSessionRoute(handler: NextApiHandler) {
	return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
	P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
	handler: (
		context: GetServerSidePropsContext
	) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
	return withIronSessionSsr(handler, sessionOptions)
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: User
	}
}
