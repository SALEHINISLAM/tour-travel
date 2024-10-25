import React, { useState, useEffect, useContext } from 'react';
import Heading from '../../../Components/Heading';
import useAxiosPublic from '../../../CustomHooks/useAxiosPublic'; // Custom hook for axios instance
import { AuthContext } from '../../../Providers/AuthProviders'; // For getting the user's email
import toast from 'react-hot-toast';

export default function CurrentTripPhoto() {
    const { user } = useContext(AuthContext); // Get the current logged-in user's info
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [latestTourId, setLatestTourId] = useState(null); // Store the latest tour's ID
    const axiosPublic = useAxiosPublic(); // Axios instance

    // Fetch the latest tour for the user on component mount
    useEffect(() => {
        const fetchLatestTour = async () => {
            try {
                if (user?.email) {
                    const response = await axiosPublic.get(`/api/v1/latest/${user.email}`);
                    setLatestTourId(response.data.data._id); // Set the latest tour ID
                }
            } catch (error) {
                console.error('Error fetching latest tour:', error);
                toast.error('Failed to fetch latest tour');
            }
        };

        fetchLatestTour();
    }, [user, axiosPublic]);

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        if (!image || !latestTourId) {
            toast.error("Please select an image and ensure you're on a valid tour.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image); // Append the image file to the form data

        try {
            const response = await axiosPublic.post(`/api/v1/tour/uploadimage/${latestTourId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Handle success response
            toast.success('Image uploaded successfully!');
            console.log(response.data); // Optional: Do something with the response
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <Heading 
                title={"Upload Your Favorite Photo"} 
                subTitle={"A photo is a great memory for a tour. So click and upload the photo."} 
            />
            <form 
                className='flex flex-col justify-center items-center space-y-4 pb-8'
                onSubmit={handleUploadImage} // Add form submission handler
            >
                <div className="form-control">
                    <label className='label-text'>Upload Image</label>
                    <input 
                        type="file" 
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={handleFileChange}
                        required 
                    />
                </div>
                <button 
                    type='submit' 
                    className={`${loading ? "disabled" : ""} btn`}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
}
