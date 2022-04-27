import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(logoutRoute)

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy()
	res.send({ ok: true })
}
