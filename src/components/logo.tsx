import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const logoVariants = cva("font-serif text-center w-max mx-auto font-bold", {
  variants: {
    size: {
      default: "text-2xl md:text-4xl",
      sm: "text-base md:text-lg",
      md: "text-2xl md:text-4xl",
      lg: "text-[3.5rem] md:text-[5.5rem]",
      button: "text-[20px] md:text-[24px]",
    },
    color: {
      default: "text-slate-900",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
  short?: boolean;
  link?: boolean;
}

export function Logo({ size, color, className, short, link }: LogoProps) {
  return (
    <span
      className={cn(
        `${link ? "hover:text-slate-700 transition-color duration-200" : ""}`,
        logoVariants({ size, color, className })
      )}
    >
      {short ? "F" : "Frontpedia"}
    </span>
  );
}
