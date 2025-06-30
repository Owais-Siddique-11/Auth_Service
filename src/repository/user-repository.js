const {User} = require('../models/index');
class UserRepository {
    async create(data){
        try {
            const user = await crate(data);
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
}
module.exports= UserRepository;