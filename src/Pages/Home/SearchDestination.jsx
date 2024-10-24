import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDateRange, MdPlace } from 'react-icons/md';
import { BiMoney } from 'react-icons/bi';
import { tripPlanningChatSession } from './TripPlanner'; // Import the trip planning session
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProviders';
import { json, Navigate } from 'react-router-dom';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';
import RouteMap from '../../Map/RouteMap';

const transformTourData = (userData, aiResponse) => {
    // Transform the daily itinerary
    const tourPlan = aiResponse["Tour Plan"].map(day => ({
        day: day.day,
        tasks: day.tasks.map(task => ({
            activity: task.activity,
            estimated_time: task.estimated_time,
            latitude: task.latitude,
            longitude: task.longitude,
            place: task.place,
            status: task.status
        }))
    }));

    // Transform budget estimation
    const estimationBudget = {
        accommodation: aiResponse["Estimation Budget"].accommodation,
        food: aiResponse["Estimation Budget"].food,
        sightseeing: aiResponse["Estimation Budget"].sightseeing,
        transportation: aiResponse["Estimation Budget"].transportation
    };

    // Transform hotel information
    const hotel = {
        name: aiResponse["Hotel Name"].name,
        latitude: aiResponse["Hotel Name"].latitude,
        longitude: aiResponse["Hotel Name"].longitude
    };

    // Transform user input
    const userInput = {
        from: userData.from,
        to: userData.to,
        startDate: userData.startDate,
        endDate: userData.endDate
    };

    // Return the complete transformed data
    return {
        email: userData.email,
        userInput,
        hotel,
        estimationBudget,
        tourPlan
    };
};
export const randomData={"Tour Plan": [
    {
      "day": "Day 1 (October 25, 2024)",
      "tasks": [
        {
          "activity": "Travel to Comilla",
          "place": "Dhaka to Comilla (By Car/Bus)",
          "latitude": "23.4607",
          "longitude": "91.1809",
          "estimated_time": "2-3 hours",
          "status": "pending"
        },
        {
          "activity": "Check in to Hotel",
          "place": "The Palace Luxury Resort",
          "latitude": "23.4738",
          "longitude": "91.1507",
          "estimated_time": "30 minutes",
          "status": "pending"
        },
        {
          "activity": "Explore Comilla City",
          "place": "Comilla City Center",
          "latitude": "23.4614",
          "longitude": "91.1797",
          "estimated_time": "2-3 hours",
          "status": "pending"
        },
        {
          "activity": "Dinner",
          "place": "Local Restaurant",
          "latitude": "23.46",
          "longitude": "91.18",
          "estimated_time": "1 hour",
          "status": "pending"
        }
      ]
    },
    {
      "day": "Day 2 (October 26, 2024)",
      "tasks": [
        {
          "activity": "Visit Mainamati War Cemetery",
          "place": "Mainamati",
          "latitude": "23.4967",
          "longitude": "91.1074",
          "estimated_time": "3-4 hours",
          "status": "pending"
        },
        {
          "activity": "Lunch",
          "place": "Local Restaurant near Mainamati",
          "latitude": "23.49",
          "longitude": "91.11",
          "estimated_time": "1 hour",
          "status": "pending"
        },
        {
          "activity": "Visit Shalban Vihara",
          "place": "Shalban Vihara",
          "latitude": "23.4651",
          "longitude": "91.1223",
          "estimated_time": "2-3 hours",
          "status": "pending"
        },
        {
          "activity": "Dinner",
          "place": "Hotel/Local Restaurant",
          "latitude": "23.47",
          "longitude": "91.15",
          "estimated_time": "1 hour",
          "status": "pending"
        }
      ]
    },
    {
      "day": "Day 3-8 (October 27 - November 1, 2024)",
      "tasks": [
        {
          "activity": "Relax at the resort/Explore Comilla further based on your interests.",
          "place": "Comilla",
          "latitude": "23.4607",
          "longitude": "91.1809",
          "estimated_time": "Flexible",
          "status": "pending"
        }
      ]
    },
    {
      "day": "Day 9 (November 2, 2024)",
      "tasks": [
        {
          "activity": "Return to Dhaka",
          "place": "Comilla to Dhaka (By Car/Bus)",
          "latitude": "23.4607",
          "longitude": "91.1809",
          "estimated_time": "2-3 hours",
          "status": "pending"
        }
      ]
    }
  ],
  "Estimation Budget": {
    "accommodation": "8,000 BDT per night (Luxury Hotel - 72,000 BDT total)",
    "transportation": "5,000 BDT (round trip)",
    "food": "10,000 BDT",
    "sightseeing": "5,000 BDT"
  },
  "Hotel Name": {
    "name": "The Palace Luxury Resort",
    "latitude": "23.4738",
    "longitude": "91.1507"
  }
}

export default function SearchDestination() {
    const [budget, setBudget] = useState('');
    const [aiResponse, setAiResponse] = useState(null);
    const { register, handleSubmit } = useForm();
    const [userInput, setUserInput] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const handleFormOnSubmit = async (data) => {
        setLoading(true)
        setUserInput(data)
        const prompt = `
      I want to generate a trip plan from ${data.from} to ${data.to} for the dates ${data.startDate}, to ${data.endDate}. I am looking for a ${budget} hotel. Please provide a full response in JSON format. The JSON should include the following objects:
      
      1. Tour Plan: A detailed daily to-do list as an array, where each entry contains:
      "day": The day of the trip (e.g., Day 1, Day 2)
      "tasks": An array of tasks for that day, where each task includes:
      "activity": The activity to be performed (e.g., "Travel to Sylhet")
      "place": The place for the activity (e.g., "Dhaka Railway Station")
      "latitude": The latitude of the place
      "longitude": The longitude of the place
      "estimated_time": The estimated duration for the activity (e.g., "6 hours")
      "status": Set to "pending" by default
      
      2. Estimation Budget: A breakdown of the estimated budget for the trip, including accommodation, transportation, food, and sightseeing.
      
      3. Hotel Name: The name and location (with latitude and longitude) of a low-budget hotel where I can stay.
      
      Make sure the response is in JSON format, and the tasks are presented in an array format for each day to facilitate a to-do list generation.
    `;

        try {
            const aiResult = await tripPlanningChatSession.sendMessage(prompt);
            const aiResponseText = aiResult.response.text();
            console.log('AI Response:', aiResponseText);
            setAiResponse(JSON.parse(aiResponseText)); // Parse and set the AI response in state
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire("Error", "Something went wrong", "error")
        }
    };
    const handlePostPlanToMongoDB = async () => {
        if (!user) {
            Swal.fire("Error", "Please Login", "error");
            return <Navigate to={"/login"} />;
        }

        try {
            // Use the transformation function here
            const transformedData = transformTourData({
                ...userInput,
                email: user?.email
            }, aiResponse);

            const result = await axiosPublic.post("/api/v1/tour", transformedData);
            if (result.data) {
                Swal.fire("Success", "Tour plan saved successfully!", "success");
            }
        } catch (error) {
            console.error('Error making the request:', error);
            Swal.fire("Error", error.response ? error.response.data.message : "Network Error", "error");
        }
    };
    console.log(parseFloat(aiResponse["Tour Plan"][0]["tasks"][0]["latitude"]),parseFloat(aiResponse["Hotel Name"]["latitude"]))
    return (
        <div className='container mx-auto flex flex-col justify-center items-center my-8'>
            {/* <h1 className='text-4xl font-semibold'>Create Your Tour Plan</h1> */}
            <form className='flex flex-col space-y-4' onSubmit={handleSubmit(handleFormOnSubmit)}>
                <h1 className='flex flex-row items-center text-3xl font-medium'>
                    Enter Place Name <MdPlace />
                </h1>
                <div className="flex flex-col md:flex-row">
                    <div>
                        <label className='label-text'>Current Location</label>
                        <input
                            type="text"
                            placeholder="Current Location"
                            className="input input-bordered border-1 border-black border-r-0 w-full max-w-xs md:rounded-r-none"
                            name='from'
                            {...register("from", { required: true })}
                        />
                    </div>
                    <div>
                        <label className='label-text'>Destination Location</label>
                        <input
                            type="text"
                            placeholder="Destination Spot"
                            className="input input-bordered border-1 border-black w-full max-w-xs md:rounded-l-none"
                            name='to'
                            {...register("to", { required: true })}
                        />
                    </div>
                </div>
                <h1 className='flex flex-row items-center text-3xl font-medium'>
                    Select Your Budget <BiMoney />
                </h1>
                <div className={`flex flex-col md:flex-row md:gap-8 justify-center items-center gap-4`}>
                    <div
                        className={`items-center cursor-pointer ${budget === "Low Budget" && "border-2 border-red-600 rounded-md"}`}
                        onClick={() => setBudget("Low Budget")}
                    >
                        <img src="https://i.ibb.co.com/hXWQDc1/cut-price-bargain-offering-reduced-cost-discount-low-rate-special-promo-scissors-dividing-banknote-c.jpg" className='h-24 w-24 rounded-md border-2' alt="" />
                        <p className='text-center font-medium'>Low Budget</p>
                    </div>
                    <div
                        className={`items-center cursor-pointer ${budget === "Mid Budget" && "border-2 border-red-600 rounded-md"}`}
                        onClick={() => setBudget("Mid Budget")}
                    >
                        <img src="https://i.ibb.co.com/qrTd0D2/hand-drawn-cost-living-illustration-23-2150892210.jpg" className='h-24 w-24 rounded-md border-2' alt="" />
                        <p className='text-center font-medium'>Mid Budget</p>
                    </div>
                    <div
                        className={`items-center cursor-pointer ${budget === "Luxury Budget" && "border-2 border-red-600 rounded-md"}`}
                        onClick={() => setBudget("Luxury Budget")}
                    >
                        <img src="https://i.ibb.co.com/f99vhJG/photorealistic-money-concept.jpg" className='h-24 w-24 rounded-md border-2' alt="" />
                        <p className='text-center font-medium'>Luxury Budget</p>
                    </div>
                </div>
                <h1 className='flex flex-row items-center text-3xl font-medium'>
                    Pick Date <MdDateRange />
                </h1>
                <div className="flex flex-col md:flex-row">
                    <div>
                        <label className='label-text'>Start Date</label>
                        <input
                            type="date"
                            placeholder="Start Date"
                            className="input input-bordered border-1 border-black border-r-0 w-full max-w-xs md:rounded-r-none"
                            name='startDate'
                            {...register("startDate", { required: true })}
                        />
                    </div>
                    <div>
                        <label className='label-text'>End Date</label>
                        <input
                            type="date"
                            placeholder="End Date"
                            className="input input-bordered border-1 border-black w-full max-w-xs md:rounded-l-none"
                            name='endDate'
                            {...register("endDate", { required: true })}
                        />
                    </div>
                </div>
                <div className="justify-center flex py-3">
                    <button type='submit' disabled={loading} className='btn btn-ghost btn-outline'>{loading === true ? "Wait, Plan is Cooking..." : "Generate Plan"}</button>
                </div>
            </form>

            {/* Displaying the AI response */}
            {aiResponse && (
                <div className='mt-8'>
                    <h2 className='text-2xl font-semibold'>Your Tour Plan</h2>
                    {aiResponse["Tour Plan"].map((dayPlan, index) => (
                        <div key={index} className='mb-4'>
                            <h3 className='text-xl font-medium'>{dayPlan.day}</h3>
                            <ul className='list-disc pl-5'>
                                {dayPlan.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex}>
                                        <strong>Activity:</strong> {task.activity} <br />
                                        <strong>Place:</strong> {task.place} <br />
                                        <strong>Estimated Time:</strong> {task.estimated_time} <br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Displaying the Estimation Budget in a structured way */}
                    <div>
                        <h3 className='text-xl font-medium'>Estimation Budget</h3>
                        <ul className='list-disc pl-5'>
                            <li><strong>Accommodation:</strong> {aiResponse["Estimation Budget"].accommodation}</li>
                            <li><strong>Transportation:</strong> {aiResponse["Estimation Budget"].transportation}</li>
                            <li><strong>Food:</strong> {aiResponse["Estimation Budget"].food}</li>
                            <li><strong>Sightseeing:</strong> {aiResponse["Estimation Budget"].sightseeing}</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-medium'>Locate your route</h1>
                        
                    </div>
                    <div>
                        <h3 className='text-xl font-medium'>Hotel Name</h3>
                        <p>
                            <strong>Name:</strong> {aiResponse["Hotel Name"].name} <br />
                        </p>
                    </div>
                </div>
            )}

            <button className={`${aiResponse === null ? "hidden" : "btn btn-outline my-4"}`} onClick={() => handlePostPlanToMongoDB()}>Start Tour</button>
        </div>
    );
}

