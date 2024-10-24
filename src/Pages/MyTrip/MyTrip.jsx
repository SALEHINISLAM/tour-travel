import React from 'react'
import useFetchUserInfo from '../../CustomHooks/useFetchUserInfo'
import Heading from '../../Components/Heading'

export default function MyTrip() {
    const [user,loggedInUser, refetch, isLoading]=useFetchUserInfo()
  return (
    <div>
      <Heading title={"My Current Trip"} subTitle={"Track your trip from here"}/>
    </div>
  )
}
