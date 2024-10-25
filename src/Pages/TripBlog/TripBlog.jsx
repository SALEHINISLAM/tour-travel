import React from 'react';
import Heading from '../../Components/Heading';
import ManageCard from '../../Components/ManageCard';

export default function TripBlog() {
    const videoOptions = [
        {
            "title": "Create Blog",
            "img": "https://i.ibb.co.com/2PwyCFp/travel-concept-background-with-brochure-23-2147739087.jpg",
            "subTitle": "Watch videos from your current tour.",
            "link": "/currentTourVideos"
        },
        {
            "title": "Past Tour Blogs",
            "img": "https://i.ibb.co.com/nbr8V77/tablet-which-you-can-read-blog-1134-226.jpg",
            "subTitle": "Watch videos from your past tours.",
            "link": "/pastTourVideos"
        }
    ];

    return (
        <div className='container mx-auto pb-10'>
            <Heading title={"Tour Blog"} subTitle={"Choose to watch videos from your current or past tours"} />
            
            <div className="flex flex-col gap-5 md:flex-row justify-center">
                {videoOptions.map((option, index) => (
                    <ManageCard 
                        key={index} 
                        img={option.img} 
                        title={option.title} 
                        subTitle={option.subTitle} 
                        link={option.link} 
                    />
                ))}
            </div>
        </div>
    );
}
