import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiC・GaN 功率半導體儀表板",
  description: "每日追蹤 SiC、GaN 寬能隙功率半導體產業鏈、公司、需求、供給與催化劑。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
