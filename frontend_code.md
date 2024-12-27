Directory structure:
└── carsonmulligan-scholarship-calendar-front-end/
    └── fellowships-calendar/
        ├── .DS_Store
        └── app/
            ├── page.tsx
            ├── .DS_Store
            ├── components/
            │   ├── sidebar.tsx
            │   ├── preparation-cycle.tsx
            │   ├── folder-structure.tsx
            │   ├── share-note.tsx
            │   ├── notifications.tsx
            │   ├── theme-provider.tsx
            │   ├── calendar.tsx
            │   └── note-editor.tsx
            └── layout.tsx


Files Content:

================================================
File: /fellowships-calendar/app/page.tsx
================================================
import { CalendarComponent } from './components/calendar'
import { FolderStructure } from './components/folder-structure'
import { NoteEditor } from './components/note-editor'
import { PreparationCycle } from './components/preparation-cycle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const fellowships = [
  {
    name: '🇬🇧 Rhodes Scholarship',
    description: 'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world.',
    url: 'http://www.rhodesscholar.org/',
    due_date: '01/10/2025',
    value: 1
  },
  {
    name: '🇬🇧 Marshall Scholarship',
    description: 'The Marshall Scholarship funds one or two years of graduate study at a wide range of institutions in the United Kingdom.',
    url: 'http://www.marshallscholarship.org/',
    due_date: '15/09/2025',
    value: 1
  },
  {
    name: '🇬🇧 Gates-Cambridge Scholarship',
    description: 'The Gates Cambridge Scholarship supports one to three years of post-baccalaureate study in any field at the University of Cambridge.',
    url: 'https://www.gatescambridge.org/',
    due_date: '10/10/2025',
    value: 1
  },
  {
    name: '🇬🇧 Churchill Scholarship',
    description: 'The Churchill Scholarship provides around $60,000 for a year of graduate study in engineering, mathematics, or science at Churchill College, Cambridge University.',
    url: 'https://www.churchillscholarship.org/the-scholarship#Apply',
    due_date: '01/11/2025',
    value: 1
  },
];

function getDaysUntilDue(dueDate: string) {
  const [day, month, year] = dueDate.split('/').map(Number);
  const due = new Date(year, month - 1, day);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Fellowships Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CalendarComponent />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {fellowships.map((fellowship) => (
                <Card key={fellowship.name}>
                  <CardHeader>
                    <CardTitle>{fellowship.name}</CardTitle>
                    <CardDescription>
                      Due in {getDaysUntilDue(fellowship.due_date)} days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{fellowship.description}</p>
                    <a href={fellowship.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Learn More
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div>
          <FolderStructure />
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Note Editor</h2>
            <NoteEditor />
          </div>
          <div className="mt-8">
            <PreparationCycle />
          </div>
        </div>
      </div>
    </div>
  )
}



================================================
File: /fellowships-calendar/app/components/sidebar.tsx
================================================
import Link from 'next/link'
import { Folder, Calendar, Settings } from 'lucide-react'

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



================================================
File: /fellowships-calendar/app/components/preparation-cycle.tsx
================================================
import { CheckCircle, Circle } from 'lucide-react'

const steps = [
  { name: 'Brainstorming', completed: true },
  { name: 'Research', completed: true },
  { name: 'Drafting', completed: false },
  { name: 'Editing', completed: false },
  { name: 'Final Review', completed: false },
  { name: 'Submission', completed: false },
]

export function PreparationCycle() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Preparation Cycle</h2>
      <ol className="relative border-l border-gray-700">
        {steps.map((step, index) => (
          <li key={step.name} className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-background rounded-full -left-3 ring-8 ring-background">
              {step.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-500" />
              )}
            </span>
            <h3 className="font-medium leading-tight">{step.name}</h3>
            {index < steps.length - 1 && (
              <p className="text-sm">Complete this step before moving to {steps[index + 1].name}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}



================================================
File: /fellowships-calendar/app/components/folder-structure.tsx
================================================
'use client'

import { useState } from 'react'
import { Folder, ChevronRight, ChevronDown, File } from 'lucide-react'

type FolderItem = {
  name: string
  type: 'folder' | 'file'
  children?: FolderItem[]
}

const initialFolders: FolderItem[] = [
  {
    name: 'Fellowships',
    type: 'folder',
    children: [
      {
        name: 'Rhodes Scholarship',
        type: 'folder',
        children: [
          { name: 'Essay Draft', type: 'file' },
          { name: 'To-Do List', type: 'file' },
        ],
      },
      {
        name: 'Marshall Scholarship',
        type: 'folder',
        children: [
          { name: 'Application Notes', type: 'file' },
          { name: 'Research Proposal', type: 'file' },
        ],
      },
      {
        name: 'Gates-Cambridge Scholarship',
        type: 'folder',
        children: [
          { name: 'Personal Statement', type: 'file' },
          { name: 'Reference Letters', type: 'file' },
        ],
      },
      {
        name: 'Churchill Scholarship',
        type: 'folder',
        children: [
          { name: 'Project Outline', type: 'file' },
          { name: 'Budget Plan', type: 'file' },
        ],
      },
    ],
  },
]

function FolderTree({ items }: { items: FolderItem[] }) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    )
  }

  const renderItem = (item: FolderItem, depth = 0) => {
    const isExpanded = expandedFolders.includes(item.name)

    return (
      <div key={item.name} style={{ marginLeft: `${depth * 20}px` }}>
        <div
          className="flex items-center space-x-2 cursor-pointer p-1 hover:bg-primary/10 rounded"
          onClick={() => item.type === 'folder' && toggleFolder(item.name)}
        >
          {item.type === 'folder' ? (
            <>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Folder className="h-4 w-4" />
            </>
          ) : (
            <File className="h-4 w-4" />
          )}
          <span>{item.name}</span>
        </div>
        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return <div className="space-y-1">{items.map((item) => renderItem(item))}</div>
}

export function FolderStructure() {
  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Folder Structure</h2>
      <FolderTree items={initialFolders} />
    </div>
  )
}



================================================
File: /fellowships-calendar/app/components/share-note.tsx
================================================
'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

export function ShareNote() {
  const [email, setEmail] = useState('')

  const handleShare = () => {
    // Here you would implement the logic to share the note
    console.log('Sharing note with:', email)
    setEmail('')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to share this note with.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleShare}>Share</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}



================================================
File: /fellowships-calendar/app/components/notifications.tsx
================================================
'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Notification = {
  id: number
  message: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Simulating fetching notifications
    const fetchedNotifications = [
      { id: 1, message: 'Rhodes Scholarship deadline in 3 days!' },
      { id: 2, message: 'Complete your Marshall Scholarship draft' },
    ]
    setNotifications(fetchedNotifications)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="text-sm">
                {notification.message}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}



================================================
File: /fellowships-calendar/app/components/theme-provider.tsx
================================================
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}



================================================
File: /fellowships-calendar/app/components/calendar.tsx
================================================
'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}



================================================
File: /fellowships-calendar/app/components/note-editor.tsx
================================================
'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ShareNote } from './share-note'

export function NoteEditor() {
  const [content, setContent] = useState('')

  const handleSave = () => {
    // Here you would implement the logic to save the note
    console.log('Saving note:', content)
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Type your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px]"
      />
      <div className="flex justify-between">
        <Button onClick={handleSave}>Save Note</Button>
        <ShareNote />
      </div>
    </div>
  )
}



================================================
File: /fellowships-calendar/app/layout.tsx
================================================
'use client'

import { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from './components/sidebar'
import { ThemeProvider } from './components/theme-provider'
import { Notifications } from './components/notifications'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

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
          <div className="flex h-screen overflow-hidden">
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
        </ThemeProvider>
      </body>
    </html>
  )
}



