import axios from 'axios/index';
import Vue from '../main'

export default function setupAuthInterceptor() {

    axios.interceptors.response.use(
        (config) => {
            return config;
        },
        async (error) => {
            let response = error.response;
            if (response.status === 401 && Vue.$route.name !== 'WelcomePage') {
                Vue.$router.push({name: 'WelcomePage'});
            }
            return Promise.reject(error);
        }
    );
}