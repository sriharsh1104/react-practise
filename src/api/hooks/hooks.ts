import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCallGet, apiCallPost, apiCallPut } from "../api";
import { API_ENDPOINTS } from "../../constants";
import { Toast } from "../../components/Comman/Toaster/CommanToast";

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const result = await apiCallGet(API_ENDPOINTS.DASHBOARD);
            if (result.success) {
                Toast.success('Dashboard data loaded successfully!');
            } else if (result.error) {
                Toast.error('Failed to load dashboard data');
            }
            return result;
        },
    })
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const result = await apiCallPost(API_ENDPOINTS.LOGIN, data);
            if (result.success) {
                Toast.success('Login successful!');
            } else if (result.error) {
                Toast.error('Login failed. Please try again.');
            }
            return result;
        },
        onSuccess: (data) => {
            if (data.success) {
                console.log('Login success');
            }
        },
        onError: (error) => {
            console.log('Login error:', error);
            Toast.error('An unexpected error occurred');
        }
    })
}

export const useSignup = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const result = await apiCallPost(API_ENDPOINTS.SIGNUP, data);
            if (result.success) {
                Toast.success('Account created successfully!');
            } else if (result.error) {
                Toast.error('Failed to create account. Please try again.');
            }
            return result;
        },
        onSuccess: (data) => {
            if (data.success) {
                console.log('Signup success');
            }
        },
        onError: (error) => {
            console.log('Signup error:', error);
            Toast.error('An unexpected error occurred during signup');
        }
    })
}

export const useProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const result = await apiCallGet(API_ENDPOINTS.PROFILE);
            if (result.success) {
                Toast.success('Profile data loaded successfully!');
            } else if (result.error) {
                Toast.error('Failed to load profile data');
            }
            return result;
        },
    })
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const result = await apiCallPut(API_ENDPOINTS.PROFILE, data);
            if (result.success) {
                Toast.success('Profile updated successfully!');
            } else if (result.error) {
                Toast.error('Failed to update profile. Please try again.');
            }
            return result;
        },
        onSuccess: (data) => {
            if (data.success) {
                console.log('Profile update success');
            }
        },
        onError: (error) => {
            console.log('Profile update error:', error);
            Toast.error('An unexpected error occurred while updating profile');
        }
    })
}