import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from '@/app/provider';
export const metadata: Metadata = {
  title: "E-Exam",
  description: "Online test site for those who want to test themselves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/e-exam-6839e.appspot.com/o/logo.jpg?alt=media&token=3d35a63a-e750-455e-b6e4-2ad1a07c850d" />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
