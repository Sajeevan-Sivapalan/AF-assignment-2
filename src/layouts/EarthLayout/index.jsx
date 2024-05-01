import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import EarthHomePage from './EarthHomePage';


const EarthLayout = () => {
    return (
        <>
            <div className='overflow-y-scroll'>
                <Outlet />
                <Routes>
                    <Route>
                        <Route path="earth" element={<EarthHomePage />}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default EarthLayout;
