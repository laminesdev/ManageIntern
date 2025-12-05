# Project: .

## File: App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: App.tsx
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            ✅ shadcn/ui + Light Blue Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Button test */}
          <div className="space-y-2">
            <Button className="w-full">Primary Button</Button>
            <Button variant="secondary" className="w-full">
              Secondary Button
            </Button>
            <Button variant="outline" className="w-full">
              Outline Button
            </Button>
          </div>

          {/* Input test */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="test@example.com" />
          </div>

          {/* Status */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-center">
              Light blue theme activated! 🎨
            </p>
            <p className="text-sm text-green-600 text-center mt-1">
              Primary color should be blue
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
```

## File: assets/react.svg
```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: components/ui/avatar.tsx
```tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

## File: components/ui/badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

## File: components/ui/button.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

## File: components/ui/calendar.tsx
```tsx
import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

## File: components/ui/card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

## File: components/ui/checkbox.tsx
```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

## File: components/ui/command.tsx
```tsx
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

## File: components/ui/dialog.tsx
```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

## File: components/ui/dropdown-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

## File: components/ui/form.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: components/ui/input.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

## File: components/ui/label.tsx
```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

## File: components/ui/popover.tsx
```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

## File: components/ui/select.tsx
```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

## File: components/ui/separator.tsx
```tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

## File: components/ui/table.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## File: components/ui/tabs.tsx
```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## File: components/ui/textarea.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

## File: components/ui/toast.tsx
```tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

## File: components/ui/toaster.tsx
```tsx
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

```

## File: hooks/use-toast.ts
```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

## File: hooks/useReclamationFilters.ts
```ts
import { useAuthStore } from '@/stores/authStore';
import { useReclamationStore } from '@/stores/reclamationStore';

export const useReclamationFilters = () => {
  const { user } = useAuthStore();
  const { getReclamationsByUserId } = useReclamationStore();
  
  const getMyReclamations = () => {
    if (!user) return [];
    return getReclamationsByUserId(user.id, user.role);
  };
  
  return {
    getMyReclamations,
  };
};
```

## File: hooks/useStore.ts
```ts
import { useAuthStore, useAuthComputed } from "@/stores/authStore";
import { useTaskStore } from "@/stores/taskStore";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useEvaluationStore } from "@/stores/evaluationStore";
import { useReclamationStore } from "@/stores/reclamationStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useDashboardStore } from "@/stores/dashboardStore";

export const useStore = () => {
   const auth = useAuthStore();
   const authComputed = useAuthComputed();
   const tasks = useTaskStore();
   const attendance = useAttendanceStore();
   const evaluations = useEvaluationStore();
   const reclamations = useReclamationStore();
   const notifications = useNotificationStore();
   const dashboard = useDashboardStore();

   return {
      auth,
      authComputed,
      tasks,
      attendance,
      evaluations,
      reclamations,
      notifications,
      dashboard,
   };
};

```

## File: index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 200 98% 39%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 200 98% 39%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    background: linear-gradient(135deg, hsl(210, 40%, 98%) 0%, white 100%);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-sm border border-white/50 shadow-soft;
  }
  
  .shadow-soft {
    box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 
                0 10px 20px -2px rgba(0, 0, 0, 0.04);
  }
  
  .btn-primary {
    @apply bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-4 py-2 rounded-lg 
           hover:from-blue-600 hover:to-blue-700 transition-all duration-200 
           active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-white text-blue-600 border border-blue-200 font-medium px-4 py-2 rounded-lg
           hover:bg-blue-50 transition-all duration-200 active:scale-[0.98];
  }
}

```

## File: lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## File: main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## File: services/api.ts
```ts
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
   timeout: 30000,
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export interface ApiResponse<T = any> {
   message?: string;
   data?: T;
   errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
   data: T[];
   links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
   };
   meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: Array<{ url: string | null; label: string; active: boolean }>;
      path: string;
      per_page: number;
      to: number;
      total: number;
   };
}

export default api;

```

## File: services/attendanceService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Attendance {
   id: number;
   intern_id: number;
   recorded_by: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
   recorded_at: string;
   created_at: string;
   updated_at: string;
   intern?: any;
   recorded_by_user?: any;
}

export interface CreateAttendanceRequest {
   intern_id: number;
   attendance_date: string;
   status: "present" | "absent" | "late" | "excused";
}

export interface UpdateAttendanceRequest {
   status: "present" | "absent" | "late" | "excused";
}

export interface AttendanceStatistics {
   total: number;
   present: number;
   absent: number;
   late: number;
   excused: number;
   attendance_rate: number;
}

class AttendanceService {
   // Manager endpoints
   async getAttendances(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/attendances",
         { params }
      );
      return response.data;
   }

   async getAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/attendance/statistics"
      );
      return response.data;
   }

   async getInternsForAttendance(): Promise<any[]> {
      const response = await api.get("/interns-for-attendance");
      return response.data;
   }

   async createAttendance(
      data: CreateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.post<{ attendance: Attendance }>(
         "/attendances",
         data
      );
      return response.data;
   }

   async getAttendance(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/attendances/${id}`);
      return response.data;
   }

   async updateAttendance(
      id: number,
      data: UpdateAttendanceRequest
   ): Promise<{ attendance: Attendance }> {
      const response = await api.put<{ attendance: Attendance }>(
         `/attendances/${id}`,
         data
      );
      return response.data;
   }

   async deleteAttendance(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/attendances/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyAttendance(params?: {
      start_date?: string;
      end_date?: string;
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Attendance>> {
      const response = await api.get<PaginatedResponse<Attendance>>(
         "/my-attendance",
         { params }
      );
      return response.data;
   }

   async getMyAttendanceRecord(id: number): Promise<Attendance> {
      const response = await api.get<Attendance>(`/my-attendance/${id}`);
      return response.data;
   }

   async getMyAttendanceStatistics(): Promise<AttendanceStatistics> {
      const response = await api.get<AttendanceStatistics>(
         "/my-attendance/statistics"
      );
      return response.data;
   }
}

export const attendanceService = new AttendanceService();

```

## File: services/authService.ts
```ts
import api, { ApiResponse } from "./api";

export interface LoginRequest {
   email: string;
   password: string;
}

export interface LoginResponse {
   user: User;
   token: string;
   redirect_to: string;
   abilities: string[];
}

export interface User {
   id: number;
   name: string;
   email: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
   email_verified_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   department?: any;
   manager?: User;
   interns?: User[];
   tasks_assigned?: any[];
   tasks_received?: any[];
   attendances?: any[];
   evaluations_received?: any[];
   evaluations_given?: any[];
   reclamations_sent?: any[];
   reclamations_received?: any[];
   notifications_sent?: any[];
   notification_recipients?: any[];
   reports_generated?: any[];
}

export interface ChangePasswordRequest {
   current_password: string;
   new_password: string;
   new_password_confirmation: string;
}

class AuthService {
   async login(data: LoginRequest): Promise<LoginResponse> {
      const response = await api.post<LoginResponse>("/login", data);
      return response.data;
   }

   async logout(): Promise<void> {
      await api.post("/logout");
   }

   async getCurrentUser(): Promise<User> {
      const response = await api.get<User>("/user");
      return response.data;
   }

   async updateProfile(data: Partial<User>): Promise<User> {
      const response = await api.put<User>("/profile", data);
      return response.data;
   }

   async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
      const response = await api.put<ApiResponse>("/change-password", data);
      return response.data;
   }

   async getDashboardData(): Promise<any> {
      const response = await api.get("/dashboard");
      return response.data;
   }
}

export const authService = new AuthService();

```

## File: services/evaluationService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Evaluation {
   id: number;
   intern_id: number;
   manager_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
   evaluated_at: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateEvaluationRequest {
   intern_id: number;
   score: number;
   comments: string;
   evaluation_type:
      | "mid_term"
      | "final"
      | "monthly"
      | "weekly"
      | "quarterly"
      | "project";
}

export interface UpdateEvaluationRequest
   extends Partial<CreateEvaluationRequest> {}

export interface EvaluationStatistics {
   total: number;
   average_score: number;
   by_type: Record<string, number>;
}

class EvaluationService {
   // Manager endpoints
   async getEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/evaluations",
         { params }
      );
      return response.data;
   }

   async getEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/evaluations/statistics"
      );
      return response.data;
   }

   async getInternsForEvaluation(): Promise<any[]> {
      const response = await api.get("/interns-for-evaluation");
      return response.data;
   }

   async createEvaluation(
      data: CreateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.post<{ evaluation: Evaluation }>(
         "/evaluations",
         data
      );
      return response.data;
   }

   async getEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/evaluations/${id}`);
      return response.data;
   }

   async updateEvaluation(
      id: number,
      data: UpdateEvaluationRequest
   ): Promise<{ evaluation: Evaluation }> {
      const response = await api.put<{ evaluation: Evaluation }>(
         `/evaluations/${id}`,
         data
      );
      return response.data;
   }

   async deleteEvaluation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/evaluations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyEvaluations(params?: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Evaluation>> {
      const response = await api.get<PaginatedResponse<Evaluation>>(
         "/my-evaluations",
         { params }
      );
      return response.data;
   }

   async getMyEvaluation(id: number): Promise<Evaluation> {
      const response = await api.get<Evaluation>(`/my-evaluations/${id}`);
      return response.data;
   }

   async getMyEvaluationStatistics(): Promise<EvaluationStatistics> {
      const response = await api.get<EvaluationStatistics>(
         "/my-evaluations/statistics"
      );
      return response.data;
   }
}

export const evaluationService = new EvaluationService();

```

## File: services/notificationService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Notification {
   id: number;
   sender_id: number;
   title: string;
   message: string;
   created_at: string;
   updated_at: string;
   sender?: any;
   recipients?: any[];
}

export interface NotificationRecipient {
   id: number;
   notification_id: number;
   recipient_id: number;
   is_read: boolean;
   read_at: string | null;
   is_archived: boolean;
   created_at: string;
   updated_at: string;
   notification?: Notification;
   recipient?: any;
}

export interface SendNotificationRequest {
   title: string;
   message: string;
   recipient_ids: number[];
}

export interface UpdateNotificationRequest {
   is_read?: boolean;
   is_archived?: boolean;
}

export interface NotificationStatistics {
   total: number;
   unread: number;
   archived: number;
}

class NotificationService {
   // Manager endpoints
   async getNotifications(params?: {
      search?: string;
      is_archived?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/notifications",
         { params }
      );
      return response.data;
   }

   async getInternsForNotifications(): Promise<any[]> {
      const response = await api.get("/notifications/interns");
      return response.data;
   }

   async sendNotification(
      data: SendNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.post<{ notification: Notification }>(
         "/notifications/send",
         data
      );
      return response.data;
   }

   async getNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/notifications/${id}`);
      return response.data;
   }

   async deleteNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/notifications/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyNotifications(params?: {
      is_read?: boolean;
      is_archived?: boolean;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Notification>> {
      const response = await api.get<PaginatedResponse<Notification>>(
         "/my-notifications",
         { params }
      );
      return response.data;
   }

   async getMyNotification(id: number): Promise<Notification> {
      const response = await api.get<Notification>(`/my-notifications/${id}`);
      return response.data;
   }

   async updateMyNotification(
      id: number,
      data: UpdateNotificationRequest
   ): Promise<{ notification: Notification }> {
      const response = await api.put<{ notification: Notification }>(
         `/my-notifications/${id}`,
         data
      );
      return response.data;
   }

   async deleteMyNotification(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-notifications/${id}`);
      return response.data;
   }

   async markAllAsRead(): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         "/my-notifications/mark-all-read"
      );
      return response.data;
   }
}

export const notificationService = new NotificationService();

```

## File: services/reclamationService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Reclamation {
   id: number;
   intern_id: number;
   manager_id: number;
   subject: string;
   description: string;
   status: "pending" | "in_review" | "solved" | "archived";
   response?: string;
   resolved_at?: string;
   responded_at?: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   intern?: any;
   manager?: any;
}

export interface CreateReclamationRequest {
   subject: string;
   description: string;
}

export interface RespondToReclamationRequest {
   response: string;
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface UpdateReclamationStatusRequest {
   status: "pending" | "in_review" | "solved" | "archived";
}

export interface ReclamationStatistics {
   total: number;
   pending: number;
   in_review: number;
   solved: number;
   archived: number;
}

class ReclamationService {
   // Manager endpoints
   async getReclamations(params?: {
      status?: string;
      search?: string;
      start_date?: string;
      end_date?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/reclamations",
         { params }
      );
      return response.data;
   }

   async getReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }

   async getReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/reclamations/${id}`);
      return response.data;
   }

   async respondToReclamation(
      id: number,
      data: RespondToReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/respond`,
         data
      );
      return response.data;
   }

   async updateReclamationStatus(
      id: number,
      data: UpdateReclamationStatusRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.put<{ reclamation: Reclamation }>(
         `/reclamations/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reclamations/${id}`);
      return response.data;
   }

   // Intern endpoints
   async createReclamation(
      data: CreateReclamationRequest
   ): Promise<{ reclamation: Reclamation }> {
      const response = await api.post<{ reclamation: Reclamation }>(
         "/reclamations",
         data
      );
      return response.data;
   }

   async getMyReclamations(params?: {
      status?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Reclamation>> {
      const response = await api.get<PaginatedResponse<Reclamation>>(
         "/my-reclamations",
         { params }
      );
      return response.data;
   }

   async getMyReclamation(id: number): Promise<Reclamation> {
      const response = await api.get<Reclamation>(`/my-reclamations/${id}`);
      return response.data;
   }

   async deleteMyReclamation(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/my-reclamations/${id}`);
      return response.data;
   }

   async getMyReclamationStatistics(): Promise<ReclamationStatistics> {
      const response = await api.get<ReclamationStatistics>(
         "/reclamations/statistics"
      );
      return response.data;
   }
}

export const reclamationService = new ReclamationService();

```

## File: services/reportService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Report {
   id: number;
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
   department_id: number;
   data: any;
   generated_by: number;
   sent_to_admin: boolean;
   created_at: string;
   updated_at: string;
   department?: any;
   generated_by_user?: any;
}

export interface GenerateReportRequest {
   type: "attendance" | "performance";
   period_start: string;
   period_end: string;
}

export interface ReportStatistics {
   total: number;
   attendance_reports: number;
   performance_reports: number;
   sent_to_admin: number;
}

class ReportService {
   // Admin endpoints
   async getReports(params?: {
      type?: string;
      period_start?: string;
      period_end?: string;
      department_id?: number;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Report>> {
      const response = await api.get<PaginatedResponse<Report>>("/reports", {
         params,
      });
      return response.data;
   }

   async getReportStatistics(): Promise<ReportStatistics> {
      const response = await api.get<ReportStatistics>("/reports/statistics");
      return response.data;
   }

   async getReport(id: number): Promise<Report> {
      const response = await api.get<Report>(`/reports/${id}`);
      return response.data;
   }

   // Manager endpoints
   async generateReport(
      data: GenerateReportRequest
   ): Promise<{ report: Report }> {
      const response = await api.post<{ report: Report }>(
         "/reports/generate",
         data
      );
      return response.data;
   }

   async sendReportToAdmin(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(
         `/reports/${id}/send-to-admin`
      );
      return response.data;
   }

   async deleteReport(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/reports/${id}`);
      return response.data;
   }
}

export const reportService = new ReportService();

```

## File: services/taskService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";

export interface Task {
   id: number;
   title: string;
   description: string;
   status: "pending" | "in_progress" | "completed" | "cancelled";
   priority: "low" | "medium" | "high" | "urgent";
   assigned_by: number;
   assigned_to: number;
   deadline: string;
   created_at: string;
   updated_at: string;
   deleted_at?: string;
   assigned_by_user?: any;
   assigned_to_user?: any;
}

export interface CreateTaskRequest {
   title: string;
   description: string;
   assigned_to: number;
   priority: "low" | "medium" | "high" | "urgent";
   deadline: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {}

export interface UpdateTaskStatusRequest {
   status: "pending" | "in_progress" | "completed" | "cancelled";
}

export interface TaskStatistics {
   total: number;
   pending: number;
   in_progress: number;
   completed: number;
   cancelled: number;
   overdue: number;
}

class TaskService {
   // Manager endpoints
   async getTasks(params?: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      sort_by?: string;
      sort_order?: "asc" | "desc";
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/tasks", {
         params,
      });
      return response.data;
   }

   async getTaskStatistics(): Promise<TaskStatistics> {
      const response = await api.get<TaskStatistics>("/tasks/statistics");
      return response.data;
   }

   async getInternsForTasks(): Promise<any[]> {
      const response = await api.get("/interns-for-tasks");
      return response.data;
   }

   async createTask(data: CreateTaskRequest): Promise<{ task: Task }> {
      const response = await api.post<{ task: Task }>("/tasks", data);
      return response.data;
   }

   async getTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
   }

   async updateTask(
      id: number,
      data: UpdateTaskRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(`/tasks/${id}`, data);
      return response.data;
   }

   async updateTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/tasks/${id}/status`,
         data
      );
      return response.data;
   }

   async deleteTask(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/tasks/${id}`);
      return response.data;
   }

   // Intern endpoints
   async getMyTasks(params?: {
      status?: string;
      priority?: string;
      overdue?: boolean;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<Task>> {
      const response = await api.get<PaginatedResponse<Task>>("/my-tasks", {
         params,
      });
      return response.data;
   }

   async getMyTask(id: number): Promise<Task> {
      const response = await api.get<Task>(`/my-tasks/${id}`);
      return response.data;
   }

   async updateMyTaskStatus(
      id: number,
      data: UpdateTaskStatusRequest
   ): Promise<{ task: Task }> {
      const response = await api.put<{ task: Task }>(
         `/my-tasks/${id}/status`,
         data
      );
      return response.data;
   }
}

export const taskService = new TaskService();

```

## File: services/userService.ts
```ts
import api, { ApiResponse, PaginatedResponse } from "./api";
import type { User } from "./authService";

export interface CreateUserRequest {
   name: string;
   email: string;
   password: string;
   role: "admin" | "manager" | "intern";
   department_id?: number;
   manager_id?: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

export interface AssignInternRequest {
   department_id: number;
   manager_id: number;
}

class UserService {
   async getUsers(params?: {
      role?: string;
      department_id?: number;
      search?: string;
      page?: number;
      per_page?: number;
   }): Promise<PaginatedResponse<User>> {
      const response = await api.get<PaginatedResponse<User>>("/users", {
         params,
      });
      return response.data;
   }

   async createUser(data: CreateUserRequest): Promise<{ user: User }> {
      const response = await api.post<{ user: User }>("/users", data);
      return response.data;
   }

   async getUser(id: number): Promise<User> {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
   }

   async updateUser(
      id: number,
      data: UpdateUserRequest
   ): Promise<{ user: User }> {
      const response = await api.put<{ user: User }>(`/users/${id}`, data);
      return response.data;
   }

   async deleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(`/users/${id}`);
      return response.data;
   }

   async assignIntern(
      id: number,
      data: AssignInternRequest
   ): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/assign`, data);
      return response.data;
   }

   async softDeleteUser(id: number): Promise<ApiResponse> {
      const response = await api.delete<ApiResponse>(
         `/users/${id}/soft-delete`
      );
      return response.data;
   }

   async restoreUser(id: number): Promise<ApiResponse> {
      const response = await api.post<ApiResponse>(`/users/${id}/restore`);
      return response.data;
   }

   async getManagers(): Promise<User[]> {
      const response = await api.get<User[]>("/managers");
      return response.data;
   }

   async getInterns(params?: {
      unassigned?: boolean;
      department_id?: number;
   }): Promise<User[]> {
      const response = await api.get<User[]>("/interns", { params });
      return response.data;
   }

   async getUnassignedInterns(): Promise<User[]> {
      const response = await api.get<User[]>("/unassigned-interns");
      return response.data;
   }
}

export const userService = new UserService();

```

## File: stores/attendanceStore.ts
```ts
import { create } from "zustand";
import type {
   Attendance,
   AttendanceStatistics,
} from "@/services/attendanceService";

interface AttendanceState {
   // State
   attendances: Attendance[];
   selectedAttendance: Attendance | null;
   statistics: AttendanceStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      start_date?: string;
      end_date?: string;
      status?: string;
      intern_id?: number;
   };

   // Actions
   setAttendances: (attendances: Attendance[]) => void;
   setSelectedAttendance: (attendance: Attendance | null) => void;
   setStatistics: (stats: AttendanceStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<AttendanceState["filters"]>) => void;
   resetFilters: () => void;

   // Attendance operations
   addAttendance: (attendance: Attendance) => void;
   updateAttendance: (id: number, updates: Partial<Attendance>) => void;
   deleteAttendance: (id: number) => void;

   // Computed properties
   todayAttendances: Attendance[];
   recentAttendances: Attendance[];
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
   // Initial state
   attendances: [],
   selectedAttendance: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setAttendances: (attendances) => set({ attendances }),

   setSelectedAttendance: (attendance) =>
      set({ selectedAttendance: attendance }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Attendance operations
   addAttendance: (attendance) =>
      set((state) => ({
         attendances: [attendance, ...state.attendances],
         statistics: state.statistics
            ? {
                 ...state.statistics,
                 total: state.statistics.total + 1,
                 [attendance.status]:
                    (state.statistics[
                       attendance.status as keyof AttendanceStatistics
                    ] as number) + 1,
                 attendance_rate: Math.round(
                    ((state.statistics.present +
                       (attendance.status === "present" ? 1 : 0)) /
                       (state.statistics.total + 1)) *
                       100
                 ),
              }
            : null,
      })),

   updateAttendance: (id, updates) =>
      set((state) => {
         const updatedAttendances = state.attendances.map((attendance) =>
            attendance.id === id ? { ...attendance, ...updates } : attendance
         );

         // Update statistics if status changed
         let newStats = state.statistics;
         if (updates.status && state.statistics) {
            const oldAttendance = state.attendances.find((a) => a.id === id);
            if (oldAttendance) {
               newStats = { ...state.statistics };

               // Decrement old status
               const oldStatus =
                  oldAttendance.status as keyof AttendanceStatistics;
               if (oldStatus in newStats) {
                  (newStats[oldStatus] as number)--;
               }

               // Increment new status
               const newStatus = updates.status as keyof AttendanceStatistics;
               if (newStatus in newStats) {
                  (newStats[newStatus] as number)++;
               }

               // Recalculate attendance rate
               newStats.attendance_rate = Math.round(
                  (newStats.present / newStats.total) * 100
               );
            }
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? { ...state.selectedAttendance, ...updates }
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   deleteAttendance: (id) =>
      set((state) => {
         const attendanceToDelete = state.attendances.find((a) => a.id === id);
         const updatedAttendances = state.attendances.filter(
            (a) => a.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (attendanceToDelete && state.statistics) {
            newStats = {
               ...state.statistics,
               total: state.statistics.total - 1,
            };

            const status =
               attendanceToDelete.status as keyof AttendanceStatistics;
            if (status in newStats) {
               (newStats[status] as number)--;
            }

            newStats.attendance_rate = Math.round(
               (newStats.present / newStats.total) * 100
            );
         }

         return {
            attendances: updatedAttendances,
            selectedAttendance:
               state.selectedAttendance?.id === id
                  ? null
                  : state.selectedAttendance,
            statistics: newStats,
         };
      }),

   // Computed properties
   get todayAttendances() {
      const today = new Date().toISOString().split("T")[0];
      return get().attendances.filter(
         (attendance) => attendance.attendance_date === today
      );
   },

   get recentAttendances() {
      return get().attendances.slice(0, 10); // Last 10 attendances
   },
}));

```

## File: stores/authStore.ts
```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/services/authService';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true, error: null });
      },

      clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),

      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Create a separate hook for computed properties
export const useAuthComputed = () => {
  const { user } = useAuthStore();
  
  return {
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isIntern: user?.role === 'intern',
    user,
  };
};
```

## File: stores/dashboardStore.ts
```ts
import { create } from 'zustand';

export interface DashboardActivity {
  action: string;
  user: string;
  time: string;
  icon?: string;
}

export interface DashboardStats {
  // Admin stats
  totalUsers?: number;
  activeInterns?: number;
  pendingTasks?: number;
  reportsGenerated?: number;
  
  // Manager stats
  myInterns?: number;
  managerPendingTasks?: number;
  attendanceToday?: string;
  averageScore?: number;
  pendingReclamations?: number;
  
  // Intern stats
  myTasks?: number;
  internAverageScore?: number;
  unreadNotifications?: number;
  attendanceRate?: number;
  
  // Activity logs
  recentActivity: DashboardActivity[];
}

export interface FormattedStat {
  value: string | number;
  label: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

interface DashboardState {
  // State
  stats: DashboardStats;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setStats: (stats: Partial<DashboardStats>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addActivity: (activity: DashboardActivity) => void;
  clearActivities: () => void;
  
  // Helper methods
  getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => Record<string, FormattedStat>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  stats: {
    recentActivity: [],
  },
  isLoading: false,
  error: null,

  // Actions
  setStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  addActivity: (activity) =>
    set((state) => ({
      stats: {
        ...state.stats,
        recentActivity: [activity, ...state.stats.recentActivity.slice(0, 9)], // Keep last 10
      },
    })),
  
  clearActivities: () =>
    set((state) => ({
      stats: { ...state.stats, recentActivity: [] },
    })),

  // Helper method for formatted stats
  getFormattedStats: (userRole?: 'admin' | 'manager' | 'intern') => {
    const { stats } = get();
    
    if (userRole === 'admin') {
      return {
        totalUsers: {
          value: stats.totalUsers || 0,
          label: 'Total Users',
          icon: '👥',
          color: 'blue',
        },
        activeInterns: {
          value: stats.activeInterns || 0,
          label: 'Active Interns',
          icon: '🎓',
          color: 'green',
        },
        pendingTasks: {
          value: stats.pendingTasks || 0,
          label: 'Pending Tasks',
          icon: '📝',
          color: 'orange',
        },
        reportsGenerated: {
          value: stats.reportsGenerated || 0,
          label: 'Reports',
          icon: '📊',
          color: 'purple',
        },
      };
    }
    
    if (userRole === 'manager') {
      return {
        myInterns: {
          value: stats.myInterns || 0,
          label: 'My Interns',
          icon: '👥',
          color: 'blue',
        },
        pendingTasks: {
          value: stats.managerPendingTasks || 0,
          label: 'Pending Tasks',
          icon: '📝',
          color: 'orange',
        },
        attendanceToday: {
          value: stats.attendanceToday || '0/0',
          label: 'Attendance Today',
          icon: '📅',
          color: 'green',
        },
        averageScore: {
          value: `${stats.averageScore || 0}%`,
          label: 'Avg Score',
          icon: '⭐',
          color: 'purple',
        },
        pendingReclamations: {
          value: stats.pendingReclamations || 0,
          label: 'Pending Reclamations',
          icon: '📝',
          color: 'red',
        },
      };
    }
    
    // Intern stats (default)
    return {
      myTasks: {
        value: stats.myTasks || 0,
        label: 'My Tasks',
        icon: '📝',
        color: 'blue',
      },
      averageScore: {
        value: `${stats.internAverageScore || 0}%`,
        label: 'Avg Score',
        icon: '⭐',
        color: 'green',
      },
      unreadNotifications: {
        value: stats.unreadNotifications || 0,
        label: 'Notifications',
        icon: '🔔',
        color: 'orange',
      },
      attendanceRate: {
        value: `${stats.attendanceRate || 0}%`,
        label: 'Attendance',
        icon: '📅',
        color: 'purple',
      },
    };
  },
}));
```

## File: stores/evaluationStore.ts
```ts
import { create } from "zustand";
import type {
   Evaluation,
   EvaluationStatistics,
} from "@/services/evaluationService";

interface EvaluationState {
   // State
   evaluations: Evaluation[];
   selectedEvaluation: Evaluation | null;
   statistics: EvaluationStatistics | null;
   isLoading: boolean;
   error: string | null;
   filters: {
      evaluation_type?: string;
      start_date?: string;
      end_date?: string;
      intern_id?: number;
   };

   // Actions
   setEvaluations: (evaluations: Evaluation[]) => void;
   setSelectedEvaluation: (evaluation: Evaluation | null) => void;
   setStatistics: (stats: EvaluationStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setFilters: (filters: Partial<EvaluationState["filters"]>) => void;
   resetFilters: () => void;

   // Evaluation operations
   addEvaluation: (evaluation: Evaluation) => void;
   updateEvaluation: (id: number, updates: Partial<Evaluation>) => void;
   deleteEvaluation: (id: number) => void;

   // Computed properties
   recentEvaluations: Evaluation[];
   averageScore: number;
}

export const useEvaluationStore = create<EvaluationState>((set, get) => ({
   // Initial state
   evaluations: [],
   selectedEvaluation: null,
   statistics: null,
   isLoading: false,
   error: null,
   filters: {},

   // Actions
   setEvaluations: (evaluations) => set({ evaluations }),

   setSelectedEvaluation: (evaluation) =>
      set({ selectedEvaluation: evaluation }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
      })),

   resetFilters: () => set({ filters: {} }),

   // Evaluation operations
   addEvaluation: (evaluation) =>
      set((state) => {
         const updatedEvaluations = [evaluation, ...state.evaluations];

         // Update statistics
         let newStats = state.statistics;
         if (state.statistics) {
            newStats = {
               total: state.statistics.total + 1,
               average_score: Math.round(
                  (state.statistics.average_score * state.statistics.total +
                     evaluation.score) /
                     (state.statistics.total + 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluation.evaluation_type]:
                     (state.statistics.by_type[evaluation.evaluation_type] ||
                        0) + 1,
               },
            };
         }

         return {
            evaluations: updatedEvaluations,
            statistics: newStats,
         };
      }),

   updateEvaluation: (id, updates) =>
      set((state) => {
         const updatedEvaluations = state.evaluations.map((evaluation) =>
            evaluation.id === id ? { ...evaluation, ...updates } : evaluation
         );

         // Update statistics if score changed
         let newStats = state.statistics;
         if (updates.score !== undefined && state.statistics) {
            const oldEvaluation = state.evaluations.find((e) => e.id === id);
            if (oldEvaluation) {
               const totalScore =
                  state.statistics.average_score * state.statistics.total;
               const newTotalScore =
                  totalScore - oldEvaluation.score + updates.score;
               newStats = {
                  ...state.statistics,
                  average_score: Math.round(
                     newTotalScore / state.statistics.total
                  ),
               };
            }
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? { ...state.selectedEvaluation, ...updates }
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   deleteEvaluation: (id) =>
      set((state) => {
         const evaluationToDelete = state.evaluations.find((e) => e.id === id);
         const updatedEvaluations = state.evaluations.filter(
            (e) => e.id !== id
         );

         // Update statistics
         let newStats = state.statistics;
         if (
            evaluationToDelete &&
            state.statistics &&
            state.statistics.total > 1
         ) {
            const totalScore =
               state.statistics.average_score * state.statistics.total;
            const newTotalScore = totalScore - evaluationToDelete.score;
            newStats = {
               total: state.statistics.total - 1,
               average_score: Math.round(
                  newTotalScore / (state.statistics.total - 1)
               ),
               by_type: {
                  ...state.statistics.by_type,
                  [evaluationToDelete.evaluation_type]: Math.max(
                     0,
                     (state.statistics.by_type[
                        evaluationToDelete.evaluation_type
                     ] || 0) - 1
                  ),
               },
            };
         } else if (state.statistics?.total === 1) {
            newStats = { total: 0, average_score: 0, by_type: {} };
         }

         return {
            evaluations: updatedEvaluations,
            selectedEvaluation:
               state.selectedEvaluation?.id === id
                  ? null
                  : state.selectedEvaluation,
            statistics: newStats,
         };
      }),

   // Computed properties
   get recentEvaluations() {
      return get().evaluations.slice(0, 10); // Last 10 evaluations
   },

   get averageScore() {
      const evaluations = get().evaluations;
      if (evaluations.length === 0) return 0;

      const total = evaluations.reduce(
         (sum, evalItem) => sum + evalItem.score,
         0
      );
      return Math.round(total / evaluations.length);
   },
}));

```

## File: stores/index.ts
```ts
export { useAuthStore } from './authStore';
export { useTaskStore } from './taskStore';
export { useAttendanceStore } from './attendanceStore';
export { useEvaluationStore } from './evaluationStore';
export { useReclamationStore } from './reclamationStore';
export { useNotificationStore } from './notificationStore';
export { useDashboardStore } from './dashboardStore';
```

## File: stores/notificationStore.ts
```ts
import { create } from 'zustand';
import type { Notification } from '@/services/notificationService';

interface NotificationState {
  // State
  notifications: Notification[];
  selectedNotification: Notification | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    is_read?: boolean;
    is_archived?: boolean;
    search?: string;
  };

  // Actions
  setNotifications: (notifications: Notification[]) => void;
  setSelectedNotification: (notification: Notification | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<NotificationState['filters']>) => void;
  resetFilters: () => void;
  
  // Notification operations
  addNotification: (notification: Notification) => void;
  updateNotification: (id: number, updates: Partial<Notification>) => void;
  deleteNotification: (id: number) => void;
  markAllAsRead: () => void;
  
  // Helper methods for computed properties
  getUnreadCount: () => number;
  getUnreadNotifications: () => Notification[];
  getRecentNotifications: (limit?: number) => Notification[];
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  // Initial state
  notifications: [],
  selectedNotification: null,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  setNotifications: (notifications) => set({ notifications }),
  
  setSelectedNotification: (notification) => set({ selectedNotification: notification }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  resetFilters: () => set({ filters: {} }),

  // Notification operations
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  updateNotification: (id, updates) =>
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id ? { ...notification, ...updates } : notification
      );

      return {
        notifications: updatedNotifications,
        selectedNotification:
          state.selectedNotification?.id === id
            ? { ...state.selectedNotification, ...updates }
            : state.selectedNotification,
      };
    }),

  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
      selectedNotification: state.selectedNotification?.id === id ? null : state.selectedNotification,
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    })),

  // Helper methods instead of computed properties
  getUnreadCount: () => {
    return get().notifications.filter((notification) => !notification.is_read).length;
  },

  getUnreadNotifications: () => {
    return get().notifications.filter((notification) => !notification.is_read);
  },

  getRecentNotifications: (limit = 10) => {
    return get().notifications.slice(0, limit);
  },
}));
```

## File: stores/reclamationStore.ts
```ts
import { create } from 'zustand';
import type { Reclamation, ReclamationStatistics } from '@/services/reclamationService';

interface ReclamationState {
  // State
  reclamations: Reclamation[];
  selectedReclamation: Reclamation | null;
  statistics: ReclamationStatistics | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    status?: string;
    search?: string;
  };

  // Actions
  setReclamations: (reclamations: Reclamation[]) => void;
  setSelectedReclamation: (reclamation: Reclamation | null) => void;
  setStatistics: (stats: ReclamationStatistics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<ReclamationState['filters']>) => void;
  resetFilters: () => void;
  
  // Reclamation operations
  addReclamation: (reclamation: Reclamation) => void;
  updateReclamation: (id: number, updates: Partial<Reclamation>) => void;
  deleteReclamation: (id: number) => void;
  
  // Helper method - we'll remove the computed property that uses auth store
  getReclamationsByUserId: (userId: number, userRole: 'admin' | 'manager' | 'intern') => Reclamation[];
  
  // Computed properties (without auth dependency)
  pendingReclamations: Reclamation[];
}

export const useReclamationStore = create<ReclamationState>((set, get) => ({
  // Initial state
  reclamations: [],
  selectedReclamation: null,
  statistics: null,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  setReclamations: (reclamations) => set({ reclamations }),
  
  setSelectedReclamation: (reclamation) => set({ selectedReclamation: reclamation }),
  
  setStatistics: (statistics) => set({ statistics }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  resetFilters: () => set({ filters: {} }),

  // Reclamation operations
  addReclamation: (reclamation) =>
    set((state) => ({
      reclamations: [reclamation, ...state.reclamations],
      statistics: state.statistics
        ? {
            ...state.statistics,
            total: state.statistics.total + 1,
            pending: state.statistics.pending + 1,
          }
        : null,
    })),

  updateReclamation: (id, updates) =>
    set((state) => {
      const updatedReclamations = state.reclamations.map((reclamation) =>
        reclamation.id === id ? { ...reclamation, ...updates } : reclamation
      );
      
      // Update statistics if status changed
      let newStats = state.statistics;
      if (updates.status && state.statistics) {
        const oldReclamation = state.reclamations.find((r) => r.id === id);
        if (oldReclamation) {
          newStats = { ...state.statistics };
          
          // Decrement old status
          if (oldReclamation.status === 'pending') newStats.pending--;
          if (oldReclamation.status === 'in_review') newStats.in_review--;
          if (oldReclamation.status === 'solved') newStats.solved--;
          if (oldReclamation.status === 'archived') newStats.archived--;
          
          // Increment new status
          if (updates.status === 'pending') newStats.pending++;
          if (updates.status === 'in_review') newStats.in_review++;
          if (updates.status === 'solved') newStats.solved++;
          if (updates.status === 'archived') newStats.archived++;
        }
      }

      return {
        reclamations: updatedReclamations,
        selectedReclamation:
          state.selectedReclamation?.id === id
            ? { ...state.selectedReclamation, ...updates }
            : state.selectedReclamation,
        statistics: newStats,
      };
    }),

  deleteReclamation: (id) =>
    set((state) => {
      const reclamationToDelete = state.reclamations.find((r) => r.id === id);
      const updatedReclamations = state.reclamations.filter((r) => r.id !== id);
      
      // Update statistics
      let newStats = state.statistics;
      if (reclamationToDelete && state.statistics) {
        newStats = { ...state.statistics, total: state.statistics.total - 1 };
        
        if (reclamationToDelete.status === 'pending') newStats.pending--;
        if (reclamationToDelete.status === 'in_review') newStats.in_review--;
        if (reclamationToDelete.status === 'solved') newStats.solved--;
        if (reclamationToDelete.status === 'archived') newStats.archived--;
      }

      return {
        reclamations: updatedReclamations,
        selectedReclamation: state.selectedReclamation?.id === id ? null : state.selectedReclamation,
        statistics: newStats,
      };
    }),

  // Helper method instead of computed property
  getReclamationsByUserId: (userId: number, userRole: 'admin' | 'manager' | 'intern') => {
    const reclamations = get().reclamations;
    
    if (userRole === 'intern') {
      return reclamations.filter((reclamation) => reclamation.intern_id === userId);
    }
    
    // For managers, show reclamations assigned to them
    if (userRole === 'manager') {
      return reclamations.filter((reclamation) => reclamation.manager_id === userId);
    }
    
    // Admin can see all
    return reclamations;
  },

  // Computed properties (no auth dependency)
  get pendingReclamations() {
    return get().reclamations.filter((reclamation) => reclamation.status === 'pending');
  },
}));
```

## File: stores/taskStore.ts
```ts
import { create } from "zustand";
import type { Task, TaskStatistics } from "@/services/taskService";

interface TaskState {
   // State
   tasks: Task[];
   selectedTask: Task | null;
   statistics: TaskStatistics | null;
   isLoading: boolean;
   error: string | null;
   pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
   };
   filters: {
      status?: string;
      priority?: string;
      assigned_to?: number;
      search?: string;
      overdue?: boolean;
   };
   sort: {
      field: string;
      order: "asc" | "desc";
   };

   // Actions
   setTasks: (tasks: Task[]) => void;
   setSelectedTask: (task: Task | null) => void;
   setStatistics: (stats: TaskStatistics) => void;
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   setPagination: (pagination: Partial<TaskState["pagination"]>) => void;
   setFilters: (filters: Partial<TaskState["filters"]>) => void;
   setSort: (sort: Partial<TaskState["sort"]>) => void;
   resetFilters: () => void;

   // Task operations
   addTask: (task: Task) => void;
   updateTask: (id: number, updates: Partial<Task>) => void;
   deleteTask: (id: number) => void;

   // Computed properties
   pendingTasks: Task[];
   inProgressTasks: Task[];
   completedTasks: Task[];
   overdueTasks: Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
   // Initial state
   tasks: [],
   selectedTask: null,
   statistics: null,
   isLoading: false,
   error: null,
   pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 15,
   },
   filters: {},
   sort: {
      field: "created_at",
      order: "desc",
   },

   // Actions
   setTasks: (tasks) => set({ tasks }),

   setSelectedTask: (task) => set({ selectedTask: task }),

   setStatistics: (statistics) => set({ statistics }),

   setLoading: (loading) => set({ isLoading: loading }),

   setError: (error) => set({ error }),

   setPagination: (pagination) =>
      set((state) => ({
         pagination: { ...state.pagination, ...pagination },
      })),

   setFilters: (filters) =>
      set((state) => ({
         filters: { ...state.filters, ...filters },
         pagination: { ...state.pagination, currentPage: 1 },
      })),

   setSort: (sort) =>
      set((state) => ({
         sort: { ...state.sort, ...sort },
      })),

   resetFilters: () =>
      set({
         filters: {},
         sort: { field: "created_at", order: "desc" },
         pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            perPage: 15,
         },
      }),

   // Task operations
   addTask: (task) =>
      set((state) => ({
         tasks: [task, ...state.tasks],
         statistics: state.statistics
            ? {
                 ...state.statistics,
                 total: state.statistics.total + 1,
                 pending: state.statistics.pending + 1,
              }
            : null,
      })),

   updateTask: (id, updates) =>
      set((state) => {
         const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
         );

         // Update statistics if status changed
         let newStats = state.statistics;
         if (updates.status && state.statistics) {
            const oldTask = state.tasks.find((t) => t.id === id);
            if (oldTask) {
               newStats = { ...state.statistics };

               // Decrement old status
               if (oldTask.status === "pending") newStats.pending--;
               if (oldTask.status === "in_progress") newStats.in_progress--;
               if (oldTask.status === "completed") newStats.completed--;
               if (oldTask.status === "cancelled") newStats.cancelled--;

               // Increment new status
               if (updates.status === "pending") newStats.pending++;
               if (updates.status === "in_progress") newStats.in_progress++;
               if (updates.status === "completed") newStats.completed++;
               if (updates.status === "cancelled") newStats.cancelled++;
            }
         }

         return {
            tasks: updatedTasks,
            selectedTask:
               state.selectedTask?.id === id
                  ? { ...state.selectedTask, ...updates }
                  : state.selectedTask,
            statistics: newStats,
         };
      }),

   deleteTask: (id) =>
      set((state) => {
         const taskToDelete = state.tasks.find((task) => task.id === id);
         const updatedTasks = state.tasks.filter((task) => task.id !== id);

         // Update statistics
         let newStats = state.statistics;
         if (taskToDelete && state.statistics) {
            newStats = {
               ...state.statistics,
               total: state.statistics.total - 1,
            };

            if (taskToDelete.status === "pending") newStats.pending--;
            if (taskToDelete.status === "in_progress") newStats.in_progress--;
            if (taskToDelete.status === "completed") newStats.completed--;
            if (taskToDelete.status === "cancelled") newStats.cancelled--;
         }

         return {
            tasks: updatedTasks,
            selectedTask:
               state.selectedTask?.id === id ? null : state.selectedTask,
            statistics: newStats,
         };
      }),

   // Computed properties
   get pendingTasks() {
      return get().tasks.filter((task) => task.status === "pending");
   },

   get inProgressTasks() {
      return get().tasks.filter((task) => task.status === "in_progress");
   },

   get completedTasks() {
      return get().tasks.filter((task) => task.status === "completed");
   },

   get overdueTasks() {
      const now = new Date();
      return get().tasks.filter(
         (task) => task.status !== "completed" && new Date(task.deadline) < now
      );
   },
}));

```

## File: types/types.ts
```ts
// Re-export all types for easy import
export type { User, LoginRequest, LoginResponse, ChangePasswordRequest } from '../services/authService';
export type { CreateUserRequest, UpdateUserRequest, AssignInternRequest } from '../services/userService';
export type { Task, CreateTaskRequest, UpdateTaskRequest, UpdateTaskStatusRequest, TaskStatistics } from '../services/taskService';
export type { Attendance, CreateAttendanceRequest, UpdateAttendanceRequest, AttendanceStatistics } from '../services/attendanceService';
export type { Evaluation, CreateEvaluationRequest, UpdateEvaluationRequest, EvaluationStatistics } from '../services/evaluationService';
export type { Reclamation, CreateReclamationRequest, RespondToReclamationRequest, UpdateReclamationStatusRequest, ReclamationStatistics } from '../services/reclamationService';
export type { Notification, NotificationRecipient, SendNotificationRequest, UpdateNotificationRequest } from '../services/notificationService';
export type { Report, GenerateReportRequest, ReportStatistics } from '../services/reportService';
```

