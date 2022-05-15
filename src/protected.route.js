import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from './helper';


export default function ProtectedRoute({ redirectPath = '/login' }) {
    if (getToken()) {
        return <Outlet />;
    }
    return <Navigate to={redirectPath} replace />;
}

