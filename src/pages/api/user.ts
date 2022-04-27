import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { User } from '../../@types/user'
import { sessionOptions } from '../../lib/withSession'

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.session.user) {
		res.json({
			...req.session.user,
			isLoggedIn: true,
		})
	} else {
		res.json({
			username: '',
			isLoggedIn: false,
		})
	}
}
