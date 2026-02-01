import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
function AnimateToTopAtScroll({children,className}) {
const ref = useRef(null);
const [hasAnimated, sethasAnimated] = useState(false);
useEffect(() => {  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          sethasAnimated(true);
        }
      },
      { threshold: 0.25 }
    )

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
},[])    
  return (
    <>
        <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 , y: 100 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ 
            duration: 0.8, 
            ease: "easeOut", 
            delay: 0.2,
            type: "spring", 
            visualDuration: 0.4, 
            bounce: 0.5
        }}
        >
            {children}
        </motion.div>
    </>
  )
}

export {AnimateToTopAtScroll}