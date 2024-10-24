import React from 'react'
import Heading from '../../Components/Heading'
import { TfiEmail } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <div className='container mx-auto'>
            <div className="flex flex-col lg:flex-row-reverse items-center">
                <img src="https://i.ibb.co.com/fC01NcN/email-marketing-internet-chatting-24-hours-support-335657-3009.jpg" alt="" />
                <div className="">
                    <Heading title={"Get in Touch"} subTitle={"We will be happy to hear from you . Don\'t hesitate to contact us."}/>
                    <div className="flex flex-row gap-1 items-center">
                        <TfiEmail/>Email: <Link className='btn btn-link' to={"mailto:msionlinekingdom@gmail.com"}>msionlinekingdom@gmail.com</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
