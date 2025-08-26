import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../api/user"

export const useUserProfile = () => {
    return useQuery({
        queryKey: ["profile"], 
        queryFn: getProfile,
        staleTime: 5 * 60 * 1000,
        retry: 2
    });
}