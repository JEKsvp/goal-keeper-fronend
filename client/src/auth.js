import axios from 'axios';
import Vue from './main'
import LoginService from './service/LoginService'

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
                let user = Vue.$store.state.user;
                let token = Vue.$session.get('token');
                if (user && token) {
                    try {
                        let newToken = await LoginService.refreshToken(user.username, token);
                        Vue.$session.set('token', newToken);
                        console.log("token refreshed");
                    } catch (e) {
                        return Promise.reject(error);
                    }
                }
                // Vue.$router.push('/login');
            }
            return Promise.reject(error);
        }
    );
}