import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import APODHomePage from './APODHomePage';


const APODLayout = () => {
    return (
        <>
            <div className='overflow-y-scroll'>
                <Outlet />
                <Routes>
                    <Route>
                        <Route path="apod" element={<APODHomePage />}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default APODLayout;
