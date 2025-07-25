import { motion } from "motion/react"
import { useRef, useEffect, useState } from "react"

const MotionDiv = motion("div")

export default function AnimateOnScroll({ children, className }) {
  const ref = useRef(null)
  const [hasAnimated, sethasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          sethasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, x: -120 }}
      animate={hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.35,
        type: "spring",
        visualDuration: 0.4,
        bounce: 0.7
      }}
      className={"flex justify-center items-center group relative z-30 "}
    >
      {children}
    </MotionDiv>
  )
}
