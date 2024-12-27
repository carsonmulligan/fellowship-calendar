"'use client'"

import { useState } from "'react'"
import { Textarea } from "'@/components/ui/textarea'"
import { Button } from "'@/components/ui/button'"
import { ShareNote } from "'./share-note'"

export function NoteEditor() {
  const [content, setContent] = useState("''")

  const handleSave = () => {
    // Here you would implement the logic to save the note
    console.log("'Saving note:'", content)
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

