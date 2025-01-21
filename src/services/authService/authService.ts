import axios from 'axios';
import { IUser, ILoginData, ISignupData } from './types';
import { toast } from 'sonner';
const BASE_URL = 'http://127.0.0.1:8000/api/v1/user';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token: string) => {
    if (token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers['Authorization'];
    }
};

const authService = {
    login: async (data: ILoginData): Promise<IUser> => {
        try {
            const response = await axiosInstance.post<IUser>(`/signin/`, data);
            setAuthToken(response.data.token);
            return response.data;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error || 'Login failed';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    },

    signup: async (data: ISignupData): Promise<IUser> => {
        try {
            const response = await axiosInstance.post(`/signup/`, data);
            setAuthToken(response.data.token);
            return response.data;
        } catch (e: any) {
            const errorMessage = e.response?.data?.error || 'Signup Failed';
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
}

export default authService;