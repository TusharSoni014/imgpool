import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImgPool - Your All-in-One Image Toolkit",
  description:
    "ImgPool provides powerful tools for image conversion, enhancement, and creation. Transform your visual content with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster richColors={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
