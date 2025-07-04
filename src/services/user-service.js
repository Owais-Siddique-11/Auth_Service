const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const AppErrors = require('../utils/error-handler');


class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'ValidationError'){
               throw error; 
            }
            console.log("something went wrong in service layer");
            throw new AppErrors('Server Error','Something went wrong in service','Logical issue',500);
        }
    }
    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordsMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log("Password doesnt match");
                throw {error : 'Incorrect password'};
            }
            const newJWT = this.createToken({
                email:user.email,
                id :user.id
            })
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the signIn process");
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
            const isVerified = this.verifyToken(token);
            if(!isVerified){
                throw {error : 'Invalid token'}
            }
            const user = this.userRepository.getById(isVerified.id);
            if(!user){
                throw {error :'No user with corresponding token exists'};
            }
            return user.id;

        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }
    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY); 
            return response; 
        } catch (error) {
            console.log("Something went wrong in token verification",error);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}
module.exports =UserService;
