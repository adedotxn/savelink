import { NextResponse, NextRequest } from 'next/server'
import connect from "@db/lib/connectdb";
import Link from "@db/models/schema";

interface PaginatedLinks {
    totalPosts: number,
    next: { pageNumber: number, limit: number },
    previous: { pageNumber: number, limit: number },
    data: any[],
    rowsPerPage: number
}

export async function GET(req: NextRequest, route: { params: { user: string } }) {
    const user = String(route.params.user);
    const { searchParams } = new URL(req.url)
    const _receivedLimit = searchParams.get('limit') ?? "0";
    const receivedLimit = parseInt(_receivedLimit);

    /**
     * pageNumber should ideally be the page we're currently on and used for fetching data 
     * ..using it in getting the starting index for fetching data within a range but since I'm doing inifinite queries
     * ..and will be fetching more in bits, this is set to 0.
     */
    const pageNumber = receivedLimit;
    const limit = 12;

    // const session = await getServerSession(authOptions);
    await connect();

    try {
        const result: PaginatedLinks = {
            totalPosts: 0,
            next: { pageNumber: 0, limit: 0 },
            previous: { pageNumber: 0, limit: 0 },
            data: [],
            rowsPerPage: 0,
        };

        const totalPosts = await Link.countDocuments({ identifier: user }).exec();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;

        result.totalPosts = totalPosts;

        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            };
        }

        if (endIndex < (await Link.countDocuments({ identifier: user }).exec())) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            };
        }

        result.data = await Link.find({ identifier: `${user}` })
            .sort("-_id")
            .skip(startIndex)
            .limit(limit)
            .exec();
        result.rowsPerPage = limit;

        return NextResponse.json({ result }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}



export async function POST(req: NextRequest) {
    const data = await req.json()
    const { identifier, title, url, categories, bookmarked, time } = data;
    await connect();

    try {
        const linkToSave = new Link({
            identifier,
            title,
            url,
            categories,
            bookmarked,
            time,
        });
        const saved = linkToSave.save();
        return NextResponse.json({ status: "success", data: saved }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}