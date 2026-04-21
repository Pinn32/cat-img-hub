// Member: Aiqi Xu
// RootLayout of the app

import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { NavigationBar } from "@/components/NavBar";
import { StyledComponentsRegistry } from "@/lib/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: "Cat Img Hub | CS601 GW",
  description: "Simple cat gallery with OAuth, favorites and search.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // get user auth session
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NavigationBar isLoggedIn={Boolean(session?.user?.id)} />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
