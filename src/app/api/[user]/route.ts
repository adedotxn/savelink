import { NextResponse, NextRequest } from 'next/server'
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";
export async function GET(req: NextRequest, route: { params: { user: string } }) {
    const user = String(route.params.user);
    // const session = await getServerSession(authOptions);
    await connect();

    try {
        const data = await Link.find({ identifier: `${user}` }).sort({
            time: -1,
        });
        return NextResponse.json({ data }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}