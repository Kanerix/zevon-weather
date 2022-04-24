import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const secret = process.env.SECRET

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
	const { cookies } = req

	const jwt = cookies.auth

	const { pathname, origin } = req.nextUrl

	if (pathname.includes('/dashboard')) {
		if (!jwt || !secret) {
			return NextResponse.redirect(origin + '/login')
		}
		try {
			verify(jwt, secret)

			return NextResponse.next()
		} catch (error) {
			return NextResponse.redirect(origin + '/login')
		}
	}

	return NextResponse.next()
}

export default middleware
