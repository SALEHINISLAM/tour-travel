import React from 'react'
import Heading from "../../Components/Heading"
import SearchDestination from '../Home/SearchDestination'
export default function PlanTrip() {
  return (
    <div>
        <Heading title={"Plan Your Next Trip Now"} subTitle={"Our AI are ready for cooking your next trip plan. So why are you waiting?"}/>
        <SearchDestination/>
    </div>
  )
}
