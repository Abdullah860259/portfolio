import React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const ScrollToTop = ({ showTopper }) => {

    // Using new thing "Create Portal" it is react method which help to create a component directly to the specified place of the dom irrespective of the parent element of the component
    if (!showTopper) return null;
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="toper w-[50px] h-[50px] rounded-full fixed z-[9999]   bottom-5 right-5 bg-[#1595B6] flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 transition duration-200  after:content-[''] after:w-full after:h-full after:border-2 after:border-black after:absolute after:rounded-full after:-z-10"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z" /></svg>
        </motion.div>,
        document.body
    )

}

export default ScrollToTop