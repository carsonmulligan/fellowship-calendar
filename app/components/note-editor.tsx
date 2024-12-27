"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function NoteEditor() {
  const [content, setContent] = useState("")

  return (
    <div className="flex flex-col space-y-4">
      <Textarea
        placeholder="Write your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px]"
      />
      <div className="flex justify-end">
        <Button>Save Note</Button>
      </div>
    </div>
  )
} 