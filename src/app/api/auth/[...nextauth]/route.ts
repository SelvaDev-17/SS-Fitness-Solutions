import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const getHandler = (req: NextRequest) => {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") || host.includes("192.168") ? "http" : "https");
  process.env.NEXTAUTH_URL = `${proto}://${host}`;
  return NextAuth(authOptions);
};

export async function GET(req: NextRequest, context: any) {
  return getHandler(req)(req, context);
}

export async function POST(req: NextRequest, context: any) {
  return getHandler(req)(req, context);
}

