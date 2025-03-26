import apiClient from './apiClient';
import Vue from 'vue';

const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
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

export const questionApi = {
    getQuestion: handleError(async id => {
        const res = await apiClient.questionApiClient.get(`${id}`);
        return res.data;
    }),
    getQuestions: handleError(async () => {
        const res = await apiClient.questionApiClient.get();
        return res.data;
    }),
    getQuestionsByTagId: handleError(async (tagId) => {
        const res = await apiClient.questionApiClient.get(`bytag/${tagId}`);
        return res.data;
    }),
    createQuestion: handleError(async payload => {
        const res = await apiClient.questionApiClient.post('', payload);
        return res.data;
    }),
    updateQuestion: handleError(async payload => {
        const res = await apiClient.questionApiClient.put(`${payload._id}`, payload);
        return res.data;
    }),
    deleteQuestion: handleError(async id => {
        const res = await apiClient.questionApiClient.delete(`${id}`);
        return res.data;
    })
};