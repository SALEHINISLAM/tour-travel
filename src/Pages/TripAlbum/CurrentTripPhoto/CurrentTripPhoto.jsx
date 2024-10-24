import React, { useState } from 'react'
import Heading from '../../../Components/Heading'

export default function CurrentTripPhoto() {
    const [loading, setLoading] = useState(false)
    const [image, setImage]=useState(null)
    const handleUploadImage=async ()=>{
        
    }
    return (
        <div>
            <Heading title={"Upload Your Favorite Photo"} subTitle={"A photo is great memory for a tour. So click and upload the photo."} />
            <form className='flex flex-col justify-center items-center space-y-4 pb-8'>
                <div className="form-control">
                <label className='label-text'>Upload Image</label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" /></div>
                <button type='submit' className={`${loading && "disabled"} btn`}>{loading ? "Uploading..." : "Upload"}</button>
            </form>
        </div>
    )
}
