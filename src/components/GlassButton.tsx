import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate cursor-pointer rounded-full transition-all outline-none border",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-md border-white/30 text-white shadow-lg hover:bg-white/30 hover:border-white/50 active:scale-95",
        primary: "bg-brand-teal/80 backdrop-blur-md border-brand-teal/50 text-white shadow-lg hover:bg-brand-teal hover:border-brand-teal/80 hover:shadow-[0_0_20px_rgba(0,168,232,0.4)] active:scale-95",
        dark: "bg-brand-blue-deep/60 backdrop-blur-md border-brand-teal/30 text-white shadow-lg hover:bg-brand-blue-deep/80 hover:border-brand-teal/60 active:scale-95",
      },
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tight flex items-center space-x-2",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, variant, contentClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full inline-flex",
          className
        )}
      >
        <button
          className={cn(glassButtonVariants({ variant, size }))}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              glassButtonTextVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
