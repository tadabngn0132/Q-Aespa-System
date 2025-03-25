import apiClient from "./apiClient";
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});


const vm = new Vue();

const handleError = fn => (...params) => 
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });

export const tagApi = {
    getTag: handleError(async id => {
        const res = await apiClient.tagApiClient.get(`${id}`);
        return res.data;
    }),
    getTags: handleError(async () => {
        const res = await apiClient.tagApiClient.get();
        return res.data;
    }),
    createTag: handleError(async payload => {
        const res = await apiClient.tagApiClient.post('', payload);
        return res.data;
    }),
    updateTag: handleError(async payload => {
        const res = await apiClient.tagApiClient.put(`${payload._id}`, payload);
        return res.data;
    }),
    deleteTag: handleError(async id => {
        const res = await apiClient.tagApiClient.delete(`${id}`);
        return res.data;
    })
};