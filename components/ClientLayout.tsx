'use client'

import { useState } from "react"
import { Sidebar } from "@/app/components/sidebar"
import { Notifications } from "@/app/components/notifications"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
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
  )
} 