import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

const secret = process.env.SECRET

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
	const { cookies } = req

	const jwt = cookies.auth

	const url = req.url

	if (url.includes('/dashboard')) {
		if (!jwt || !secret) {
			return NextResponse.redirect('/login')
		}
		try {
			verify(jwt, secret)

			return NextResponse.next()
		} catch (error) {
			return NextResponse.redirect('/login')
		}
	}

	return NextResponse.next()
}

export default middleware
