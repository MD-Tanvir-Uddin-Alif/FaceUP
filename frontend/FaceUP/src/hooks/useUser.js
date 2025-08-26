import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../api/user"

export const useUserrProfile = ()=>{
    return useQuery(["profile"], getProfile);
}