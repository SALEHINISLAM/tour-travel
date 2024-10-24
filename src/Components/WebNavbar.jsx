import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Providers/AuthProviders'

export const navOptions = <>
    <li><Link to={"/"}>Home</Link></li>
    <li><Link to={"/contact"}>Contact</Link></li>
    <li><Link to={"/planTrip"}>Plan Trip</Link></li>
</>
export default function WebNavbar() {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogOut = async () => {
        await logOut()
        return navigate("/")
    }
    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl font-kablammo">TourTravel</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>Hi {user?.displayName}</a></li>
                                <li><a href='/planTrip'>Plan Trip</a></li>
                                <li><a href='/myTrip'>My Trip</a></li>
                                <li><a href='/tripAlbum'>Tour Album</a></li>
                                <li><a href='/tripBlog'>Tour Blog</a></li>
                                <li><a href='/tripVlog'>Tour Vlog <span className='badge'>new</span></a></li>
                                <li><a className='text-error' onClick={() => handleLogOut()}>Logout</a></li>
                            </ul>
                        </div>
                    </> :
                        <a className="btn" href='/login'>Login</a>}
                </div>
            </div>
        </div>
    )
}
