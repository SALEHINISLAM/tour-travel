import React, { useState } from 'react';
import Heading from '../../Components/Heading';
import ManageCard from '../../Components/ManageCard';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';

export default function TripAlbum() {
    const { register, handleSubmit } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();

    const handleOnSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            const response = await axiosPublic.post(`/api/v1/searchImage`, {
                query: data.imgTag,  // Correctly send the query in the request body
            });

            if (response.data.success) {
                setSearchResults(response.data.data);
            } else {
                setError('No images found');
                setSearchResults([]);
            }
        } catch (err) {
            console.error('Error fetching images:', err);
            setError('An error occurred while searching for images.');
        } finally {
            setLoading(false);
        }
    };

    const tripAlbumOption = [
        {
            "title": "Current Trip Photo",
            "img": "https://i.ibb.co/7NKQXBm/travel-background-design-1262-2518.jpg",
            "subTitle": "Click Photo and Upload Here.",
            "link": "/currentTripPhoto"
        },
        {
            "title": "Past Trip Album",
            "img": "https://i.ibb.co/zsfrWd0/editable-travel-banner-template-bloggers-53876-117857.jpg",
            "subTitle": "Find Memories of Your Past Tour!",
            "link": "/pastTripPhoto"
        }
    ];

    return (
        <div className='container mx-auto pb-10'>
            <Heading title={"Trip Album"} subTitle={"Upload and See Your Trip Photo"} />

            <form className="flex flex-row justify-center items-center mb-4" onSubmit={handleSubmit(handleOnSubmit)}>
                <input
                    type="text"
                    placeholder="Search Your Memories"
                    className="input input-bordered w-full max-w-xs rounded-r-none"
                    {...register("imgTag")}
                    required
                />
                <button type='submit' className='btn btn-outline rounded-l-none'>Search</button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {/* Conditionally render the search results */}
            {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
                    {searchResults.map((result, index) => (
                        <div key={index} className="card">
                            <img src={result.imageUrl} alt={result.description} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{result.description}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-5 md:flex-row justify-center">
                    {tripAlbumOption.map((item, index) => (
                        <ManageCard key={index} img={item.img} title={item.title} subTitle={item.subTitle} link={item.link} />
                    ))}
                </div>
            )}
        </div>
    );
}
