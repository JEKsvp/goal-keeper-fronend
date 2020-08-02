import axios from 'axios';

class SignInService {

    static login(loginForm) {
        return new Promise(async (resolve, reject) => {
            let requestBody = {
                username: loginForm.username,
                password: loginForm.password
            };
            axios.post('signin', requestBody).then(
                response => resolve(response.data),
                err => reject(err)
            );
        })
    }

    static refreshToken(token) {
        return new Promise(async (resolve, reject) => {
            let requestBody = {
                accessToken: token
            };
            axios.post('refreshToken', requestBody).then(
                response => resolve(response.data),
                err => reject(err)
            );
        })
    }
}

export default SignInService;