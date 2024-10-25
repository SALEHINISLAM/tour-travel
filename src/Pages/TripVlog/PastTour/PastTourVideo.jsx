import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../CustomHooks/useAxiosPublic';
import Heading from '../../../Components/Heading';

export default function PastTourVideo() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axiosPublic.get('/api/v1/tour'); // Adjust the endpoint as needed
                if (response.data.success) {
                    setTours(response.data.data);
                } else {
                    setError('No tours found');
                }
            } catch (err) {
                console.error('Error fetching tours:', err);
                setError('An error occurred while fetching tours.');
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [axiosPublic]);

    return (
        <div className='container mx-auto pb-10'>
            <Heading title={"Past Tour Videos"} subTitle={"Watch Your Past Tour Videos Here"} />

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {/* Conditionally render the tour and video results */}
            {tours && tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
                    {tours?.map((tour) => (
                        <div key={tour._id} className="card">
                            <h2 className="text-xl font-semibold">{tour.name}</h2>
                            {tour.tourVideo ? (  // Check if tourVideo exists
                                <div>
                                    <video controls className="w-full h-64 object-cover">
                                        <source src={tour.tourVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="p-2">
                                        <h3 className="text-lg">Video Description: {tour.album[0]?.description || 'No description available'}</h3>
                                    </div>
                                </div>
                            ) : (
                                <div>No video available for this tour.</div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div>No tours available.</div>
            )}
        </div>
    );
}
