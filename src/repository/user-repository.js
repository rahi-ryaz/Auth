const ValidationError  = require("../utils/validation-error");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes")

class UserRepository{


    async create(data) {
        try{
            const user = await User.create(data);
            return user;
        } catch(error) {
            if(error.name == 'sequelizeValidationError')
            {
               throw new ValidationError(error);
            }
            console.log("Something went wrong in repo layer");
            throw error;
        }
    }
      


    async destroy(userId) {
        try{
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch(error) {
            console.log("Something went wrong in repo layer");
            throw error;
        }
    }
    
    async getById(userId) {
        try{
            const user=await User.findByPk(userId,{
                attributes :['email' , 'id']
            });
            return user;
        }catch(error){  console.log("Something went wrong in repo layer");
            throw error;
        }
    
    }


    async getByEmail(userEmail) {
        try{
            const user=await User.findOne({where: {
                email : userEmail
            }  
            });
            console.log(user,"from repo log client error")
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Please check the email , as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
                
            }
            return user;
        }catch(error){  console.log("Something went wrong in repo layer");
            throw error;
        }
    
    }

    async isAdmin(userId) {
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name : "ADMIN"
                }
            });
           if(!user) {
            console.log("user not found")
            return;
           }
            return user.hasRole(adminRole);
        }catch(error){  
            console.log("Something went wrong in repo layer");
            throw error;
        }
    }
   
}



module.exports = UserRepository;