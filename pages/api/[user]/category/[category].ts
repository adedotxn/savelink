// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../../backend/lib/connectdb'
import Link from '../../../../backend/models/schema'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(session) {
        try {
            const {category} = req.query
            await connect();
            const categories = await Link.find({category : `${category}` })
            res.json(categories)
            return
        } catch(error) {
            res.json(error)
        }
    }

    res.send({
        error: "You must be signed in to view the protected content on this page.",
    })
}