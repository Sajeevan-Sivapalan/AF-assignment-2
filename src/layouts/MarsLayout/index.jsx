import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import MarsHomePage from './MarsHomePage';


const MarsLayout = () => {
    return (
        <>
            <div className='overflow-y-scroll'>
                <Outlet />
                <Routes>
                    <Route>
                        <Route path="mars" element={<MarsHomePage />}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default MarsLayout;
