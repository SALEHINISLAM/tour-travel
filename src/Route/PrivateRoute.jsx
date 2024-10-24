import React, { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProviders'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext)
    console.log("from private route ", user)
    if (loading) {
        return <>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </>
    }
    if (!user) {
        return <Navigate to={"/login"}/>
    }
    return children 
}
