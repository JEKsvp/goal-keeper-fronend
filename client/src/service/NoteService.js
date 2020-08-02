import axios from 'axios';

const url = "/api/v1/users";

class NoteService {

    static getNotesByUsername(username) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/${username}/diary/notes`).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }

    static getNoteByUsernameAndNoteId(username, noteId) {
        return new Promise(async (resolve, reject) => {
            axios.get(`${url}/${username}/diary/notes/${noteId}`).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }

    static createNote(username, createNoteRequest) {
        return new Promise(async (resolve, reject) => {
            axios.post(`${url}/${username}/diary/notes`, createNoteRequest).then(
                response => resolve(response.data),
                err => reject(err)
            )
        })
    }

    static deleteNote(username, noteId) {
        return new Promise(async (resolve, reject) => {
            axios.delete(`${url}/${username}/diary/notes/${noteId}`).then(
                response => resolve(response.data),
                err => reject(err)
            );
        })
    }

}

export default NoteService;