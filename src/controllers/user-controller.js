const UserService = require('../services/user-service');
const userService = new UserService();
const create= async(req,res)=>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message:"Successfully created the user",
            data: response,
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message : error.message,
            data : {},
            success :false,
            err : error.explanation
        });
    }
}

const signIn= async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data : response,
            err:{},
            message:'sucessfully signed in'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success :false,
            err : error
        });
    }
}

const isAuthenticated = async (req,res)=>{
    try {
        const token= req.headers['x-access-token'];
        const response= await userService.isAuthenticated(token);
        return res.status(200).json({
            success :true,
            err :{},
            data : response,
            message: 'User is authenticated and user is valid'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success :false,
            err : error
        });
    }
}
    const isAdmin = async(req,res)=>{
         try {
        const response =await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data :response,
            err:{},
            message:'Succesfully fetched user is admin or not',
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Something went wrong",
            data : {},
            success :false,
            err : error
        });
    }
    }  
module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin
}