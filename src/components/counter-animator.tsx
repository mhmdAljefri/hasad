import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function CounterAnimator({
  target,
  duration = 3000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      const increment = (target / duration) * 15; // Increment calculation

      let current = 0;
      let timer: NodeJS.Timeout;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          setCount(Math.ceil(current));
          timer = setTimeout(updateCounter, 15);
        } else {
          setCount(target);
        }
      };

      updateCounter();

      return () => clearTimeout(timer);
    }
  }, [target, inView]);

  return <span ref={ref}>{count}</span>;
}
