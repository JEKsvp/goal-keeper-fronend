import axios from 'axios';

const url = "register"

class UserService{

    static getUsers(registerData){
        return new Promice(async (resolve, reject) =>{
            try{
                const response = await axios.post(url, registerData);
                const data = response.data;
                resolve(data);
            }catch(err){
                reject(err);
            }
        })
    }
}