"'use client'"

import { useState } from "'react'"
import { Share2 } from "'lucide-react'"
import { Button } from "'@/components/ui/button'"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "'@/components/ui/dialog'"
import { Input } from "'@/components/ui/input'"

export function ShareNote() {
  const [email, setEmail] = useState("''")

  const handleShare = () => {
    // Here you would implement the logic to share the note
    console.log("'Sharing note with:'", email)
    setEmail("''")
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

