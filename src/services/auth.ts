import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const API_URL = 'https://reqres.in/api';

export const register = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        saveToken(response.data.token)
        return response.data.token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
        throw new Error('Registration failed');
    }
};

export const login = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        saveToken(response.data.token)
        return response.data.token;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
        throw new Error('Login failed');
    }
};

export const saveToken = async (token:string): Promise<void> => {
    try {
        await EncryptedStorage.setItem(
            "userToken",token);
    } catch (error) {
        console.log('error in storing user token ')
    }
  };

export const logout = async (): Promise<void> => {
    await EncryptedStorage.removeItem("userToken");
};

export const getToken = async (): Promise<string | null> => {
  return  await EncryptedStorage.getItem("userToken");
};