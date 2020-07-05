import axios from 'axios';

const url = "/api/v1/users/";

class NoteService {

    static getNotesByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${url}/${username}/diary/notes`);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static getNoteByUsernameAndNoteId(username, noteId) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${url}/${username}/diary/notes/${noteId}`);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    static createNote(username, createNoteRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${url}/${username}/diary/notes`, createNoteRequest);
                const data = response.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

}

export default NoteService;