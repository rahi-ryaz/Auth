const UserRepository = require("../repository/user-repository");
const jwt =require("jsonwebtoken");

const { JWT_KEY } = require("../config/serverConfig")

class UserService {
    constructor(){
        this.userRepository = new UserRepository();

    }


    async create(data) {
        try{
            const user = await this.userRepository.create(data);
            return user;
        } catch(error) {
            console.log("Something went wrong in Service layer");
            throw error;
        }
    }

    createtoken(user) {
        try{
            const result = jwt.sign(user,JWT_KEY, {expiresIn : "1h"});
            return result;
        }catch(error){  console.log("Something went wrong in service layer : token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){  console.log("Something went wrong in service layer : token validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypy.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){  console.log("Something went wrong in service layer : Password comparison");
            throw error;
        }
    }



}


module.exports = UserService;