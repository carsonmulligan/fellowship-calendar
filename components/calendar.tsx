"'use client'"

import { useState } from "'react'"
import { CalendarIcon } from "'lucide-react'"
import { Calendar } from "'@/components/ui/calendar'"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "'@/components/ui/popover'"
import { Button } from "'@/components/ui/button'"
import { cn } from "'@/utils/cn'"
import { format } from "'date-fns'"

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-zinc-500 dark:text-zinc-400"
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

