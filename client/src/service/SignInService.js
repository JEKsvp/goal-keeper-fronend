import axios from 'axios';

class SignInService {

    static login(loginForm) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestBody = {
                    username: loginForm.username,
                    password: loginForm.password
                };
                const response = await axios.post('signin', requestBody);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static refreshToken(token) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestBody = {
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

export default SignInService;