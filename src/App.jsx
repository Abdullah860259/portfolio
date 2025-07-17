import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Profile from './Components/Profile'
import './index.css'
function App() {
    return (
        <>
            <div className='min-w-full'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
