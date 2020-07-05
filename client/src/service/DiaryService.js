import axios from 'axios';

const url = "/api/v1/users";

class DiaryService {

    static getDiaryByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${url}/${username}/diary`);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default DiaryService;