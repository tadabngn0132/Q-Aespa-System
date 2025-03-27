import apiClient from './apiClient';
import Vue from 'vue';


const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.response) {
            if (error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            } else {
                errorMessage = `${error.response.status}: ${error.response.statusText}`;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        console.error('API Error:', error);
        
        Vue.$toast.error(errorMessage);
        
        throw error;
    });

export const authApi = {
    registerUser: handleError(async (name, email, password) => {
        const res = await apiClient.registerApiClient.post('', { name, email, password });
        return res.data;
    }),
    loginUser: handleError(async (email, password) => {
        const res = await apiClient.loginApiClient.post('', {email, password});
        
        if (res.data && res.data.token) {
            localStorage.setItem('token', res.data.token);
            apiClient.setupAuthInterceptor?.(res.data.token);
        }
        
        return res.data;
    }),

    logout: () => {
        apiClient.clearToken();
        return true;
    },

    isAuthenticated: () => {
        return !!apiClient.getToken();
    }
};