import Link from "next/link"
import { Folder, Calendar, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-secondary text-secondary-foreground p-4 transition-all duration-300 ease-in-out">
      <nav className="space-y-2">
        <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
          <Calendar className="h-5 w-5" />
          <span>Calendar</span>
        </Link>
        <Link href="/folders" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
          <Folder className="h-5 w-5" />
          <span>Folders</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
} 