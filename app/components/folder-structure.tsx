"use client"

import { FolderIcon } from "lucide-react"

export function FolderStructure() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Documents</h2>
      <div className="grid gap-2">
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
          <FolderIcon className="h-5 w-5" />
          <span>Personal Statement</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
          <FolderIcon className="h-5 w-5" />
          <span>CV/Resume</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
          <FolderIcon className="h-5 w-5" />
          <span>Transcripts</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
          <FolderIcon className="h-5 w-5" />
          <span>Letters of Recommendation</span>
        </div>
      </div>
    </div>
  )
} 