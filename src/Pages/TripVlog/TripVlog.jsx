import React, { useContext, useEffect, useState } from "react";
import ManageCard from "../../Components/ManageCard";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import Heading from "../../Components/Heading";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";

export default function TripVlog() {
  const [latestTour, setLatestTour] = useState(null);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate(); // To programmatically navigate
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLatestTour = async () => {
      try {
        if (user?.email) {
          const response = await axiosPublic.get(
            `/api/v1/latest/${user.email}`
          );
          setLatestTour(response.data.data._id); // Set the latest tour ID
          console.log(latestTour);
        }
      } catch (error) {
        console.error("Error fetching latest tour:", error);
        toast.error("Failed to fetch latest tour");
      }
    };

    fetchLatestTour();
  }, [user, axiosPublic]);

  const handleCreateVlog = async () => {
    const response = await axiosPublic.post(`api/v1/tour/video/${latestTour}`);
    console.log(response.data);
    if (response.status === 200) {
      navigate("/pastTourVlog");
    }
  };

  const vlogOptions = [
    {
      title: "Create Vlogs",
      img: "https://i.ibb.co/7NKQXBm/travel-background-design-1262-2518.jpg",
      subTitle: "Watch vlogs from your current trip.",
      link: "/currentTripVlogs", // Original link if you want to keep it for other purposes// Add the action for the button
    },
    {
      title: "Past Trip Vlogs",
      img: "https://i.ibb.co/zsfrWd0/editable-travel-banner-template-bloggers-53876-117857.jpg",
      subTitle: "Watch vlogs from your past trips.",
      link: "/pastTourVlog",
    },
  ];

  return (
    <div className="container mx-auto pb-10">
      <Heading title={"Trip Vlog"} subTitle={"See All Your Trip Vlog Here"} />
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error messages */}
      <div className="flex flex-col gap-5 md:flex-row justify-center">
        <div className="card bg-base-100 image-full shadow-xl max-w-md">
          <figure>
            <img src={vlogOptions[0].img} alt={vlogOptions[0].title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{vlogOptions[0].title}</h2>
            <p>{vlogOptions[0].subTitle}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleCreateVlog()}
                className="btn btn-primary"
              >
                See Details
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 image-full shadow-xl max-w-md">
          <figure>
            <img src={vlogOptions[1].img} alt={vlogOptions[1].title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{vlogOptions[1].title}</h2>
            <p>{vlogOptions[1].subTitle}</p>
            <div className="card-actions justify-end">
              <Link
                to={vlogOptions[1].link}
                className="btn btn-primary"
              >
                See Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
