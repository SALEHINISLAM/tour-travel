import React, { useState } from 'react'
import { useForm } from "react-hook-form";

export default function SearchDestination() {
    const [place,setPlace]=useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleFormOnSubmit = async (data) => {
        console.log(data)
        setPlace(data.destination)
    }
    const handleBudgetSize=async(data)=>{
        console.log(data)
    }
    return (
        <div className='container mx-auto flex flex-col justify-center items-center my-8'>
            <h1 className='text-4xl font-semibold'>Search Your Destination Here</h1>
            <form className="flex flex-col md:flex-row" onSubmit={handleSubmit(handleFormOnSubmit)}>
                <input
                    type="text"
                    placeholder="Search Your Destination"
                    className="input input-bordered w-full max-w-xs md:rounded-r-none"
                    name='destination'
                    {...register("destination")}
                    required
                />

                <button type='submit' className='btn btn-ghost btn-outline md:rounded-l-none'>Search</button>
            </form>
            <div className="">
            <h1 className='text-3xl font-semibold'>You want</h1>
            </div>
        </div>
    )
}
