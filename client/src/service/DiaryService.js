import axios from 'axios';

const url = "/api/v1/users";

class DiaryService {

    static getDiaryByUsername(username) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/${username}/diary`).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }
}

export default DiaryService;