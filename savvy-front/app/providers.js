"use client";

import GlobalsCss from "./global.css";

export function Providers({ children }) {
  return (
    <>
      <GlobalsCss />
      {children}
    </>
  );
}
