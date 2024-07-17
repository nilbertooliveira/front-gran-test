import {defineStore} from "pinia";
import axios from "axios";

export const useAxiosStore = defineStore('axios', {
    state: () => ({
        axiosInstance: axios.create({
            // Your Axios configuration
            baseURL: 'https://your-api-url', // Your API base URL
            headers: {
                'Content-Type': 'application/json', // Your default headers
            },
        }),
    }),
    actions: {},
});