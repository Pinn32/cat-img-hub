import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { NavigationBar } from "@/components/navigation-bar";
import { StyledComponentsRegistry } from "@/lib/styled-components-registry";

export const metadata: Metadata = {
  title: "Cat Img Hub",
  description: "Simple cat gallery with favorites and search",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="zh-CN">
      <body>
        <StyledComponentsRegistry>
          <NavigationBar isLoggedIn={Boolean(session?.user?.id)} />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
