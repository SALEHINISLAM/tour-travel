import React from 'react'
import Banner from './Banner'
import SearchDestination from './SearchDestination'
import RouteMap from '../../Map/RouteMap'

export default function Home() {
    return (
        <div>
            <Banner />
            {/* <SearchDestination /> */}
            <div className="">
                <RouteMap
                    startCoords={{ lat: 23.7270, lng: 90.3929 }}  // Dhaka
                    endCoords={{ lat: 21.4285, lng: 91.9702 }}    // Sylhet
                />
            </div>
        </div>
    )
}
