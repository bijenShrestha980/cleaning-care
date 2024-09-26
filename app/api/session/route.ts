import { verifySession } from "@/lib/dal";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  const res = await request.json();
  const session = await createSession(res.data);
  return Response.json({ success: true, session });
}

export async function GET() {
  const session = await verifySession();
  return Response.json({ success: true, session });
}
