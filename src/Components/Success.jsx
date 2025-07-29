import React, { useEffect, useRef, useState } from 'react'
import "./success.css"
const baseURL = import.meta.env.VITE_API_URL;
const Error = (props) => {
    const errorbox = useRef();
    const [exiting, setExiting] = useState(false);
    const [animate, setanimate] = useState(false);

    useEffect(() => {
        if (errorbox.current) {
            const timer1 = setTimeout(() => {
                errorbox.current.classList.remove("moveright");
            }, 10);
            const timer2 = setTimeout(() => {
                setanimate(true);
            }, 300);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2)
            }
        }
    }, [])



    useEffect(() => {
        if (animate) {
            errorbox.current.classList.add("animate");
            const timer3 = setTimeout(() => {
                setExiting(true);
            }, 3000);
            return () => clearTimeout(timer3);
        }
    }, [animate])

    useEffect(() => {
        if (exiting) {
            errorbox.current.classList.add("moveright");
            const timer4 = setTimeout(() => {
                errorbox.current.classList.remove("animate");
                props.onClose();
            }, 300);
            return () => clearTimeout(timer4);
        }
    }, [exiting])


    return (
        <>
            <div ref={errorbox} className="error moveright flex gap-5">
                {/* <div className='h-50px'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 412L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" /></svg>
                </div> */}
                <p >{props.decs}</p>
                <div className='cursor-pointer pointer-events-auto hover:opacity-80 duration-150 active:scale-90 transition ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setExiting(true)} className='cursor-pointer pointer-events-auto hover:opacity-80 duration-150 active:scale-90 transition ease-in-out' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                {/* <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9DC384"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg> */}
            </div>
        </>
    )
}

export default Error