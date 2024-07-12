const { response } = require("express");

const UserService = require("../services/user-service");

const userService= new UserService();

const create =async(req,res)=> {
    try{
        const response=await userService.create({
            email:req.body.email,
            password:req.body.password,
        });
        return res.status(201).json({
            success:true,
            message: "successfully created a new user",
            data: response,
            err: {}
        });
    }catch(error){
        console.log("controler",error);
        //console.log("controller",error.statusCode)
        return res.status(201).json({
            message: error.message,
            data:{},
            success: false,
            err:error.explanation,
        });
    }
    }

   const signIn =async(req,res) =>{
        try{
            const response=await userService.signIn(req.body.email,req.body.password);
            return res.status(200).json({
                success:true,
                data: response,
                err: {},
                message: "successfully signed in",
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                message:"something went wrong : signin",
                data:{},
                success: false,
                err:error,
            });
        }
    }


    const isAuthenticated = async (req,res)=>{
        try{
            const token= req.headers['x-axis-token'];

            const response = await UserService.isAuthenticated(token);

            return res.status(200).json({
                success:true,
                data: response,
                err: {},
                message: "User is authenticated and token is valid",
            });

        }catch(error){
            console.log(error);
            return res.status(500).json({
                message:"something went wrong ",
                data:{},
                success: false,
                err:error,
            });
        }
    }




    const isAdmin = async(req,res) =>{
        try{
            const response= await userService.isAdmin(req.body.id);

            return res.status(200).json({
                success:true,
                data: response,
                err: {},
                message: "Successfully fetched whether user is admin or not",
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message:"something went wrong",
                data:{},
                success: false,
                err:error,
            });
        }
    }


 module.exports={
    create,
    signIn,
    isAuthenticated,
    isAdmin
 }   
