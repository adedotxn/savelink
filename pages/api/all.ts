// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../backend/lib/connectdb'
import Link from '../../backend/models/schema'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        await connect();
        const allLinks = await Link.find()
        res.json(allLinks)

    } catch(error) {
        res.json(error)
    }
}