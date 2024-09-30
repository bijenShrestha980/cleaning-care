import { logout } from "@/lib/session";

export async function GET() {
  await logout();
}
