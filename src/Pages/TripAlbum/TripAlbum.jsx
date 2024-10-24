import React from 'react'
import Heading from '../../Components/Heading'
import ManageCard from '../../Components/ManageCard'
import { useForm } from 'react-hook-form';

export default function TripAlbum() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const handleOnSubmit = async (data) => {
        console.log(data);
    
    }
    const tripAlbumOption = [
        {
            "title": "Current Trip Photo",
            "img": "https://i.ibb.co.com/7NKQXBm/travel-background-design-1262-2518.jpg",
            "subTitle": "Click Photo and Upload Here.",
            "link": "/currentTripPhoto"
        },
        {
            "title": "Past Trip Album",
            "img": "https://i.ibb.co.com/zsfrWd0/editable-travel-banner-template-bloggers-53876-117857.jpg",
            "subTitle": "Find Memories of Your Past Tour!",
            "link": "/pastTripPhoto"
        }
    ]

    return (
        <div className='container mx-auto pb-10'>
            <Heading title={"Trip Album"} subTitle={"Upload and See Your Trip Photo"} />

            <form className="flex flex-row justify-center items-center mb-4" onSubmit={handleSubmit(handleOnSubmit)}>
            <input type="text" placeholder="Search Your Memories" className="input input-bordered w-full max-w-xs rounded-r-none" 
            {...register("imgTag")}
            required
            />
            <button type='submit' className='btn btn-outline rounded-l-none'>Search</button>
            </form>

            <div className="flex flex-col gap-5 md:flex-row justify-center">
                {
                    tripAlbumOption.map((item, index) => <ManageCard key={index} img={item.img} title={item.title} subTitle={item.subTitle} link={item.link} />)
                }
            </div>
        </div>
    )
}
