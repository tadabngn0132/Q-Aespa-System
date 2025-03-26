import apiClient from './apiClient';
import Vue from 'vue';


const vm = new Vue();

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });

export const answerApi = {
    getAnswer: handleError(async (questionId, answerId) => {
        const path = `questions/${questionId}/answers/${answerId}`;
        const res = await apiClient.answerApiClient.get(path);
        return res.data;
    }),
    getAnswers: handleError(async (questionId) => {
        const path = `questions/${questionId}/answers`
        const res = await apiClient.answerApiClient.get(path);
        return res.data;
    }),
    getAnswersByUserId: handleError(async (userId) => {
        const path = `users/${userId}/answers`;
        const res = await apiClient.answerApiClient.get(path);
        return res.data;
    }),
    createAnswer: handleError(async (questionId, payload) => {
        const path = `questions/${questionId}/answers`
        const res = await apiClient.answerApiClient.post(path, payload);
        return res.data;
    }),
    updateAnswer: handleError(async (questionId, answerId, payload) => {
        const path = `questions/${questionId}/answers/${answerId}`;
        const res = await apiClient.answerApiClient.put(path, payload);
        return res.data;
    }),
    deleteAnswer: handleError(async (questionId, answerId) => {
        const path = `questions/${questionId}/answers/${answerId}`;
        const res = await apiClient.answerApiClient.delete(path);
        return res.data;
    })
};