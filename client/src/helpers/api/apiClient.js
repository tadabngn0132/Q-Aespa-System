import axios from "axios";
import store from '@/store';
import router from '@/router'

const baseURL = 'http://localhost:5995/';

const createHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

const createApiClient = (path) => {
    const client = axios.create({
        baseURL: baseURL + (path || ''),
        timeout: 10000,
        headers: createHeaders()
    });

    client.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );

    client.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                console.log('Token expired or invalid, logging out...');
                store.dispatch('auth/logout');
                router.push('/login');
            }
            return Promise.reject(error);
        }
    )

    return client;
};

const questionApiClient = createApiClient('questions/');
const answerApiClient = createApiClient('');
const tagApiClient = createApiClient('tags/');
const userApiClient = createApiClient('users/');
const registerApiClient = createApiClient('register/');
const loginApiClient = createApiClient('login/');

const setupAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export default {
    questionApiClient,
    answerApiClient,
    tagApiClient,
    userApiClient,
    registerApiClient,
    loginApiClient,

    setupAuthToken,
    getToken: () => localStorage.getItem('token'),
    clearToken: () => localStorage.removeItem('token')
};