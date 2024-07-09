const UserRepository = require("../repository/user-repository");
const jwt =require("jsonwebtoken");

const { JWT_KEY } = require("../config/serverConfig")


const bcrypt= require("bcrypt");

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
    


    async signIn(email,plainPassword){
        try{
            const user = await this.userRepository.getByEmail(email);
            const passwordsMatch =this.checkPassword(plainPassword,user.password);

            if(!passwordsMatch){
                console.log("password doesn't match");
                throw {error: 'incorrect password'};
            }

            const newJWT =this.createToken({email:user.email, id: user.id});
            return newJWT;
        } catch(error) {
            console.log("Something went wrong in Sign in process");
            throw error;
        }
    }

    createToken(user) {
        try{
            const result = jwt.sign(user,JWT_KEY, {expiresIn : "1d"});
            return result;
        }catch(error){
             console.log("Something went wrong in service layer : token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try{
            const response = jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){ 
            console.log("Something went wrong in service layer : token validation",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){  
            console.log("Something went wrong in service layer : Password comparison");
            throw error;
        }
    }



}


module.exports = UserService;