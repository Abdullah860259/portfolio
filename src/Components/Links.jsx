import React from 'react'
import { GrLinkedinOption } from 'react-icons/gr'
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
const Links = React.forwardRef((props,ref) => {
    return (
        <>
            <div ref={ref} className="links -translate-y-1 mr-4 md:mr-10 flex gap-5 relative z-20 text-2xl text-gray-600 flex-col ml-auto " >
                <a href="https://www.linkedin.com/in/abdullah-anwar-a4013633a/" target="_blank" rel="noopener noreferrer">
                    <GrLinkedinOption className='  active:scale-90 pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                </a>
                <a href="https://x.com/Abdulla55799774" target="_blank" rel="noopener noreferrer">
                <FaTwitter className='  active:scale-90 pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                </a>
                <a href="https://www.instagram.com/abdu_7817/" target="_blank" rel="noopener noreferrer" >
                    <FaInstagram className='  active:scale-90 pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                </a>
                <a href="mailto:abdullah860259@gmail.com">
                <MdOutlineMail className='  active:scale-90 pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                </a>
                <a href="https://github.com/Abdullah860259" target="_blank" rel="noopener noreferrer">
                    <FaGithub className='sm:w-[37px] hover:text-[#fff] pointer-events-auto  hover:scale-125 active:scale-90  cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                </a>
            </div>
        </>
    )
})  

export default Links


