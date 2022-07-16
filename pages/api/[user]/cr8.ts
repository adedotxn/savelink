// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../backend/lib/connectdb'
import Link from '../../../backend/models/schema'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const cr8 = new Link({
      identifier : req.body.identifier,
      title : req.body.title,
      url : req.body.url,
      category : req.body.category,
      bookmarked : req.body.bookmarked,
      time : req.body.timee
    })
    console.log(req.body)
    const savedCr8tn = cr8.save()

    res.json(savedCr8tn)
  } catch(error) {
    res.json(error)
  }
}
