import axios from 'axios';

const url = "/api/v1/signup";

class SingUpService {

    static registerUser(registerData) {
        return new Promise(async (resolve, reject) => {
            axios.post(url, registerData).then(
                response => resolve(response.data),
                err => reject(err)
            );
        })
    }
}

export default SingUpService;