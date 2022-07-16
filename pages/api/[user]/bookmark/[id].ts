// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../../backend/lib/connectdb'
import Link from '../../../../backend/models/schema'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        const {id} = req.query
        await connect();
        const sl = await Link.findById(id)
        sl.bookmarked = !sl.bookmarked;
        sl.save()
        res.json(sl)
    } catch(error) {
        res.json(error)
    }
}