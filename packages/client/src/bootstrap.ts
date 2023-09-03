import axios from 'axios';

import { makeUseAxios } from 'axios-hooks';
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL ? import.meta.env.VITE_APP_API_URL : '/api';

/**
 * Handle API error
 * When API returns 401, for all /api type requests (except /api/user) we refresh the page
 * so that Authenticate component will catch the error (loading user)
 * @param err
 */
const handleAuthFailed = async (err: any) => {
    const status = err.response?.status || 500;
    if (status === 401 && err.response.data.message === 'Expired token') {
        window.location.reload();
    }
    return Promise.reject(err);
};

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        console.log(err);
        return handleAuthFailed(err);
    },
);

const useAxios = makeUseAxios({ axios, cache: false });
export { axios, useAxios };
