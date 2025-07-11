const {User,Role} = require('../models/index');
const ValidationError= require('../utils/validation-error');
class UserRepository {
    async create(data){
        try {
            const user = await create(data);
            return user;
        } catch (error) {
            if(error.name =='SequelizeValidationError'){
            throw new ValidationError(error);
            }
           
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
    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where :{
                    email :userEmail
                }
            });
            return user;
        } catch (error) {
             console.log("Something went wrong on Repository Layer");
            throw error;
        }
    }
    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.find({
                where : {
                    name :'ADMIN'
                }
            })
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on Repository Layer");
            throw error;
        }
    }
}
module.exports= UserRepository;