import React, { useEffect } from 'react'
import Nav from './Nav'
import Links from './Links'
import "./home.css"
import { runMatter } from "./matter.js";


const Home = () => {

    useEffect(() => {
        const { render } = runMatter();
    }, []);
    return (
        <>
            <section className=" relative flex justify-center items-center flex-col landing-page h-screen w-screen overflow-auto bg-[#111111]  ">
                <div id="myCanvasContainer" className='hidden sm:block absolute inset-0 w-full h-full z-0 overflow-hidden'></div>
                <Nav />
                <div className='flex pointer-events-none justify-center items-center flex-col w-full h-auto absolute'>
                    <Links />
                </div>
                <div className="main-content text-white max-w-screen-xl px-12 md:px-28 relative z-10 lg:px-40 -translate-y-8  w-full pointer-events-none">
                    <h1 className=" text-white font-bold leading-tight text-[24px] sm:text-[40px] md:text-[50px] lg:text-[64px] font-spartan pointer-events-none ">Hafiz Abdullah Anwar</h1>
                    <p className="text-white font-bold italic font-['Merriweather'] text-[12px] sm:text-[18px] md:text-[16px] lg:text-[16px] mt-3 mb-8 pointer-events-none" >MERN Stack Developer</p>
                    <button className='about-btn cursor-pointer pointer-events-auto bg-blue-500 font-poppins font-bold text-[8px] sm:text-[16px] sm:font-extrabold bg-gradient-to-l from-[#1595b6] scale-100 to-[#1f2667e6] text-white sm:py-2 sm:px-5 rounded-lg hover:scale-110 transition-scale duration-100 ease-in-out px-3 py-[6px]  ' >About Me</button>
                </div>
                <div className="bg-logo pointer-events-none"></div>
                <button className='latestprojects-btn cursor-pointer relative top-28 bg-blue-500 font-poppins font-bold text-[8px] sm:text-[16px] sm:font-extrabold bg-gradient-to-l from-[#1595b6] scale-100 to-[#1f2667e6] text-white sm:py-2 sm:px-5 rounded-lg hover:scale-110 transition-scale duration-100 ease-in-out px-3 py-[6px]  ' >Latest Works</button>
            </section >
        </>
    )
}

export default Home