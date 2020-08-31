import axios from 'axios';

const url = "/api/v1";

class TherapistService {

    static findTherapists(params) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/therapists`, {params: params}).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }

    static getTherapist(username) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/therapists/${username}`).then(
                response => resolve(response.data),
                err => reject(err)
            );

        })
    }
}

export default TherapistService;