import * as React from "react";
import { LazyMotion, MotionProps, domAnimation, m } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FadeUp({
  children,
  transition,
  ...props
}: MotionProps & React.HTMLAttributes<HTMLDivElement>) {
  const { ref, inView } = useInView();
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        {...props}
        ref={ref}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5, ...transition }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
