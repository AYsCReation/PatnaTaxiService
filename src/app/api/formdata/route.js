
import dbConn from "@/utils/dbConn";
import FormData from "@/models/form";
import {NextResponse} from "next/server";

export async function POST(req, res) {
    try {

        const body = await req.json();
        await dbConn();

        await FormData.create(body);

        return NextResponse.json({
            message:"Message sent successfully!"
        }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
        }
        )

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}

export const GET = async (Request) => {
    try {
        await dbConn();
        const data = await FormData.find();
        console.log("Data fetched successfully:", data);
        return new NextResponse(JSON.stringify(data), { status: 200 , headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },});
    } catch (err) {
      

        console.error("Error fetching data:", err);
        return new NextResponse("Internal Server Error", { status: 404 });
    }
}

