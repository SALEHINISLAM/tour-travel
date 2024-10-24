import React from 'react'
import { Link } from 'react-router-dom'

export default function ManageCard({title,img,subTitle, link}) {
    return (
        <div className="card bg-base-100 image-full shadow-xl max-w-md">
            <figure>
                <img
                    src={img}
                    alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{subTitle}</p>
                <div className="card-actions justify-end">
                    <Link to={link} className="btn btn-primary">See Details</Link>
                </div>
            </div>
        </div>
    )
}
