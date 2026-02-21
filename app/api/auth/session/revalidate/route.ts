import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("auth-session");

  return NextResponse.json(
    { message: "Auth session cache revalidated." },
    { status: 200 },
  );
}
