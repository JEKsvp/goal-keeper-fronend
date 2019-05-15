import axios from 'axios';

const url = "api/v1/users";

class UserService {

    static getUser(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${url}/${username}`);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static getCurrentUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${url}/current`);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default UserService;