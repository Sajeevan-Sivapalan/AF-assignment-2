import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';


const LoginLayout = () => {
    return (
        <>
            <div className='overflow-y-scroll'>
                <Outlet />
                <Routes>
                    <Route>
                        <Route path="" element={<LoginPage />}/>
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default LoginLayout;
