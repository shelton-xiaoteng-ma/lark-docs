export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|templates|sign-in|sign-up).*)",
  ],
};
