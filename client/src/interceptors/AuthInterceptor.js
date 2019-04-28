import axios from 'axios/index';
import Vue from '../main'
import LoginService from '../service/LoginService'

export default function setupAuthInterceptor() {
    axios.interceptors.request.use(
        (config) => {
            let token = Vue.$session.get('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (config) => {
            return config;
        },
        async (error) => {
            let response = error.response;
            if (response.status === 401) {
                let token = Vue.$session.get('token');
                console.log(token);
                if (token) {
                    try {
                        let data = await LoginService.refreshToken(token);
                        Vue.$session.set('token', data.accessToken);
                    } catch (e) {
                        Vue.$router.push('/login');
                    }
                } else {
                    Vue.$router.push('/login');
                }
            }
            return Promise.reject(error);
        }
    );
}