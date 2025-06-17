// app/api/liveblocks-auth/route.ts
import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room");
  if (!room) {
    return NextResponse.json({ error: "Missing `room` parameter" }, { status: 400 });
  }

  // 1) Initialize the Liveblocks server client with your secret
  const liveblocks = new Liveblocks({ secret: process.env.LIVEBLOCKS_SECRET! });

  // 2) Start a session for some user (replace "guest" with your real user ID)
  const session = liveblocks.prepareSession("guest-user-id", {
    // optional user metadata shown to other clients
    userInfo: { name: "Guest" },
  });

  // 3) Grant that session full access to *this* room
  session.allow(room, session.FULL_ACCESS);

  // 4) Authorize (fetch the JWT) and return it
  const { body, status } = await session.authorize();
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
