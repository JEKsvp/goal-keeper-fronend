import axios from 'axios';

const url = "api/v1/users";

class UserService {

    static getUser(username) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/${username}`).then(
                response => resolve(response.data),
                err => reject(err)
            );

        })
    }

    static getCurrentUser() {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/current`).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }
}

export default UserService;