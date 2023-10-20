import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { support_locales } from "@/locales";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

export function generateStaticParams() {
  return support_locales.map((locale) => ({ locale }));
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/locales/messages/${params.locale}.json`))
      .default;
  } catch (error) {
    console.log(error);
    notFound();
  }
  return (
    <html lang={params.locale}>
      <body>
        <ThemeRegistry>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link href="/">
                  <Image
                    src={"/logo-full.png"}
                    alt="logo"
                    height={42}
                    width={124}
                  />
                </Link>
                <IconButton sx={{ color: "#fff" }} size="large">
                  <SearchOutlinedIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // bgcolor: "background.default",
                mt: ["48px", "56px", "64px"],
                // p: 3,
              }}
            >
              {children}
            </Box>
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
