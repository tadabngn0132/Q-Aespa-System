import apiClient from './apiClient';
import Vue from 'vue';


const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        if (error.response) {
            console.error(`${error.response.status}: ${error.response.statusText}`);
            if (Vue.prototype.$flashMessage) {
                Vue.prototype.$flashMessage.show(
                    `${error.response.status}: ${error.response.statusText}`,
                    'error'
                );
            } else {
                alert(`Error: ${error.response.statusText || 'Unknown error'}`);
            }
        } else {
            console.error(`Error: ${error.message || 'Unknown error'}`);
            if (Vue.prototype.$flashMessage) {
                Vue.prototype.$flashMessage.show(
                    `Error: ${error.message || 'Unknown error'}`,
                    'error'
                );
            } else {
                alert(`Error: ${error.message || 'Unknown error'}`);
            }
        }

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