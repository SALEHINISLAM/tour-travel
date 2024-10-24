import  { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosPublic from "./useAxiosPublic";

const useFetchUserInfo = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: loggedInUser, isLoading, refetch } = useQuery({
    queryKey: [user?.email, "websiteUser"],
    queryFn: async () => {
      if(!user?.email){
        return null
      }
      const result = await axiosPublic.get(`/api/v1/latest/${user?.email}`);
      // const response = await axiosPublic.get(`/api/v1/tour/latest/${loggedInUser.email}`);

      return result.data;
    },
  });
  return [user,loggedInUser, refetch, isLoading];
};

export default useFetchUserInfo;