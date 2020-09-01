import axios from 'axios';

const url = "api/v1";

class AccessService {

    static getCurrentUserAccesses() {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/users/current/accesses`).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }

    static createAccessRequest(accessRequest) {
        return new Promise(async (resolve, reject) => {
            axios.post(`${url}/access-request`, accessRequest).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }
}

export default AccessService;