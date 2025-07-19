"use client"
import { motion } from "motion/react"
import { useRef, useEffect, useState } from "react"

const MotionDiv = motion("div")  // ✅ correct motion component

export default function AnimateOnScrollReverse({ children, className }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0.5, x:0}}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 100 }}
      transition={{ duration: 0.6 }}
      className={"flex justify-center items-center group relative z-30 "}
    >
      {children}
    </MotionDiv>
  )
}
