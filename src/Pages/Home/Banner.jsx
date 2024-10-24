import React from 'react'
import Slider from './Slider/Slider'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <div
            className="hero min-h-screen bg-fixed"
            style={{
                backgroundImage: "url(https://i.ibb.co.com/G0KtQTb/Boats-harbour-Marcel-Cove-Lesser-Antilles-Saint-Martin.webp)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content  text-neutral-content text-center flex-col lg:flex-row-reverse">
                <div className="lg:w-3/5">
                    <Slider />
                </div>
                <div>
                    <h1 className="text-5xl font-bold">Start Your Tour Now!</h1>
                    <p className="py-6">
                        Travel is the best option to refresh your mind. Why not schedule your tour now?
                    </p>
                    <Link to={"/login"} className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    )
}
