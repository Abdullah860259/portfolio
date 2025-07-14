import React from 'react'
import { GrLinkedinOption } from 'react-icons/gr'
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
const Links = () => {
    return (
        <>
            <div className="links -translate-y-1 mr-4 md:mr-10 flex gap-5 relative z-20 text-2xl text-gray-600 flex-col ml-auto " >
                <GrLinkedinOption  className=' pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                <FaTwitter  className=' pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                <FaInstagram  className=' pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                <MdOutlineMail  className=' pointer-events-auto sm:w-[37px] hover:text-[#fff] hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
                <FaGithub  className='sm:w-[37px] hover:text-[#fff] pointer-events-auto  hover:scale-125 cursor-pointer transition-scale duration-150 text-[#c3c5d4] h-auto ' />
            </div>
        </>
    )
}

export default Links