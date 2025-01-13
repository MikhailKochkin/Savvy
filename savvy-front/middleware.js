import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host") || "";

  // Skip middleware for static files, API routes, and _next files
  if (
    pathname.startsWith("/_next") || // Next.js files
    pathname.startsWith("/static") || // Static files
    pathname.startsWith("/api") || // API routes
    /\.(.*)$/.test(pathname) // File extensions (e.g., .css, .js, .png)
  ) {
    return NextResponse.next();
  }

  let locale = "en"; // Default locale

  // Set locale based on domain
  if (host.includes("besavvy.ru")) {
    locale = "ru";
  } else if (host.includes("besavvy.app")) {
    locale = "en";
  } else if (host.includes("localhost:7777")) {
    locale = "en"; // Adjust for development
  }

  // Rewrite the URL to include the locale
  const url = req.nextUrl.clone();
  url.locale = locale;

  return NextResponse.rewrite(url);
}
