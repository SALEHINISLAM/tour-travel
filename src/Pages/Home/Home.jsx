import React from 'react'
import Banner from './Banner'
// import SearchDestination from './SearchDestination'
// import RouteMap from '../../Map/RouteMap'

export default function Home() {
    return (
        <div>
            <Banner />
            <div className="hero bg-base-200 min-h-screen" style={{backgroundImage:"url(https://i.ibb.co.com/4t3BH5Y/realistic-travel-background-with-elements-52683-77784.jpg)"}}>
            <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src="https://i.ibb.co.com/WtGBLzP/worried-man-pulling-his-hair-1187-3031.jpg"
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold text-white">Can't make plan for your next trip?</h1>
                        <p className="py-6 text-gray-300">
                            Our Expert AI are waiting to solve Your Problem
                        </p>
                        <button className="btn btn-primary">Plan For Your Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}