import axios from 'axios';

export default class LogoutService {
    static logout() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('logout');
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}