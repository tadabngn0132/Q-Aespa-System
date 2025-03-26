import Vue from "vue";
import apiClient from "./apiClient";

const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });

export const userApi = {
    getUsers: handleError(async () => {
        const res = await apiClient.userApiClient.get();
        return res.data;
    }),
    getQuestionsByUserId: handleError(async id => {
            const res = await apiClient.questionApiClient.get(`${id}/questions`);
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