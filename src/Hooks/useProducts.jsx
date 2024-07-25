import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useProducts(){
    function getRecent(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
      let responseObject = useQuery({
        queryKey:["recentProducts"],
        queryFn:getRecent,
        // refetchInterval:3000,
        // refetchIntervalInBackground:true
        staleTime:8000,
        // retry:6,
        // retryDelay:5000
        // refetchOnWindowFocus:true,
        // gcTime:4000
      })
    return responseObject
}