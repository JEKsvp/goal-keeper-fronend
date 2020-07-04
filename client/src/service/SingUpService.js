import axios from 'axios';

const url = "/api/v1/signup";

class SingUpService {

    static registerUser(registerData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(url, registerData);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default SingUpService;