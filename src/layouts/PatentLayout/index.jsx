import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import PatentHomePage from './PatentHomePage';


const PatentLayout = () => {
    return (
        <>
            <div className='overflow-y-scroll'>
                <Outlet />
                <Routes>
                    <Route>
                        <Route path="patent" element={<PatentHomePage />}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default PatentLayout;
