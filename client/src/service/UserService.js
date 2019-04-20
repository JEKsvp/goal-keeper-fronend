import axios from 'axios';

const url = "api/v1/users";

class UserService{

    static getUsers(){
        return new Promise(async (resolve, reject) =>{
            try{
                const response = await axios.get(url);
                const data = response.data;
                resolve(data);
            }catch(err){
                reject(err);
            }
        })
    }
}

export default UserService;