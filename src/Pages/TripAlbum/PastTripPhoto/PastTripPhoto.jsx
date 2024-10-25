import React, { useState, useEffect } from 'react';
import Heading from '../../../Components/Heading';
import useAxiosPublic from '../../../CustomHooks/useAxiosPublic'; // Axios instance for making requests
import toast from 'react-hot-toast';

export default function PastTripPhoto() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]); // Store all tours
  const axiosPublic = useAxiosPublic(); // Axios instance

  // Fetch all tours when the component mounts
  useEffect(() => {
    const fetchAllTours = async () => {
      setLoading(true);
      try {
        const response = await axiosPublic.get('/api/v1/tour'); // Fetch all tours
        setTours(response.data.data); // Assuming the API response structure has a `data` property containing tours
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast.error('Failed to load tours');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTours();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Heading title={"Trip Album"} subTitle={"See Your Past Trip Photos"} />

      <div className="space-y-8">
        {tours.length > 0 ? (
          tours.map((tour, index) => (
            <div key={tour._id} className="tour-album">
              {/* Tour Heading */}
              <h2 className="text-2xl font-semibold mb-4">
                {tour.name || `Tour-${index + 1}`}
              </h2>

              {/* Display images from this tour */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tour.album.length > 0 ? (
                  tour.album.map((image, imgIndex) => (
                    <div key={imgIndex} className="tour-image">
                      <img
                        src={image.url} // Assuming each image has a URL
                        alt={`Tour ${tour.name || index + 1} - Photo ${imgIndex + 1}`}
                        className="w-full h-48 object-cover rounded-md shadow-md"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No photos available for this tour.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tours found.</p>
        )}
      </div>
    </div>
  );
}
