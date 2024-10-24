import React, { useState, useEffect, useContext } from 'react';
import useFetchUserInfo from '../../CustomHooks/useFetchUserInfo';
import Heading from '../../Components/Heading';
import { Check, Clock, MapPin } from 'lucide-react';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Providers/AuthProviders';

export default function MyTrip() {
  const {user} = useContext(AuthContext);
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingTask, setUpdatingTask] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
      const fetchTourData = async () => {
          try {
              if (user?.email) {
                  const response = await axiosPublic.get(`/api/v1/latest/${user.email}`);
                  setTourData(response.data.data);
              }
          } catch (error) {
              console.error('Error fetching tour data:', error);
              toast.error('Failed to load trip data');
          } finally {
              setLoading(false);
          }
      };

      fetchTourData();
  }, [user]);

  const handleTaskComplete = async (dayIndex, taskIndex) => {
    if (updatingTask) return; // Prevent multiple simultaneous updates
    setUpdatingTask(true);

    const loadingToast = toast.loading('Updating task status...');
    try {
        const updatedTourData = { ...tourData };
        const newStatus = updatedTourData.tourPlan[dayIndex].tasks[taskIndex].status === 'completed' 
            ? 'pending' 
            : 'completed';
        
        updatedTourData.tourPlan[dayIndex].tasks[taskIndex].status = newStatus;
        
        // Update the database
        await axiosPublic.patch(`/api/v1/tour/${tourData._id}/task-status`, {
            dayIndex,
            taskIndex,
            newStatus
        });
        
        setTourData(updatedTourData);
        
        // Show success notification
        toast.dismiss(loadingToast);
        toast.success(`Task ${newStatus === 'completed' ? 'completed' : 'uncompleted'}!`);
    } catch (error) {
        console.error('Error updating task status:', error);
        
        // Revert the optimistic update
        const revertedTourData = { ...tourData };
        setTourData(revertedTourData);
        
        // Show error notification
        toast.dismiss(loadingToast);
        toast.error('Failed to update task status');
    } finally {
        setUpdatingTask(false);
    }
};
    if (loading || !tourData) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <span className="loading loading-spinner loading-lg"></span>
          </div>
      );
  }

    return (
        <div className="container mx-auto px-4 py-8">
            <Heading title="My Current Trip" subTitle="Track your trip from here" />
            
            {/* Trip Overview */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Trip Details</h3>
                        <p className="text-gray-600">
                            <span className="font-medium">From:</span> {tourData.userInput.from}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">To:</span> {tourData.userInput.to}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Dates:</span> {tourData.userInput.startDate} - {tourData.userInput.endDate}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Hotel Information</h3>
                        <p className="text-gray-600">
                            <span className="font-medium">Name:</span> {tourData.hotel.name}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Location:</span> {tourData.hotel.latitude}, {tourData.hotel.longitude}
                        </p>
                    </div>
                </div>
            </div>

            {/* Daily Plans */}
            <div className="space-y-6">
                {tourData.tourPlan.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="bg-blue-600 text-white p-4">
                            <h3 className="text-xl font-semibold">{day.day}</h3>
                        </div>
                        <div className="p-4">
                            {day.tasks.map((task, taskIndex) => (
                                <div 
                                    key={taskIndex} 
                                    className={`flex items-start space-x-4 p-4 border-b last:border-b-0 transition-colors
                                        ${task.status === 'completed' ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                                >
                                    <button
                                        onClick={() => handleTaskComplete(dayIndex, taskIndex)}
                                        disabled={updatingTask}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2
                                            ${task.status === 'completed' 
                                                ? 'bg-green-500 border-green-500 text-white' 
                                                : 'border-gray-300'}
                                            ${updatingTask ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-500'}`}
                                    >
                                        {task.status === 'completed' && <Check size={16} />}
                                    </button>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">{task.activity}</h4>
                                        <div className="space-y-2 text-gray-600">
                                            <p className="flex items-center">
                                                <MapPin size={16} className="mr-2" />
                                                {task.place}
                                            </p>
                                            <p className="flex items-center">
                                                <Clock size={16} className="mr-2" />
                                                {task.estimated_time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Budget Information */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(tourData.estimationBudget).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 capitalize">{key}</p>
                            <p className="text-lg font-semibold">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}