import axios from 'axios';

const url = "/api/v1/diaries";

class DiaryService {

    static getDiaries(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(url, {params: {username: username}});
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static createDiary(createDiaryRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(url, createDiaryRequest);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default DiaryService;