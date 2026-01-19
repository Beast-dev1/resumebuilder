import * as React from "react"

export interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface PopoverTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  className?: string
}

export interface PopoverContentProps {
  className?: string
  align?: "start" | "center" | "end"
  alignOffset?: number
  sideOffset?: number
  children: React.ReactNode
}

const PopoverContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({
  open: false,
  setOpen: () => {},
})

const Popover = ({ open, onOpenChange, children }: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange || (() => {}) : setInternalOpen

  return (
    <PopoverContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, children, className = "", ...props }, ref) => {
    const { setOpen, open } = React.useContext(PopoverContext)

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        onClick: (e: React.MouseEvent) => {
          setOpen(!open)
          if (children.props.onClick) {
            children.props.onClick(e)
          }
        },
      } as any)
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(!open)}
        className={className}
        {...props}
      >
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className = "", align = "start", alignOffset = 0, sideOffset = 4, children }, _ref) => {
    const { open, setOpen } = React.useContext(PopoverContext)
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open, setOpen])

    if (!open) return null

    const alignStyles = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }

    return (
      <div
        ref={contentRef}
        className={`absolute z-50 mt-2 w-auto rounded-md border border-gray-200 bg-white p-1 shadow-md ${alignStyles[align]} ${className}`}
        style={{
          marginTop: `${sideOffset}px`,
          ...(align === "end" && { marginRight: `${-alignOffset}px` }),
          ...(align === "start" && { marginLeft: `${alignOffset}px` }),
        }}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

