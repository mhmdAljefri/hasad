import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes } from "react";
import LineImage from "./line-image";

const headingVariants = cva("", {
  variants: {
    variant: {
      section: [
        "text-5xl sm:text-6xl xl:text-7xl px-10 py-5 font-bold min-h-32 flex",
      ],
    },
  },
});

type Props = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    rotateLine?: boolean;
    centered?: boolean;
  };

export function Heading({
  children,
  className,
  variant = "section",
  rotateLine = true,
  centered = false,
  ...props
}: Props) {
  return (
    <div className={cn("relative", headingVariants({ variant }), className)}>
      <LineImage
        className={cn("object-contain -z-10 !w-auto", {
          "rotate-90": rotateLine,
          "!w-full": centered,
        })}
        fill
      />

      <h2 {...props}>{children}</h2>
    </div>
  );
}
