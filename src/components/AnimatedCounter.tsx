import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const frames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setCount(Math.round(value * progress));

      if (frame >= frames) window.clearInterval(timer);
    }, 22);

    return () => window.clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.span ref={ref} aria-label={`${value}${suffix}`}>
      {count}
      {suffix}
    </motion.span>
  );
}
