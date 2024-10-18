import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

// 1. Specify protected and public routes
const protectedRoutesPrefix = "/admin/dashboard";
const publicRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedRoutesPrefix);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /admin/dashboard if the user is authenticated and on a public route
  if (isPublicRoute && session?.data) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  // 5. Redirect to /admin if the user is not authenticated and on a protected route
  if (isProtectedRoute && !session?.data) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
