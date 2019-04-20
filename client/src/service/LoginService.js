import axios from 'axios';

const url = "login";

class LoginService {

    static login(loginForm) {
        return new Promise(async (resolve, reject) => {
            try {
                let requestBody = {
                    username: loginForm.username,
                    password: loginForm.password
                };
                const response = await axios.post(url, requestBody);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default LoginService;