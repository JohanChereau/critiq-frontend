import { CRITIQ_BACKEND_URL } from "@/lib/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const springRes = await fetch(`${CRITIQ_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        password: data.password,
        termsAccepted: data.acceptTerms,
        newsletterAccepted: data.acceptNewsletter,
      }),
    });

    // If spring errored, proxy the error JSON through
    if (!springRes.ok) {
      const errBody = await springRes.json();
      return NextResponse.json(errBody, { status: springRes.status });
    }

    // On success (202 Accepted with no body), just forward the status
    // no JSON payload is needed
    return new NextResponse(null, { status: springRes.status });
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
