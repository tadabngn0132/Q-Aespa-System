import Vue from "vue";
import apiClient from "./apiClient";

const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        console.error("API Error:", error);
        if (Vue.prototype.$flashMessage) {
            Vue.prototype.$flashMessage.show(
                `Error: ${error.response ? error.response.statusText : 'Connection error'}`,
                'error'
            );
        } else {
            console.error(`API Error: ${error.response ? error.response.status : 'Unknown'}`);
            alert(`Error: ${error.response ? error.response.statusText : 'Could not connect to server'}`);
        }
        throw error;
    });

export const userApi = {
    getUsers: handleError(async () => {
        const res = await apiClient.userApiClient.get();
        return res.data;
    }),
    getQuestionsByUserId: handleError(async id => {
        const res = await apiClient.userApiClient.get(`${id}/questions`);
        return res.data;
    }),
    deleteUser: handleError(async id => {
        const res = await apiClient.userApiClient.delete(`${id}`);
        return res.data;
    }),
    getUser: handleError(async id => {
        const res = await apiClient.userApiClient.get(`${id}`);
        return res.data;
    }),
    createUser: handleError(async payload => {
        const res = await apiClient.userApiClient.post('', payload);
        return res.data;
    }),
    updateUser: handleError(async (id, payload) => {
        const res = await apiClient.userApiClient.put(`${id}`, payload);
        return res.data;
    })
}