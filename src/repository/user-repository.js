const {User} = require('../models/index');
class UserRepository {
    async create(data){
        try {
            const user = await create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on Repository Layer");
            throw error;
        }
    }
    async destroy(userId){
        try {
            await User.destroy(
                {
                    where :{
                        id :userId
                    }
                }
            );
            return true;
        } catch (error) {
            console.log("Something went wrong on Repository Layer");
            throw error;
        }
    }
    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes : ['email','id'] //This is where we can select the particular attributes
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on Repository Layer");
            throw error;
        }
    }
}
module.exports= UserRepository;