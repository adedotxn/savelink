// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@api/auth/[...nextauth]";
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {}
