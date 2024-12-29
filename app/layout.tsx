"use client"

import { useState } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "./components/sidebar"
import { ThemeProvider } from "./components/theme-provider"
import { Notifications } from "./components/notifications"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Navbar from "@/components/ui/Navbar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="flex flex-1">
              {sidebarVisible && <Sidebar />}
              <main className="flex-1 overflow-y-auto bg-background">
                <div className="flex justify-between items-center p-4">
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6" />
                  </Button>
                  <Notifications />
                </div>
                <div className="p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

