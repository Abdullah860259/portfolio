import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import "./profile.css"
import { AnimatePresence, useScroll } from 'framer-motion'
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";     // Radix Icons


const Profile = () => {
    const [showProof, setshowProof] = useState(false);
    const [ShowNav, setShowNav] = useState(
        window.innerWidth > 658 // true or false initially
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
            setShowNav(window.innerWidth > 658);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <>
            <div className="profile w-full min-h-[100dvh]  bg-[#040518] overflow-auto text-white">
                <AnimatePresence>
                    <motion.div
                        className='w-full flex justify-center'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Nav home={false} ShowNav={ShowNav} />
                    </motion.div>
                </AnimatePresence>

                <div
                    className="flex justify-center  flex-col gap-5 items-center pt-24 bg-[#040518]">
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="relative img-Cont w-[170px] h-[170px] sm:w-[225px] sm:h-[225px] rounded-full z-10 flex   overflow-hidden justify-center items-center">
                            <img
                                src="/My db.webp"
                                alt="Profile"
                                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5 }}
                            className='flex flex-col sm:gap-3 justify-center items-center' >
                            <h2 className=' text-xl sm:text-2xl md:text-4xl font-bold select-none name sm:Double-Border relative' >Hafiz Abdullah Anwar</h2>
                            <div className='w-full flex justify-center relative items-center px-1 sm:Double-Border'>
                                <p className='select-none relative' ><span className='font-semibold sm:font-bold  text-[11px] sm:text-xl  '>MERN Stack Developer | Pre-Engineering Student | Hafiz-e-Quran</span></p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <div className="further-Detail  flex flex-col gap-2 justify-center pb-8 sm:py-1 md:py-10 sm:place-items-start  w-[90%] sm:w-[60%] max-w-2xl ">
                        <div className="typingSpeed flex gap-3 w-full justify-between items-center ">
                            <div className='flex gap-4 place-items-start' >
                                <p className='select-none relative sm:linear-Border ' ><span className='font-bold text-[#158eb1] sm:text-xl '>Top Typing Speed </span> : 74 WPM</p>
                                <button
                                    className='px-3 py-1 border-white  rounded-full bg-[#333cf0]   hover:bg-[#158eb1]   transition duration-150 ease-in-out hover:scale-110 cursor-pointer'
                                    onClick={() => {
                                        setshowProof(true)
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
                                        transition={{ duration: 0.1 }}
                                        className='absolute left-0 top-0 select-none flex justify-center items-center z-10 w-[100%] h-screen p-10 '
                                    >
                                        <div className='w-full h-full absolute flex justify-center items-center bg-black ' >
                                            <img
                                                src='/Proof.png'
                                                alt="Proof"
                                                className="w-full h-auto object-cover rounded-2xl"
                                            />
                                            <RxCross2
                                                size={24}
                                                className="text-black absolute top-2 right-2 cursor-pointer border border-white rounded-full bg-white"
                                                onClick={() => {
                                                    setShowNav(true)
                                                    setshowProof(false)
                                                }
                                                } />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className='select-none  relative sm:linear-Border' ><span className='font-bold sm:text-xl text-[#158eb1] '>Country</span> : Pakistan</p>
                        <p className='select-none relative sm:linear-Border' ><span className='font-bold sm:text-xl text-[#158eb1] '>Date Of Birth</span> : 8th Auguest 2008</p>
                        <p className='select-none  relative sm:linear-Border' ><span className='font-bold sm:text-xl text-[#158eb1] '>Languages</span> : JavaScript, HTML, CSS</p>
                        <p className='select-none  relative sm:linear-Border' ><span className='font-bold sm:text-xl text-[#158eb1] '>Frameworks</span> : Next.js, React.js, Node.js, Tailwind, Express</p>
                        <p className='select-none  relative sm:linear-Border' ><span className='font-bold sm:text-xl text-[#158eb1] '>Tools</span> : Git, VS code, MongoDB</p>
                        <p className=' sm:linear-Border  relative select-none' ><span className='font-bold   sm:text-xl text-[#158eb1] '>Education</span> : FS.c Pre-Engineering – Federal Board (2024–2026)

                            <br /></p>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Profile