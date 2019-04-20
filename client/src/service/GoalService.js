import axios from 'axios';

const url = "api/v1/goals";

class GoalService{

    static getGoals(){
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

export default GoalService;