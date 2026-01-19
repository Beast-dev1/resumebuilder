"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

// Convert YYYY-MM format to Date (first day of month)
function parseMonthDate(dateStr: string): Date | undefined {
  if (!dateStr) return undefined
  // If format is YYYY-MM, add -01 to make it a valid date
  if (dateStr.length === 7 && dateStr.includes('-')) {
    return new Date(dateStr + '-01')
  }
  // If format is YYYY-MM-DD, parse directly
  const date = new Date(dateStr)
  return isValidDate(date) ? date : undefined
}

// Convert Date to YYYY-MM format
function formatMonthDate(date: Date | undefined): string {
  if (!date) return ""
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

interface DatePickerProps {
  label?: string
  value: string // YYYY-MM format
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  id?: string
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    parseMonthDate(value)
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [inputValue, setInputValue] = React.useState(formatDate(date))

  // Update local state when value prop changes
  React.useEffect(() => {
    const newDate = parseMonthDate(value)
    setDate(newDate)
    setMonth(newDate)
    setInputValue(formatDate(newDate))
  }, [value])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      setInputValue(formatDate(selectedDate))
      // Convert to YYYY-MM format and call onChange
      onChange(formatMonthDate(selectedDate))
      setOpen(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value
    setInputValue(inputVal)
    const parsedDate = new Date(inputVal)
    if (isValidDate(parsedDate)) {
      setDate(parsedDate)
      setMonth(parsedDate)
      onChange(formatMonthDate(parsedDate))
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor={id} className="px-1">
          {label}
        </Label>
      )}
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className="bg-background pr-10"
          onChange={handleInputChange}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id ? `${id}-picker` : "date-picker"}
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              disabled={disabled}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

