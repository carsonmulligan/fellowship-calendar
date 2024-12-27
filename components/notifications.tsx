"'use client'"

import { useState, useEffect } from "'react'"
import { Bell } from "'lucide-react'"
import { Button } from "'@/components/ui/button'"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "'@/components/ui/popover'"

type Notification = {
  id: number
  message: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Simulating fetching notifications
    const fetchedNotifications = [
      { id: 1, message: "'Rhodes Scholarship deadline in 3 days!'" },
      { id: 2, message: "'Complete your Marshall Scholarship draft'" },
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

