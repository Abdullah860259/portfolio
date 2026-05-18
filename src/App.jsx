import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Profile from './Components/Profile'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NetExperience from './Components/NetExperience';
import { Analytics } from '@vercel/analytics/react';

function App() {
    return (
        <>
            <div className='min-w-full'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/net-experience" element={<NetExperience />} />
                </Routes>
            </div>
            <Analytics />
        </>
    );
}

export default App;
