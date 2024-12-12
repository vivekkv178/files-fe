"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  // Ensure value is never null or undefined by defaulting to 0
  const safeValue = value ?? 0;

  // Dynamically set text color based on progress value
  const textColor =
    safeValue < 50 ? "tw-text-neutral-900" : "tw-text-neutral-50";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-neutral-100 dark:tw-bg-neutral-800",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="tw-h-full tw-w-full tw-flex-1 bg-primary tw-transition-all dark:tw-bg-neutral-50"
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
      <div
        className={`tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-text-sm tw-font-medium ${textColor}`}
      >
        {`${safeValue}%`}
      </div>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
