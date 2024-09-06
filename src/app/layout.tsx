import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Providers } from "@/redux/provider";
import Container from "@mui/material/Container";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import style from "./page.module.scss";
import theme from "./theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake Course Manager",
  description: "A Fantastic course manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <Container className="container 2xl">
                <Header />
                <div className={style.main}>
                  <Sidebar />
                  {children}
                </div>
              </Container>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
