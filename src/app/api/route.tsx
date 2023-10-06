import { type NextRequest, NextResponse } from "next/server";

export const revalidate = 1;

export async function GET(_request: NextRequest): Promise<Response> {
	return NextResponse.json("hello world");
}
