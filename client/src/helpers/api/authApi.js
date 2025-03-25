import apiClient from './apiClient';
import Vue from 'vue';


const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        if (error.response) {
            vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
        } else {
            vm.flash(`Error: ${error.message || 'Unknown error'}`, 'error');
        }
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
        this.$router.push('/login');
    },

    isAuthenticated: () => {
        return !!apiClient.getToken();
    }
};