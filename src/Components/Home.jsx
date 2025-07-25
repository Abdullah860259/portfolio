import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Links from './Links'
import "./home.css"
import { runMatter } from "./matter.js";
import { AnimatePresence, motion } from "framer-motion";
import AnimateOnScroll from './AnimateOnScroll.jsx';
import AnimateOnScrollReverse from './AnimateOnScrollReverse.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { EffectFlip } from 'swiper/modules';
import 'swiper/css/effect-flip';
import { AnimateToTopAtScroll } from './AnimateToTopAtScroll.jsx';
import emailjs from 'emailjs-com';



const Home = () => {
    const navAndDisc = useRef(null);
    const mainContent = useRef(null);
    const Linksref = useRef(null);
    const latestworkref = useRef(null);
    const [showAboutMe, setshowAboutMe] = useState(false)
    const [showTopper, setshowTopper] = useState(false);
    const [showNavColomn, setShowNavColomn] = useState(
        window.innerWidth < 658 // true or false initially
    );
    const [showContact, setshowContact] = useState(false);
    const [MailMessage, setMailMessage] = useState({

    });
    useEffect(() => {
        if (window.innerWidth > 658) {
            const { render } = runMatter();
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = showAboutMe ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [showAboutMe]);

    useEffect(() => {
        const scrollHandler = () => {
            const scrollY = window.scrollY + window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;
            const percentageHeight = (scrollY / totalHeight) * 100;
            if (percentageHeight > 50) {
                setshowTopper(true)
            } else {
                setshowTopper(false)
            }

        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    })
    useEffect(() => {
        const handleResize = () => {
            setShowNavColomn(window.innerWidth < 658);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const sendEmail = (e) => {
        setshowContact(false);
        navAndDisc.current?.classList.toggle("navAndDiscHide");
        mainContent.current?.classList.toggle("navAndDiscHide");
        Linksref.current?.classList.toggle("navAndDiscHide");
        e.preventDefault();

        emailjs.send(
            'service_zga3vkb',
            'template_g8szup3',
            {
                Name: MailMessage.Name,
                Email: MailMessage.Email,
                Message: MailMessage.Message,
            },
            'GaAJDlPNlZ00O5E_T'
        ).then(
            (result) => {
                console.log('Success:', result.text);
            },
            (error) => {
                console.error('Failed:', error.text);
            }
        );
    }
    function formInputHandler(e) {
        setMailMessage({ ...MailMessage, [e.target.name]: e.target.value });
        console.log(MailMessage)
    }
    return (
        <>
            <AnimatePresence>
                <header className=" relative  flex justify-center items-center flex-col landing-page h-[100dvh] w-full overflow-auto bg-[#111111]  ">
                    <div id="myCanvasContainer" className='hidden sm:block absolute inset-0 w-full h-full z-0 overflow-hidden'></div>
                    <Nav
                        ref={navAndDisc}
                        home={true}
                        NavColomn={showNavColomn}
                        showContact={() => {
                            setshowContact(true)
                            navAndDisc.current?.classList.toggle("navAndDiscHide")
                            mainContent.current?.classList.toggle("navAndDiscHide")
                            Linksref.current?.classList.toggle("navAndDiscHide")
                        }} />
                    <motion.div
                        className='flex pointer-events-none justify-center items-center flex-col w-full h-auto absolute'
                        initial={{ opacity: 0, y: 50 }}   // Start invisible and below
                        animate={{ opacity: 1, y: 0 }}    // Animate to visible and original position
                        transition={{ duration: 0.8 }}    // Duration in seconds
                    >
                        <Links />
                    </motion.div>
                    <div
                        ref={mainContent} className="main-content text-white max-w-screen-xl px-12 md:px-28 relative z-10 lg:px-40 -translate-y-8  w-full pointer-events-none transition-opacity ease-in-out duration-100 delay-500">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}   // Start invisible and below
                            animate={{ opacity: 1, y: 0 }}    // Animate to visible and original position
                            transition={{ duration: 0.5, delay: 0.5 }}    // Duration in seconds
                            className=" text-white font-bold leading-tight text-[24px] sm:text-[40px] md:text-[50px] lg:text-[64px] font-spartan pointer-events-none ">Hafiz Abdullah Anwar</motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}   // Start invisible and below
                            animate={{ opacity: 1, y: 0 }}    // Animate to visible and original position
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="text-white font-bold italic font-['Merriweather'] text-[12px] sm:text-[18px] md:text-[16px] lg:text-[16px] mt-3 mb-8 pointer-events-none" >MERN Stack Developer</motion.p>
                        <button
                            className='about-btn  cursor-pointer pointer-events-auto bg-blue-500 font-poppins font-bold text-[8px] sm:text-[16px] sm:font-extrabold bg-gradient-to-l from-[#1595b6] scale-100 to-[#1f2667e6] text-white sm:py-2 sm:px-5 rounded-lg hover:scale-110 transition-scale duration-100 ease-in-out px-3 py-[6px] active:scale-90    '
                            onClick={() => {
                                setshowAboutMe(!showAboutMe),
                                    navAndDisc.current?.classList.toggle("navAndDiscHide")
                                mainContent.current?.classList.toggle("navAndDiscHide")
                                Linksref.current?.classList.toggle("navAndDiscHide")
                            }}
                        >About Me</button>
                    </div>
                    <motion.div  // Start invisible and below
                        animate={{ y: [-25, 5, -25] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}   // Duration in seconds
                        className="bg-logo pointer-events-none"></motion.div>
                    <button
                        className='latestprojects-btn cursor-pointer relative top-28 bg-blue-500 font-poppins font-bold text-[8px] sm:text-[16px] sm:font-extrabold bg-gradient-to-l from-[#1595b6] scale-100 active:scale-90 to-[#1f2667e6] text-white sm:py-2 sm:px-5 rounded-lg hover:scale-110 transition-scale duration-100 ease-in-out px-3 py-[6px]  
                        '
                        onClick={() => latestworkref.current.scrollIntoView({ behavior: "smooth" })}
                    >Latest Works</button>
                </header >
            </AnimatePresence>
            <AnimatePresence>
                {showAboutMe && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className='absolute top-0 left-0 w-full inset-0 h-full z-20 flex justify-center items-center px-2 md:px-6 overflow-y-hidden'>
                        <div className="about-me shadow-xl shadow-[#ffffff4b]  rounded-2xl text-white h-auto bg-[#191919]  overflow-hidden sm:min-h-[90%] flex flex-col  md:flex-row items-center md:justify-between justify-around px-2 md:px-6 lg:px-12 py-2 md:py-8 relative">
                            <div className=' absolute top-2 right-2 z-30 cursor-pointer'
                                onClick={() => {
                                    setshowAboutMe(!showAboutMe);
                                    navAndDisc.current?.classList.toggle("navAndDiscHide");
                                    mainContent.current?.classList.toggle("navAndDiscHide");
                                    Linksref.current?.classList.toggle("navAndDiscHide");
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
                                ></line></svg>
                            </div>
                            <div className=" select-none discription relative md:w-[45%] md:h-full sm:h-auto  w-full  flex flex-col sm:items-left items-center gap-8 sm:gap-2  sm:justify-between justify-center ">
                                <h2 className='md:mb-4 mb-1  font-semibold text-[#177fa2] font-poppins text-[24px] ' >About Me</h2>
                                <p className='sm:text-[16px] text-[12px] ' > I help business owners and busy web developers to design & develop creative websites that fits their vision and attracts the visitors to stay for ever. Technologies and tools that I use to create such awesome websites.</p>
                                <ul className='flex flex-wrap skills' >
                                    <li>#javascript</li>
                                    <li>#react.js</li>
                                    <li>#redux</li>
                                    <li>#node.js</li>
                                    <li>#express.js</li>
                                    <li>#mongoDB</li>
                                    <li>#mongoose</li>
                                    <li>#cloudinary</li>
                                    <li>#ejs</li>
                                    <li>#html</li>
                                    <li>#css</li>
                                    <li>#sass</li>
                                    <li>#bootstrap</li>
                                    <li>#tailwind</li>
                                    <li>#git</li>
                                    <li>#github</li>
                                    <li>#aws</li>
                                    <li>#terminal</li>
                                    <li>#adobeXD</li>
                                    <li>#figma</li>
                                </ul>
                                <h2 className='text-3xl relative font-semibold sm:mb-4 md-1 text-[#177fa2] font-poppins text-[24px] ' >MERN STACK</h2>
                                <ul className='flex flex-wrap after:content[""]  MERNStack w-[300px] justify-between '>
                                    <div className="mongo flex justify-between flex-col items-center sm:h-[90px] h-[50px] ">
                                        <div className="mongo-svg"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#47A248"
                                            stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="">
                                            <path
                                                d="M17.18 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.266.939 11.885 0 11.885 0c-.002.019-.004.031-.005.049v.013h-.001c-.002.015-.003.025-.004.039v.015h-.002c0 .01-.002.018-.002.026v.026h-.003c-.001.008-.001.018-.003.025v.021h-.002c0 .007 0 .015-.002.021v.02h-.002c0 .01-.001.022-.002.032v.002c-.003.017-.006.034-.009.05v.008h-.002c-.001.004-.003.008-.003.012v.017h-.003v.022h-.005v.018h-.005v.021h-.004v.019h-.004v.017h-.006v.014h-.004v.018h-.004v.014h-.005v.013H11.8v.015h-.004c-.001.001-.001.003-.001.004v.01h-.003c-.001.002-.001.004-.001.006v.006h-.002c-.001.003-.002.008-.002.01-.003.007-.007.014-.01.021v.002c-.002.002-.004.005-.005.007v.008h-.004v.008h-.005v.008h-.003v.01h-.006v.014h-.004v.004h-.004v.008h-.004v.011h-.004v.008h-.006v.011h-.004v.008h-.005v.008h-.003v.01h-.005v.008h-.004v.006h-.004v.008h-.006V.76h-.004v.006h-.005v.008h-.004v.011h-.005v.004h-.003v.008h-.006v.004h-.004v.01h-.004v.004h-.004v.008h-.005v.006h-.003l-.002.004v.004h-.002c-.001.002-.002.002-.002.004v.001h-.001c-.001.003-.002.005-.004.007v.003h-.001c-.005.006-.008.012-.012.018v.001c-.002.002-.007.006-.009.01v.002h-.001c-.001.001-.003.002-.003.003v.003h-.002l-.003.003v.001h-.001c0 .001-.002.002-.003.004v.004h-.003l-.002.002v.002h-.002c0 .002-.002.002-.002.003v.003h-.004c0 .001-.001.002-.002.003V.92h-.003v.004h-.004V.93h-.004v.008h-.005V.93h-.005v.004h-.004V.94h-.005v.008h-.005v.004h-.004v.006h-.004v.004h-.004V.97h-.006v.004h-.004V.98h-.005v.004h-.004v.005h-.005v.01h-.002v.004h-.006v.005h-.004v.002h-.004v.004h-.005v.01h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.005v.004h-.004v.004h-.004v.01h-.004v.005h-.006v.004h-.004v.004h-.005v.006h-.004v.004h-.005v.007h-.004v.004h-.006V1.1h-.002v.004h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.003c-.001.001-.001.002-.001.002v.002h-.002l-.004.004s-.002.002-.004.003v.006h-.004v.005h-.004v.004h-.004v.004h-.003l-.003.003v.003h-.002l-.002.002v.003h-.002c-.005.006-.007.01-.014.016-.002.002-.008.007-.012.01-.012.008-.027.021-.039.032-.008.005-.016.012-.022.017v.001h-.001c-.016.013-.031.025-.049.039v.001c-.024.02-.047.039-.074.062V1.34h-.002c-.057.047-.117.1-.186.159V1.5h-.001c-.169.148-.37.338-.595.568l-.015.015-.004.004C9 3.494 6.857 6.426 6.631 11.164c-.02.392-.016.773.006 1.144v.009c.109 1.867.695 3.461 1.428 4.756v.001c.292.516.607.985.926 1.405v.001c1.102 1.455 2.227 2.317 2.514 2.526.441 1.023.4 2.779.4 2.779l.644.215s-.131-1.701.053-2.522c.057-.257.192-.476.349-.662.106-.075.42-.301.797-.645.018-.019.028-.036.044-.054 1.521-1.418 4.362-4.91 3.388-10.599z">
                                            </path>
                                        </svg></div>
                                        <p className="text-[#47a248] font-bold text-[20px] mt-3 mb-8 pointer-events-none" >M</p>
                                    </div>
                                    <div className="expres flex justify-between flex-col items-center sm:h-[90px] h-[50px] ">
                                        <div className="expres-svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className='w-[50px] h-[50px]'>
                                            <g fill="#ffff">
                                                <path
                                                    d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z"></path>
                                            </g>
                                        </svg>
                                        </div>
                                        <p className="text-[#e2e2e2] font-bold  text-[20px] mt-3 mb-8 pointer-events-none" >E</p>
                                    </div>
                                    <div className="react flex justify-between flex-col items-center h-[90px] ">
                                        <div className="react-svg">
                                            <svg className='h-[50px] w-[50px] ' viewBox="175.7 78 490.6 436.9" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="#61dafb">
                                                    <path
                                                        d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z">
                                                    </path>
                                                    <circle cx="420.9" cy="296.5" r="45.7"></circle>
                                                </g>
                                            </svg>
                                        </div>
                                        <p className="text-[#58c2de] font-bold text-[20px] mt-3 mb-8 pointer-events-none" >R</p>
                                    </div>
                                    <div className="node flex justify-between flex-col items-center h-[90px]  ">
                                        <div className="node-svg">
                                            <svg className='h-[50px] w-[50px] ' viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMinYMin meet">
                                                <g fill="#8CC84B">
                                                    <path
                                                        d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z">
                                                    </path>
                                                    <path
                                                        d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p className="text-[#8cc84b] font-bold text-[20px] mt-3 mb-8 pointer-events-none" >N</p>
                                    </div>
                                </ul>
                            </div>
                            <div className="coder-svg ">
                                <svg className='w-[300px] h-auto sm:w-[350px] lg:w-[500px] hidden md:block ' viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="transparent" d="M0 0h900v600H0z" /><rect x="497.551" y="135.737" width="287.503" height="108.825" rx="22.048" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><rect x="579.715" y="168.709" width="176.687" height="13.051" rx="6.525" fill="url(#a)" /><rect x="579.715" y="197.822" width="114.445" height="13.051" rx="6.525" fill="url(#b)" /><path fillRule="evenodd" clipRule="evenodd" d="M542.323 218.167c-15.363 0-27.818-12.631-27.818-28.21s12.455-28.21 27.818-28.21c15.362 0 27.817 12.631 27.817 28.21s-12.455 28.21-27.817 28.21z" fill="#1A729F" /><path d="m552.118 185.255-11.752 12.538-7.055-7.521" stroke="#fff" strokeWidth="4.381" strokeLinecap="round" strokeLinejoin="round" /><path d="M459.482 324.443v131.29c0 9.591-7.775 17.348-17.364 17.348H132.524c-9.589 0-17.364-7.757-17.364-17.348v-131.29c0-9.594 7.777-17.374 17.364-17.374h309.594c9.587 0 17.364 7.78 17.364 17.374z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M234.053 460.812h-91.201c-6.905 0-12.521-5.62-12.521-12.528v-91.256c0-6.908 5.616-12.528 12.521-12.528h91.201c6.904 0 12.521 5.62 12.521 12.528v91.256c0 6.934-5.617 12.528-12.521 12.528z" fill="#1A729F" /><path d="M459.482 324.443a4.357 4.357 0 0 1-4.357 4.356H119.517a4.357 4.357 0 0 1-4.357-4.356c0-9.594 7.777-17.374 17.364-17.374h309.594c9.587 0 17.364 7.78 17.364 17.374z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M137.529 318.361a3.52 3.52 0 0 1-3.511 3.513 3.52 3.52 0 0 1-3.511-3.513 3.52 3.52 0 0 1 3.507-3.514c1.945.024 3.515 1.588 3.515 3.514zm13.568-.001a3.52 3.52 0 0 1-3.511 3.514 3.52 3.52 0 0 1-3.51-3.514 3.519 3.519 0 0 1 3.506-3.513c1.945.023 3.515 1.588 3.515 3.513zm13.568 0a3.52 3.52 0 0 1-3.511 3.514 3.52 3.52 0 0 1-3.511-3.514 3.52 3.52 0 0 1 3.507-3.513c1.968.023 3.515 1.585 3.515 3.513z" fill="#E1E4E5" stroke="#E1E4E5" strokeWidth="1.583" /><rect x="256.152" y="346.524" width="82.39" height="31.912" rx="15.956" fill="url(#c)" /><rect x="256.152" y="425.432" width="82.39" height="31.912" rx="15.956" fill="url(#d)" /><rect x="256.152" y="385.978" width="49.898" height="31.912" rx="15.956" fill="url(#e)" /><rect x="322.876" y="385.978" width="49.898" height="31.912" rx="15.956" fill="url(#f)" /><rect x="389.601" y="385.978" width="49.898" height="31.912" rx="15.956" fill="url(#g)" /><rect x="357.109" y="346.524" width="82.39" height="31.912" rx="15.956" fill="url(#h)" /><rect x="357.109" y="425.432" width="82.39" height="31.912" rx="15.956" fill="url(#i)" /><path d="m168.682 415.543-13.175-13.176 13.175-13.175m39.527 0 13.176 13.175-13.176 13.176m-14.65-32.938-10.982 39.527" stroke="#fff" strokeWidth="9.389" strokeLinecap="round" strokeLinejoin="round" /><path d="M784.569 277.058v131.289c0 9.592-7.775 17.349-17.363 17.349H457.611c-9.589 0-17.363-7.757-17.363-17.349V277.058c0-9.594 7.776-17.375 17.363-17.375h309.595c9.586 0 17.363 7.781 17.363 17.375z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M559.14 413.427h-91.201c-6.905 0-12.521-5.62-12.521-12.529v-91.255c0-6.909 5.616-12.529 12.521-12.529h91.201c6.904 0 12.521 5.62 12.521 12.529v91.255c0 6.935-5.617 12.529-12.521 12.529z" fill="url(#j)" /><path d="M784.569 277.058a4.357 4.357 0 0 1-4.356 4.356H444.604a4.356 4.356 0 0 1-4.356-4.356c0-9.594 7.776-17.375 17.363-17.375h309.595c9.586 0 17.363 7.781 17.363 17.375z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M462.616 270.975a3.52 3.52 0 0 1-3.511 3.513 3.52 3.52 0 0 1-3.511-3.513 3.52 3.52 0 0 1 3.506-3.514c1.946.024 3.516 1.588 3.516 3.514zm13.568-.001a3.52 3.52 0 0 1-3.511 3.514 3.52 3.52 0 0 1-3.511-3.514 3.52 3.52 0 0 1 3.507-3.513c1.945.023 3.515 1.588 3.515 3.513zm13.568 0a3.52 3.52 0 0 1-3.511 3.514 3.52 3.52 0 0 1-3.51-3.514 3.52 3.52 0 0 1 3.506-3.513c1.968.023 3.515 1.585 3.515 3.513z" fill="#E1E4E5" stroke="#E1E4E5" strokeWidth="1.583" /><rect x="581.239" y="299.138" width="82.39" height="31.912" rx="15.956" fill="url(#k)" /><rect x="581.239" y="378.047" width="82.39" height="31.912" rx="15.956" fill="url(#l)" /><rect x="581.239" y="338.592" width="49.898" height="31.912" rx="15.956" fill="url(#m)" /><rect x="647.963" y="338.592" width="49.898" height="31.912" rx="15.956" fill="url(#n)" /><rect x="714.687" y="338.592" width="49.898" height="31.912" rx="15.956" fill="url(#o)" /><rect x="682.196" y="299.138" width="82.39" height="31.912" rx="15.956" fill="url(#p)" /><rect x="682.196" y="378.047" width="82.39" height="31.912" rx="15.956" fill="url(#q)" /><path d="m493.769 368.157-13.176-13.175 13.176-13.176m39.527 0 13.176 13.176-13.176 13.175m-14.651-32.937-10.982 39.526" stroke="#fff" strokeWidth="9.389" strokeLinecap="round" strokeLinejoin="round" /><path d="M482.623 132.697v131.289c0 9.592-7.774 17.349-17.363 17.349H155.665c-9.588 0-17.363-7.757-17.363-17.349V132.697c0-9.594 7.777-17.375 17.363-17.375H465.26c9.587 0 17.363 7.781 17.363 17.375z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M257.195 269.065h-91.201c-6.905 0-12.521-5.619-12.521-12.528v-91.256c0-6.908 5.616-12.528 12.521-12.528h91.201c6.904 0 12.521 5.62 12.521 12.528v91.256c0 6.935-5.617 12.528-12.521 12.528z" fill="#1A729F" /><path d="M482.623 132.697a4.356 4.356 0 0 1-4.356 4.356H142.658a4.357 4.357 0 0 1-4.356-4.356c0-9.594 7.777-17.375 17.363-17.375H465.26c9.587 0 17.363 7.781 17.363 17.375z" fill="#fff" stroke="#E1E4E5" strokeWidth="2.321" /><path d="M160.671 126.613a3.52 3.52 0 0 1-3.511 3.514 3.52 3.52 0 0 1-3.511-3.514 3.52 3.52 0 0 1 3.507-3.513c1.945.024 3.515 1.588 3.515 3.513zm13.569.001a3.52 3.52 0 0 1-3.511 3.513 3.52 3.52 0 0 1-3.511-3.513 3.52 3.52 0 0 1 3.506-3.514c1.946.024 3.516 1.588 3.516 3.514zm13.567 0a3.52 3.52 0 0 1-3.511 3.513 3.52 3.52 0 0 1-3.51-3.513 3.52 3.52 0 0 1 3.506-3.514c1.968.024 3.515 1.585 3.515 3.514z" fill="#E1E4E5" stroke="#E1E4E5" strokeWidth="1.583" /><rect x="279.294" y="154.777" width="82.39" height="31.912" rx="15.956" fill="url(#r)" /><rect x="279.294" y="233.686" width="82.39" height="31.912" rx="15.956" fill="url(#s)" /><rect x="279.294" y="194.231" width="49.898" height="31.912" rx="15.956" fill="url(#t)" /><rect x="346.019" y="194.231" width="49.898" height="31.912" rx="15.956" fill="url(#u)" /><rect x="412.743" y="194.231" width="49.898" height="31.912" rx="15.956" fill="url(#v)" /><rect x="380.251" y="154.777" width="82.39" height="31.912" rx="15.956" fill="url(#w)" /><rect x="380.251" y="233.686" width="82.39" height="31.912" rx="15.956" fill="url(#x)" /><path d="m191.824 223.796-13.175-13.175 13.175-13.176m39.527 0 13.176 13.176-13.176 13.175m-14.65-32.938-10.982 39.527" stroke="#fff" strokeWidth="9.389" strokeLinecap="round" strokeLinejoin="round" /><path d="m418.888 313.175 13.538-4.118 58.854-1.732 13.273 3.623-1.732 32.343-30.028 19.159-29.126-.583-18.31-16.684-4.065-16.543-2.404-15.465z" fill="#F8AE9D" /><path d="M588.805 365.188c-4.26-8.783-8.342-15.835-11.983-21.403a53.345 53.345 0 0 0-30.717-22.357l-48.002-13.008s-2.492 47.967-35.507 47.967-39.448-44.98-39.448-44.98l-55.549 22.163c-1.909.742-14.793 5.196-29.78 37.345-14.281 30.611-20.52 46.287-20.52 46.287l57.228 16.526 3.57 51.466-1.219 29.391 173.698-.389-.972-33.598.725-51.519 2.174 3.517 57.811-23.188s-7.441-15.27-21.509-44.22z" fill="#1A729F" /><path d="M456.987 330.287c14.088-.259 30.092-27.739 30.092-27.739l.919-70.587c.736-20.33-11.911-37.652-34.705-37.748l-2.116.096c-21.216 1.011-38.017 16.378-38.584 35.314-.536 17.622-.858 37.091-.168 46.497 1.441 19.469 23.653 16.183 23.653 16.183.046 0-.061 9.807 0 15.536.168 12.865 15.253 22.886 20.909 22.448z" fill="#F8AE9D" /><path d="M480.959 235.833c.388-.184 15.562-5.252 15.901 9.736.339 14.989-15.546 12.225-15.578 11.795-.032-.43-.323-21.531-.323-21.531zM322.231 418.635l-23.277 46.712a34.065 34.065 0 0 0-3.535 16.843c.884 18.133 15.854 32.396 34.005 32.396l67.297-1.058 2.373-33.265-50.794-12.248 19.246-36.39-45.315-12.99zm285.132-8.041s14.439 42.894 30.187 81.882c.318.778.671 2.227.954 3.023 3.552 9.667-7.14 19.087-17.939 19.087l-91.003-.159v-29.586l56.61-12.018-20.502-45.528 41.693-16.701z" fill="#F8AE9D" /><path d="M424.968 483.48c.017.106 2.085-.548 5.532-.76 3.428-.23 8.289.159 13.131 2.227 4.843 2.068 8.501 5.302 10.693 7.935 2.227 2.634 3.181 4.595 3.27 4.525.035-.018-.177-.513-.654-1.361a26.731 26.731 0 0 0-2.316-3.411c-2.156-2.74-5.832-6.098-10.781-8.201-4.948-2.103-9.915-2.456-13.379-2.103a25.339 25.339 0 0 0-4.065.689c-.936.23-1.449.424-1.431.46zm3.11-7.158c.036.141 2.139-.901 5.762-1.007 3.606-.16 8.678.936 13.415 3.799 4.736 2.881 8.289 6.522 10.798 9.138 1.202 1.272 2.192 2.333 2.969 3.146.707.742 1.096 1.149 1.132 1.113.035-.018-.319-.477-.973-1.255a105.506 105.506 0 0 0-2.827-3.269c-2.457-2.687-5.992-6.416-10.817-9.35-4.825-2.916-10.038-3.976-13.715-3.711-1.838.106-3.305.442-4.277.777-.495.142-.848.318-1.095.425-.248.106-.372.176-.372.194z" fill="#EB996E" /><path d="M548.702 479.414h-13.061s-29.48-10.657-35.542-9.632c-5.461.919-25.45 14.192-29.374 16.825-.442.301-.76.707-.954 1.202a4.281 4.281 0 0 0 2.386 5.444l.406.177-.176.6a7.146 7.146 0 0 0-.301 2.386c.141 2.811 3.924 3.659 5.355 1.238l-.76 1.343a3.342 3.342 0 0 0-.424 1.785l.071 1.219a3.28 3.28 0 0 0 2.262 2.934 3.243 3.243 0 0 0 3.429-.901c2.527-2.793 8.006-8.378 11.718-8.996 3.287-.548 8.783-.619 12.106-.601a4.078 4.078 0 0 1 3.8 2.616c-2.192.159-17.515 8.147-22.941 11.01-1.679.884-2.934 2.475-3.146 4.366-.194 1.697.654 3.482 4.012 2.686 7.211-1.679 20.166-7.635 20.166-7.635s6.681-1.909 11.011 1.149c6.097 4.295 8.89 5.868 14.121 4.136 5.232-1.732 9.085-4.224 9.085-4.224l10.304-1.025c.035 0 9.773-24.355-3.553-28.102z" fill="#F8AE9D" /><path d="M509.766 484.398c-.018.106-2.085-.547-5.532-.76-3.429-.229-8.289.16-13.131 2.227-4.843 2.068-8.502 5.302-10.693 7.936-2.227 2.633-3.181 4.595-3.27 4.524-.035-.017.177-.512.654-1.361a26.598 26.598 0 0 1 2.315-3.411c2.157-2.739 5.833-6.097 10.781-8.2 4.949-2.103 9.915-2.457 13.38-2.103 1.732.159 3.128.441 4.064.689.937.247 1.45.424 1.432.459zm-3.111-7.157c-.035.141-2.138-.902-5.761-1.008-3.606-.159-8.678.937-13.415 3.8-4.736 2.881-8.289 6.522-10.798 9.137-1.202 1.273-2.192 2.333-2.97 3.146-.707.743-1.095 1.149-1.131 1.114-.035-.018.318-.477.972-1.255.654-.795 1.609-1.909 2.828-3.27 2.457-2.686 5.991-6.415 10.816-9.349 4.825-2.916 10.039-3.977 13.715-3.712 1.838.106 3.305.442 4.277.778.495.141.849.318 1.096.424.248.106.371.177.371.195z" fill="#EB996E" /><path d="M531.029 515.416H393.898a7.263 7.263 0 0 1-7.264-6.964l-4.118-94.378c-.177-4.135 3.128-7.6 7.264-7.6h145.102c4.135 0 7.44 3.447 7.281 7.583l-3.853 94.395c-.159 3.889-3.375 6.964-7.281 6.964z" fill="#31446C" /><path d="M476.188 462.692c0 7.754-6.27 14.023-14.024 14.023s-14.023-6.269-14.023-14.023 6.269-14.024 14.023-14.024 14.024 6.303 14.024 14.024z" fill="#fff" /><path fill="#F8AE9D" d="M475.657 263.141h12.372v53.021h-12.372z" /><path d="M480.513 215.764c-2.229 2.877-6.161 3.511-9.399 4.08-4.354.764-6.508 2.356-8.768 6.63-1.431 2.731-2.862 5.721-5.423 7.2-2.082 1.207-2.006-1.871-2.336-4.255a5.494 5.494 0 0 0-.128-.627c-.504-1.903-2.529-1.578-3.124.299-.542 1.69-1.702 3.12-3.179 3.917-.241.13-.497.243-.753.195-.346-.049-.617-.374-.843-.667-.474-.612-.944-1.39-1.43-2.214-1.597-2.708-4.62-1.74-6.404.849-1.114 1.609-2.44 3.267-4.263 3.641-.587.13-1.325.032-1.596-.537-.347-.698.195-1.397.105-2.112-.075-.667-.362-.959-.678-1.528-1.241-2.207-4.082-2.287-5.828-.454a64.452 64.452 0 0 1-3.798 3.672c-.557.487-1.371.975-1.928.487-.301-.26-.376-.698-.437-1.121-.316-2.064-.617-4.128-.934-6.192-.18-1.154-.798-2.665-1.853-2.373-.512.147-.813.683-1.099 1.17-.347.618-6.538 7.655-6.658 7.119-.965-3.998-2.938-7.639-3.902-11.637-6.236-25.726 21.436-46.415 42.57-46.529 4.7-.032 8.994.044 13.558 1.133 4.866 1.17 10.002 3.028 14.416 5.644 6.191 3.657 10.876 10.304 9.671 18.235" fill="#31446C" /><path d="M469.398 207.068c-3.109 3.414-3.933 8.218-4.222 12.756-.427 6.844.152 13.954 3.414 20.029.93 1.73 1.616 10.288 3.049 9.815.458-.147.381-6.784 1.586-10.362 1.859-5.543 10.427-7.656 14.283-4.153 6.159 5.572 2.546 12.342.503 16.555-1.219 2.543-3.155 5.396-3.491 8.086-.411 3.444-.533 15.994 1.784 18.92 1.936 2.454 3.994-9.401 5.747-11.736 12.973-17.398 25.412-61.699 3.262-71.307-3.369-1.464-13.765-2.217-16.921-.355" fill="#31446C" /><path fillRule="evenodd" clipRule="evenodd" d="M568.947 99.883h-3.516c-.85 0-1.534-.692-1.534-1.535v-3.515c0-.85.691-1.535 1.534-1.535h3.516a1.54 1.54 0 0 1 1.534 1.535v3.515a1.53 1.53 0 0 1-1.534 1.535zm-12.189 0h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.515c0-.85.692-1.535 1.534-1.535h3.516a1.54 1.54 0 0 1 1.534 1.535v3.515a1.54 1.54 0 0 1-1.534 1.535zm-12.197 0h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.515c0-.85.691-1.535 1.534-1.535h3.516a1.54 1.54 0 0 1 1.534 1.535v3.515a1.53 1.53 0 0 1-1.534 1.535zm-12.19 0h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.515c0-.85.692-1.535 1.534-1.535h3.516c.85 0 1.542.692 1.542 1.535v3.515a1.552 1.552 0 0 1-1.542 1.535zm-12.189 0h-3.516c-.85 0-1.541-.692-1.541-1.535v-3.515c0-.85.691-1.535 1.541-1.535h3.516a1.54 1.54 0 0 1 1.535 1.535v3.515a1.54 1.54 0 0 1-1.535 1.535zm36.129-13.291h-3.515a1.54 1.54 0 0 1-1.535-1.535v-3.523A1.54 1.54 0 0 1 552.796 80h3.515c.85 0 1.535.692 1.535 1.534v3.516a1.533 1.533 0 0 1-1.535 1.542zm-12.189 0h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.523A1.54 1.54 0 0 1 540.606 80h3.516a1.54 1.54 0 0 1 1.534 1.534v3.516a1.532 1.532 0 0 1-1.534 1.542zm-12.189 0h-3.516c-.85 0-1.542-.692-1.542-1.535v-3.523c0-.842.692-1.534 1.542-1.534h3.516a1.54 1.54 0 0 1 1.534 1.534v3.516c0 .85-.691 1.542-1.534 1.542zm12.628 27.57h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.515c0-.85.691-1.535 1.534-1.535h3.516a1.54 1.54 0 0 1 1.534 1.535v3.515a1.531 1.531 0 0 1-1.534 1.535zm-12.19 0h-3.516a1.54 1.54 0 0 1-1.534-1.535v-3.515c0-.85.692-1.535 1.534-1.535h3.516c.85 0 1.542.692 1.542 1.535v3.515a1.552 1.552 0 0 1-1.542 1.535z" fill="#E1E4E5" /><rect x="199" y="511" width="527" height="10" rx="5" fill="#E1E4E5" /><rect x="667.014" y="493.877" width="42.252" height="4.923" rx="2.461" transform="rotate(-45 667.014 493.877)" fill="#E1E4E5" /><rect x="683.214" y="493.992" width="15.688" height="4.923" rx="2.461" transform="rotate(-45 683.214 493.992)" fill="#E1E4E5" /><defs><linearGradient id="m" x1="607.252" y1="388.396" x2="606.622" y2="303.871" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="a" x1="671.826" y1="189.077" x2="671.796" y2="154.507" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="c" x1="299.104" y1="396.327" x2="298.723" y2="311.8" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="d" x1="299.104" y1="475.236" x2="298.723" y2="390.708" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="e" x1="282.165" y1="435.781" x2="281.536" y2="351.257" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="f" x1="348.889" y1="435.781" x2="348.26" y2="351.257" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="g" x1="415.614" y1="435.781" x2="414.985" y2="351.257" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="h" x1="400.061" y1="396.327" x2="399.68" y2="311.8" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="i" x1="400.061" y1="475.236" x2="399.68" y2="390.708" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="j" x1="516.018" y1="478.638" x2="512.429" y2="170.586" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="k" x1="624.19" y1="348.941" x2="623.809" y2="264.414" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="l" x1="624.19" y1="427.85" x2="623.809" y2="343.323" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="b" x1="639.377" y1="218.19" x2="639.332" y2="183.621" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="n" x1="673.976" y1="388.396" x2="673.347" y2="303.871" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="o" x1="740.7" y1="388.396" x2="740.071" y2="303.871" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="p" x1="725.148" y1="348.941" x2="724.766" y2="264.414" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="q" x1="725.148" y1="427.85" x2="724.766" y2="343.323" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="r" x1="322.246" y1="204.58" x2="321.865" y2="120.053" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="s" x1="322.246" y1="283.489" x2="321.865" y2="198.961" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="t" x1="305.307" y1="244.034" x2="304.678" y2="159.51" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="u" x1="372.032" y1="244.034" x2="371.402" y2="159.51" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="v" x1="438.756" y1="244.034" x2="438.127" y2="159.51" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="w" x1="423.203" y1="204.58" x2="422.822" y2="120.053" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient><linearGradient id="x" x1="423.203" y1="283.489" x2="422.822" y2="198.961" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#EEE" /></linearGradient></defs></svg>
                            </div>
                        </div>
                    </motion.div>)}
            </AnimatePresence>
            <section
                className='w-full h-auto flex flex-col justify-center items-center text-black bg-[#fff] after:content-[""] relative after:absolute after:h-full after:w-[2px] after:bg-[#8bc3d6] after:top-4 after:hidden after:sm:block  '
                ref={latestworkref}>
                <div className='w-full p-4 h-auto  flex justify-center items-center'>
                    <h1
                        className='text-2xl md:text-4xl font-bold select-none name bg-white z-10  text-[#177f95] p-3 border-b-2 border-t-2 border-l-2 border-r-2 rounded-lg border-[#177f95] relative' >Latest Works</h1>
                </div>
                <div className='after:contents-[""] after:hidden after:sm:block relative after:absolute after:w-[40%] after:h-[2px]  after:bg-[#6f11b0]  after:top-[50%] after:left-[10%]  '>
                    <a href="https://todoabdullah.vercel.app" target="_blank" rel="noopener noreferrer">
                        <div className="before hidden sm:block absolute  w-[18px] h-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] border-[3px] border-[#6f11b0] rounded-full z-10 hover:scale-125 cursor-pointer transition duration-100 ease-in "></div>
                    </a>
                    <div className="project w-full max-w-screen-xl xl:py-40  overflow-hidden flex justify-center items-center py-4 px-2  flex-col ">
                        <div className="project w-full   h-[100dvh] sm:h-auto  py-10 px-5 sm:px-0 gap-10 flex sm:flex-row flex-col justify-center items-center content-center sm:justify-between sm:items-center">
                            <AnimateOnScroll>
                                <a href="https://todoabdullah.vercel.app" className='flex  justify-center items-center' target="_blank" rel="noopener noreferrer">
                                    <img className='sm:w-[260px] relative z-30 md:w-[330px] lg:w-[450px] w-[85%] h-auto ml-0 sm:ml-10 hover:scale-110 transition duration-100 ease-in  ' src="/todoapp.webp" alt="Project 1" />
                                </a>
                                <span className='w-auto opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 flex justify-center items-center gap-2 transition duration-200  ease-jump  h-auto px-5 py-2 bg-[#6d11b0] rounded-lg absolute -top-[30px] left-1/2 -translate-x-[45px] text-white z-50 after:content-[""] after:absolute after:w-[15px] after:h-[15px] after:bg-[#6d11b0] after:top-[30px] after:rounded-sm after:left-1/2 after:-translate-x-1/2 after:rotate-45' >
                                    To Do App
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </span>
                            </AnimateOnScroll>
                            <AnimateToTopAtScroll className={'text-black w-full   sm:w-[45%] h-auto flex flex-col justify-items-start gap-6 sm:gap-4 sm:pr-12  '}>
                                <h2 className='text-2xl  md:text-3xl font-bold select-none name  text-[#6e11b0]' >To Do App</h2>
                                <p className='text-[16px] md:text-xl select-none name  text-[#6e11b0]' >{"(To Do App)"}</p>
                                <p className='text-[14px]'>It is a simple to do app that allows you to create, update, and delete tasks. It is equipped with manually created Authenticaltion System and have a proper organized backend.</p>
                                <ul className='flex row flex-wrap gap-2 text-[12px] md:text-sm select-none' >
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#React js</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Node js</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Express js</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#MongoDB</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Mongoose</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Jsonwebtoken</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Bcrypt</li>
                                </ul>
                            </AnimateToTopAtScroll>
                        </div>
                    </div>
                </div>
                <div className='after:contents-[""] relative after:absolute after:hidden after:sm:block after:w-[40%] after:h-[2px] after:bg-[#fc0307]  after:top-[50%] after:right-[10%]  '>
                    <a href="https://projectabdullah.netlify.app" target="_blank" rel="noopener noreferrer">
                        <div className="before hidden sm:block absolute  w-[18px] h-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] border-[3px] border-[#fc0307] rounded-full z-10 hover:scale-125 cursor-pointer transition duration-100 ease-in "></div>
                    </a>
                    <div className="project w-full max-w-screen-xl xl:py-40  overflow-hidden flex justify-center items-center py-4 px-2  ">
                        <div className="project w-full   h-[100dvh] sm:h-auto  py-10 px-5 sm:px-0 gap-10 flex sm:flex-row-reverse flex-col justify-center items-center content-center sm:justify-between sm:items-center">
                            <AnimateOnScrollReverse>
                                <a href="https://projectabdullah.netlify.app" className='flex  justify-center items-center' target="_blank" rel="noopener noreferrer">
                                    <img className='sm:w-[260px] relative z-30 md:w-[330px] lg:w-[450px] w-[85%] h-auto ml-0 sm:mr-10 hover:scale-110 transition duration-100 ease-in  ' src="/2.webp" alt="Project 1" />
                                </a>
                                <span className='w-auto opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 flex justify-center items-center gap-2 transition duration-200  ease-jump  h-auto px-5 py-2 bg-[#fc0307] rounded-lg absolute -top-[30px] left-1/2 -translate-x-[80px] text-white z-50 after:content-[""] after:absolute after:w-[15px] after:h-[15px] after:bg-[#fc0307] font-bold after:top-[30px] after:rounded-sm after:left-1/2 after:-translate-x-1/2 after:rotate-45' >
                                    Netflix Clone
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </span>
                            </AnimateOnScrollReverse>
                            <AnimateToTopAtScroll className={'text-black w-full   sm:w-[45%] h-auto flex flex-col justify-items-start gap-6 sm:gap-4 sm:pl-12'}>
                                <h2 className='text-2xl  md:text-3xl font-bold select-none name  text-[#fc0307]' >Netflix</h2>
                                <p className='text-[16px] md:text-xl select-none name  text-[#fc0307]' >{"(Netflix Clone)"}</p>
                                <p className='text-[14px]'>It is the one of my initial projects. I have made it to test challenge my grip on CSS. It is a simple clone of Netflix website. It Consists on pure HTML and CSS</p>
                                <ul className='flex row flex-wrap gap-2 text-[12px] md:text-sm select-none' >
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#HTMl</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#CSS</li>
                                </ul>
                            </AnimateToTopAtScroll>
                        </div>
                    </div>
                </div>
                <div className='after:contents-[""] relative after:absolute after:hidden after:sm:block after:w-[40%] after:h-[2px] after:bg-[#354950]  after:top-[50%] after:left-[10%]  '>
                    <a href="https://abducurrency.netlify.app" target="_blank" rel="noopener noreferrer">
                        <div className="before hidden sm:block absolute  w-[18px] h-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] border-[3px] border-[#354950] rounded-full z-10 hover:scale-125 cursor-pointer transition duration-100 ease-in "></div>
                    </a>
                    <div className="project w-full max-w-screen-xl xl:py-40  overflow-hidden flex justify-center items-center py-4 px-2  flex-col ">
                        <div className="project w-full   h-[100dvh] sm:h-auto  py-10 px-5 sm:px-0 gap-10 flex sm:flex-row flex-col justify-center items-center content-center sm:justify-between sm:items-center">
                            <AnimateOnScroll>
                                <a href="https://abducurrency.netlify.app" className='flex  justify-center items-center' target="_blank" rel="noopener noreferrer">
                                    <img className='sm:w-[260px] relative z-30 md:w-[330px] lg:w-[450px] w-[85%] h-auto ml-0 sm:ml-10 hover:scale-110 transition duration-100 ease-in  ' src="/sd.webp" alt="Project 1" />
                                </a>
                                <span className='w-auto opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 flex justify-center items-center gap-2 transition duration-200  ease-jump  h-auto px-5 py-2 bg-[#354950] rounded-lg absolute -top-[30px] left-1/2 -translate-x-[70px] text-white z-50 after:content-[""] after:absolute after:w-[15px] after:h-[15px] after:bg-[#354950] after:top-[30px] after:rounded-sm after:left-1/2 after:-translate-x-1/2 after:rotate-45' >
                                    Currency Converter
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </span>
                            </AnimateOnScroll>
                            <AnimateToTopAtScroll className={'text-black w-full   sm:w-[45%] h-auto flex flex-col justify-items-start gap-6 sm:gap-4 sm:pr-12'}>
                                <h2 className='text-2xl  md:text-3xl font-bold select-none name  text-[#354950]' >Currency Converter</h2>
                                <p className='text-[16px] md:text-xl select-none name  text-[#354950]' >{"(Currency Converter App)"}</p>
                                <p className='text-[14px]'>It is also from my initial Projects. I have made it to anlyze my grip on Asyncronous Javascript. It is based on API.It totally consists on HTML CSS and JS.</p>
                                <ul className='flex row flex-wrap gap-2 text-[12px] md:text-sm select-none' >
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#JavaScript</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#CSS</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#HTML</li>
                                </ul>
                            </AnimateToTopAtScroll>
                        </div>
                    </div>
                </div>
                <div className='after:contents-[""] relative after:absolute after:hidden after:sm:block after:w-[40%] after:h-[2px] after:bg-[#ccac6c]  after:top-[50%] after:right-[10%]  '>
                    <a href="https://tttabdullah.netlify.app" target="_blank" rel="noopener noreferrer">
                        <div className="before hidden sm:block absolute  w-[18px] h-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] border-[3px] border-[#ccac6c] rounded-full z-10 hover:scale-125 cursor-pointer transition duration-100 ease-in "></div>
                    </a>
                    <div className="project w-full max-w-screen-xl xl:py-40  overflow-hidden flex justify-center items-center py-4 px-2  ">
                        <div className="project w-full   h-[100dvh] sm:h-auto  py-10 px-5 sm:px-0 gap-10 flex sm:flex-row-reverse flex-col justify-center items-center content-center sm:justify-between sm:items-center">
                            <AnimateOnScrollReverse>
                                <a href="https://tttabdullah.netlify.app" className='flex  justify-center items-center' target="_blank" rel="noopener noreferrer">
                                    <img className='sm:w-[260px] relative z-30 md:w-[330px] lg:w-[450px] w-[85%] h-auto ml-0 sm:mr-10 hover:scale-110 transition duration-100 ease-in  ' src="/tictactow.webp" alt="Project 1" />
                                </a>
                                <span className='w-auto opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 flex justify-center items-center gap-2 transition duration-200  ease-jump  h-auto px-5 py-2 bg-[#ccac6c] rounded-lg absolute -top-[30px] left-1/2 -translate-x-[120px] text-white z-50 after:content-[""] after:absolute after:w-[15px] after:h-[15px] after:bg-[#ccac6c] font-bold after:top-[30px] after:rounded-sm after:left-1/2 after:-translate-x-1/2 after:rotate-45' >
                                    Tic Tack Tow Game
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </span>
                            </AnimateOnScrollReverse>
                            <AnimateToTopAtScroll className={'text-black w-full   sm:w-[45%] h-auto flex flex-col justify-items-start gap-6 sm:gap-4 sm:pl-12'}>
                                <h2 className='text-2xl  md:text-3xl font-bold select-none name  text-[#ccac6c]' >Tic Tac Tow</h2>
                                <p className='text-[16px] md:text-xl select-none name  text-[#ccac6c]' >{"(Tic Tac Tow Game)"}</p>
                                <p className='text-[14px]'>It is a Tic Tac Tow Game based on intermediate level Javascript. It is a 2 player game. I had also created it my learning phase.</p>
                                <ul className='flex row flex-wrap gap-2 text-[12px] md:text-sm select-none' >
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#Javascript</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#CSS</li>
                                    <li className='px-2 py-2 border-[1px] border-[#0000007c] rounded-2xl ' >#HTML</li>
                                </ul>
                            </AnimateToTopAtScroll>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 absolute -bottom-5 z-50 h-auto  flex justify-center items-center'>
                    <h1 className='text-2xl md:text-4xl font-bold select-none name bg-white z-10  text-[#177f95] p-3 border-b-2 border-t-2 border-l-2 border-r-2 rounded-lg border-[#177f95] relative' >What My Clients Say ?</h1>
                </div>
                <br />
            </section >
            <section className='w-full sm:my-12  my-12 sm:mt-20  px-4 h-auto flex  justify-center items-center '>
                <div className='max-w-[850px] w-full relative ' >
                    <div className="custom-prev hidden sm:block left-0 -translate-y-1/2  cursor-pointer absolute top-1/2 hover:scale-125 transition duration-100 ease active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#16789f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                    </div>
                    <Swiper
                        className='sm:w-[calc(100%-150px)] w-full w-min-[300px] h-auto shadow-lg shadow-[#00000023] '
                        modules={[Navigation, Pagination, EffectFlip]}
                        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                        slidesPerView={1}
                        effect="flip" // ✅
                    // cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }}
                    >
                        <SwiperSlide className='w-full py-10 select-none h-auto border-[1px]  rounded-xl flex justify-center items-center flex-row px-4 sm:px-20 sm:py-4 lg:py-10' >
                            <div className='flex flex-col md:flex-row justify-center items-center gap-8' >
                                <img className='w-[190px] inline shrink-0 shadow-lg shadow-[#00000075] h-[190px] rounded-full' src="/gautham.webp" alt="Client 1" />
                                <div className='flex sm:pt-10 flex-col justify-center items-center gap-4' >
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis assumenda, corrupti totam beatae qui reprehenderit! Perspiciatis, inventore! Aut cumque mollitia ipsum atque.</p>
                                    <div className='flex w-full  flex-col justify-center items-end'>
                                        <p className='font-bold text-[#177f95] text-2xl' >Lorem, ipsum dolor.</p>
                                        <p className='font-bold text-[#177f95] ' >Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='w-full py-10 select-none h-auto border-[1px]  rounded-xl flex justify-center items-center flex-row px-4 sm:px-20 sm:py-4 lg:py-10' >
                            <div className='flex flex-col md:flex-row justify-center items-center gap-8' >
                                <img className='w-[190px] inline shrink-0 shadow-lg shadow-[#00000075] h-[190px] rounded-full' src="/gautham.webp" alt="Client 1" />
                                <div className='flex sm:pt-10 flex-col justify-center items-center gap-4' >
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis assumenda, corrupti totam beatae qui reprehenderit! Perspiciatis, inventore! Aut cumque mollitia ipsum atque.</p>
                                    <div className='flex w-full  flex-col justify-center items-end'>
                                        <p className='font-bold text-[#177f95] text-2xl' >Lorem, ipsum dolor.</p>
                                        <p className='font-bold text-[#177f95] ' >Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='w-full py-10 select-none h-auto border-[1px]  rounded-xl flex justify-center items-center flex-row px-4 sm:px-20 sm:py-4 lg:py-10     ' >
                            <div className='flex flex-col md:flex-row justify-center items-center gap-8' >
                                <img className='w-[190px] inline shrink-0 shadow-lg shadow-[#00000075] h-[190px] rounded-full' src="/gautham.webp" alt="Client 1" />
                                <div className='flex sm:pt-10 flex-col justify-center items-center gap-4' >
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perspiciatis assumenda, corrupti totam beatae qui reprehenderit! Perspiciatis, inventore! Aut cumque mollitia ipsum atque.</p>
                                    <div className='flex w-full  flex-col justify-center items-end'>
                                        <p className='font-bold text-[#177f95] text-2xl' >Lorem, ipsum dolor.</p>
                                        <p className='font-bold text-[#177f95] ' >Designer</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="custom-next  hidden sm:block absolute top-1/2 -translate-y-1/2 translate-x-1/4 right-0  cursor-pointer hover:scale-125 transition duration-100 ease active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#16789f"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                    </div>
                </div>
            </section>
            <footer className=' w-full h-auto flex justify-center items-center gap-4 flex-col p-4 sm:p-10 '>
                <p className='text-[#8d8e9b]  select-none text-[12px] self-center sm:text-xs'>Hafiz Abdullah Anwar | Copyright &copy; 2023 | All Rights Reserved</p>
                <a href="/" className='hover:scale-110 transition duration-100 active:scale-90'>
                    <svg width="50" height="50" viewBox="0 0 406 368" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M314.899 203.5L314.899 349.43L162.5 209.053M314.899 203.5L283.037 203.586M314.899 203.5L337.881 203.586L381 171.109L314.899 171.109M162.5 209.053L118.044 170.96L157.5 171.109M162.5 209.053L65.5 301.465L20.5595 301.465L137.482 189.156M200.5 171.109L283.037 96.5L283.037 171.109M200.5 171.109L283.037 171.109M200.5 171.109L157.5 171.109M283.037 203.586L210.846 203.123L283.037 271.086L283.037 203.586ZM283.037 171.109L314.899 171.109M157.5 171.109L316.135 20.4322L314.899 171.109" stroke="#1F2667" stroke-opacity="0.9" stroke-width="16"></path>
                        <path d="M314.899 203.5L314.899 349.43L162.5 209.053M314.899 203.5L283.037 203.586M314.899 203.5L337.881 203.586L381 171.109L314.899 171.109M162.5 209.053L118.044 170.96L157.5 171.109M162.5 209.053L65.5 301.465L20.5595 301.465L137.482 189.156M200.5 171.109L283.037 96.5L283.037 171.109M200.5 171.109L283.037 171.109M200.5 171.109L157.5 171.109M283.037 203.586L210.846 203.123L283.037 271.086L283.037 203.586ZM283.037 171.109L314.899 171.109M157.5 171.109L316.135 20.4322L314.899 171.109" stroke="url(#paint0_linear)" stroke-width="16"></path>
                        <defs>
                            <linearGradient id="paint0_linear" x1="205.549" y1="20.0169" x2="204.338" y2="342.461" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#1595B6"></stop>
                                <stop offset="1" stop-color="#1595B6" stop-opacity="0"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </a>
                <ul className='flex justify-center items-center gap-4 flex-row ' >
                    <li class="linkedin-icon  text-[#1788ae] hover:scale-110 transition duration-100 active:scale-90 ">
                        <a href="https://www.linkedin.com/in/abdullah-anwar-a4013633a/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                    <li class="twitter-icon  text-[#1788ae] hover:scale-110 transition duration-100 active:scale-90">
                        <a href="https://x.com/Abdulla55799774" target="_blank"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li class="instagram-icon  text-[#1788ae] hover:scale-110 transition duration-100 active:scale-90">
                        <a href="https://www.instagram.com/abdu_7817/" target="_blank"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li class="gmail-icon  text-[#1788ae] hover:scale-110 transition duration-100 active:scale-90">
                        <a href="mailto:abdullah860259@gmail.com" target="_blank"><i class="far fa-envelope"></i></a>
                    </li>
                    <li class="github-icon  text-[#1788ae] hover:scale-110 transition duration-100 active:scale-90">
                        <a href="https://github.com/Abdullah860259" target="_blank"><i class="fab fa-github"></i></a>
                    </li>
                </ul>
            </footer>
            <AnimatePresence>
                {showContact && (
                    <div className='absolute select-none pointer-events-auto top-0 right-0 bottom-0 left-0 w-full h-full z-50 sm:py-10 sm:px-16  flex  justify-between items-center' >
                        <motion.div
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            exit={{ y: "100%", opacity: 0 }}
                            className='w-1/2 h-full bg-[#fff] p-10 justify-center items-center hidden sm:flex '>
                            <div className='flex-col flex mb-10 justify-start items-start gap-4'>
                                <h1 className='text-4xl font-bold'>Let’s Connect</h1>
                                <p>
                                    I’m always <span className='font-bold text-[#238794]'>open</span> to new opportunities, collaborations, or just a good conversation.Whether you have a project in mind, a question, or just want to say hello -
                                    <span className='font-bold text-[#238794]'> Feel free to reach out!</span>
                                </p>
                                <p className='font-bold'>📞 Phone: +92 310 1733247 (Fast Response through Whatsapp)</p>
                                <p className='font-bold'>📧 Email: abdullah860259@email.com</p>
                                <p className='font-bold'>📱 Available for: Freelance, Internships, Project Work</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            className='sm:w-1/2 w-full h-full  bg-[#22c1d6]'>
                            <div className='w-full pointer-events-auto  p-5 flex justify-end items-center ' >
                                <svg
                                    onClick={() => {
                                        setshowContact(!showContact);
                                        navAndDisc.current?.classList.toggle("navAndDiscHide");
                                        mainContent.current?.classList.toggle("navAndDiscHide");
                                        Linksref.current?.classList.toggle("navAndDiscHide");
                                    }}
                                    className='cursor-pointer pointer-events-auto duration-150 hover:scale-125 active:scale-90 transition ease-in-out' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                            <div className='flex-col flex sm:hidden p-10 justify-start items-start gap-4'>
                                <h1 className='text-4xl font-bold'>Let’s Connect</h1>
                                <p>
                                    I’m always <span className='font-bold text-[#238794]'>open</span> to new opportunities, collaborations, or just a good conversation.Whether you have a project in mind, a question, or just want to say hello -
                                    <span className='font-bold text-[#238794]'> Feel free to reach out!</span>
                                </p>
                                <p className='font-bold'>📞 Phone: +92 310 1733247 (Fast Response through Whatsapp)</p>
                                <p className='font-bold'>📧 Email: abdullah860259@email.com</p>
                                <p className='font-bold'>📱 Available for: Freelance, Internships,Project Work</p>
                            </div>
                            <div className='w-full h-auto p-10 flex flex-col justify-center items-start gap-1'>
                                <div className='w-full' >
                                    <p className='font-semibold ' >Name*</p>
                                    <input
                                        onChange={(e) => formInputHandler(e)}
                                        className=' outline-none font-poppins text-[#0d161a] mb-3 p-2 bg-transparent border-b-2 w-full' type="text" name='Name' />
                                </div>
                                <div className='w-full' >
                                    <p className='font-semibold ' >Email*</p>
                                    <input
                                        onChange={(e) => formInputHandler(e)}
                                        className=' outline-none font-poppins text-[#0d161a] mb-3 p-2 bg-transparent border-b-2 w-full' type="email" name='Email' />
                                </div>
                                <div className='w-full' >
                                    <p className='font-semibold ' >Message*</p>
                                    <textarea
                                        onChange={(e) => formInputHandler(e)}
                                        className="w-full  h-20 outline-none font-poppins text-[#0d161a] mb-3 p-2 bg-transparent border-b-2 border-white " rows="6" cols="50" name='Message' />
                                </div>

                                <button
                                    onClick={sendEmail}
                                    className='w-full border-2 p-2 border-[#0d161a] text-[#0d161a] hover:bg-[#0d161a] hover:text-[#fff] hover:scale-110  transition ease-in-out duration-200 active:scale-90'>Submit</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {showTopper && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="toper w-[50px] h-[50px] rounded-full fixed bottom-5 right-5 bg-[#1595B6] flex justify-center items-center cursor-pointer hover:scale-110 active:scale-90 transition duration-200 z-1000 after:content-[''] after:w-full after:h-full after:border-2 after:border-black after:absolute after:rounded-full after:-z-10"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF"><path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z" /></svg>
                </motion.div>
            )}
        </>
    )
}

export default Home