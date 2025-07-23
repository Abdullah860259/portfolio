import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import "./profile.css"
import { div, img } from 'framer-motion/client'
import { AnimatePresence, useScroll } from 'framer-motion'
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";     // Radix Icons


const Profile = () => {
    const [showProof, setshowProof] = useState(false);
    const [ShowNav, setShowNav] = useState(true);
    const [showNavColomn, setShowNavColomn] = useState(
        window.innerWidth < 658 // true or false initially
    );
    useEffect(() => {
        const handler = (e) => e.preventDefault;
        if (showProof) {
            document.body.style.overflow = "hidden";
            document.addEventListener("wheel", handler, { passive: false });
        } else {
            document.body.style.overflow = "auto";
            document.removeEventListener("wheel", handler);
        }
    }, [showProof])
    useEffect(() => {
        const handleResize = () => {
            setShowNavColomn(window.innerWidth < 658);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <div className="profile w-full min-h-[100dvh]  bg-[#040518] overflow-auto text-white">
                {ShowNav && (
                    <AnimatePresence>
                        <motion.div
                            className='w-full flex justify-center'
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Nav home={false} NavColomn={showNavColomn} />
                        </motion.div>
                    </AnimatePresence>
                )}

                <div
                    className="flex justify-center  flex-col gap-5 items-center pt-32 bg-[#040518]">
                    {ShowNav && (

                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="relative img-Cont w-[225px] h-[225px] rounded-full z-10 flex   overflow-hidden justify-center items-center">
                                <img
                                    src="/DPjpg.jpg"
                                    alt="Profile"
                                    className="w-[200px] h-[200px] rounded-full object-cover"
                                />
                                {/* <svg
                            className="absolute top-0 left-0 w-full h-full"
                            viewBox="0 0 200 200"
                            >
                            <circle
                            className="stroke-white stroke-[4px] fill-none animate-none group-hover:animate-draw-circle"
                                cx="100"
                                cy="100"
                                r="98"
                                transform="rotate(-90 100 100)"
                                />
                                
                                </svg> */}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    <AnimatePresence>
                        {ShowNav && (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.5 }}
                                className='flex flex-col gap-3 justify-center items-center' >
                                <h2 className='text-2xl md:text-4xl font-bold select-none name Double-Border relative' >Hafiz Abdullah Anwar</h2>
                                <div className='w-full flex justify-center relative items-center px-1 Double-Border'>
                                    <p className='select-none relative' ><span className='font-semibold sm:font-bold  text-[11px] sm:text-xl  '>Full Stack Developer | Pre-Engineering Student | Hafiz-e-Quran</span></p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="further-Detail  flex flex-col gap-2 justify-center py-1 md:py-10 sm:place-items-start  w-[90%] sm:w-[60%] max-w-2xl ">
                        <div className="typingSpeed flex gap-3 w-full justify-between items-center ">
                            <div className='flex gap-4 place-items-start' >
                                <p className='select-none relative linear-Border ' ><span className='font-bold text-xl '>Top Typing Speed </span> : 78 WPM</p>
                                <button
                                    className='px-3 py-1 border-white  rounded-full bg-[#333cf0]   hover:bg-[#158eb1]   transition duration-150 ease-in-out hover:scale-110 cursor-pointer'
                                    onClick={() => {
                                        setshowProof(!showProof)
                                        setShowNav(false)
                                        window.scrollTo(0, 0)
                                    }}
                                >Proof</button>
                            </div>
                            <AnimatePresence>
                                {showProof && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className='absolute left-0 top-0 select-none flex justify-center items-center z-10 w-[100%] h-screen p-10 '
                                    >
                                        <img
                                            src='/Proof.png'
                                            alt="Proof"
                                            className="w-full h-auto object-cover rounded-2xl"
                                        />
                                        <RxCross2
                                            size={24}
                                            className="text-black absolute top-5 right-5 cursor-pointer border border-white rounded-full bg-white"
                                            onClick={() => {
                                                setShowNav(true)
                                                setshowProof(false)
                                            }
                                            } />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className='select-none relative linear-Border' ><span className='font-bold text-xl '>Country</span> : Pakistan</p>
                        <p className='select-none relative linear-Border' ><span className='font-bold text-xl '>Age</span> : 17
                            Years</p>
                        <p className='select-none relative linear-Border' ><span className='font-bold text-xl '>Languages</span> : JavaScript, HTML, CSS</p>
                        <p className='select-none relative linear-Border' ><span className='font-bold text-xl '>Frameworks</span> : React, Node.js, Tailwind, Express</p>
                        <p className='select-none relative linear-Border' ><span className='font-bold text-xl '>Tools</span> : Git, VS code, MongoDB</p>
                        <p className=' linear-Border relative select-none' ><span className='font-bold text-xl '>Education</span> : FSC Pre-Engineering – Federal Board (2024–2026)

                            <br /></p>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Profile