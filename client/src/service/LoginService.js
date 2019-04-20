import axios from 'axios';

class LoginService {

    static login(loginForm) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestBody = {
                    username: loginForm.username,
                    password: loginForm.password
                };
                const response = await axios.post('login', requestBody);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static refreshToken(username, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestBody = {
                    username: username,
                    accessToken: token
                };
                const response = await axios.post('refreshToken', requestBody);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default LoginService;