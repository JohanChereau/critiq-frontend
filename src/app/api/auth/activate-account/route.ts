import { NextResponse } from "next/server";
import { CRITIQ_BACKEND_URL } from "@/lib/config";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (!token) {
      // 400 no token in query
      return NextResponse.json(
        { status: 400, errorCode: 4000, message: "Missing activation token" },
        { status: 400 },
      );
    }

    const springRes = await fetch(
      `${CRITIQ_BACKEND_URL}/auth/activate-account?token=${encodeURIComponent(
        token,
      )}`,
      { method: "GET" },
    );

    // 200 status
    if (springRes.ok) {
      return new NextResponse(null, { status: 200 });
    }

    const errorBody = await springRes.json();
    return NextResponse.json(errorBody, { status: springRes.status });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        status: 500,
        errorCode: 5000,
        message: "Internal error",
        details: (e as Error).message,
      },
      { status: 500 },
    );
  }
}
