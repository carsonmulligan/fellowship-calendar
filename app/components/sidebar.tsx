"use client"

import Link from "next/link"
import { Bookmark, Calendar, ScrollText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Fellowships",
      icon: ScrollText,
      href: "/fellowships",
      color: "text-sky-500",
    },
    {
      label: "Bookmarked",
      icon: Bookmark,
      href: "/bookmarked",
      color: "text-violet-500",
    },
    {
      label: "Calendar",
      icon: Calendar,
      color: "text-pink-700",
      href: "/calendar",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            Fellowship Calendar
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 