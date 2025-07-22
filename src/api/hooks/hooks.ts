import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCallGet, apiCallPost } from "../api";
import { API_ENDPOINTS } from "../../constants";

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => apiCallGet(API_ENDPOINTS.DASHBOARD),
    })
};
export const useLogin = () => {
    return useMutation({
        mutationFn: (data: any) => apiCallPost(API_ENDPOINTS.LOGIN, data),
    })
}