import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "./components/sidebar"
import { ThemeProvider } from "./components/theme-provider"
import { Notifications } from "./components/notifications"
import Navbar from "@/components/ui/Navbar"
import ClientLayout from "@/components/ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <ClientLayout>
              {children}
            </ClientLayout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

