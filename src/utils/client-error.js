const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class Clienterror extends AppError {
    constructor(name,message,explanation,statusCode)
    {
        super(
            name,
            message,
            explanation,
            statusCode
        );
    }
}


module.exports = Clienterror;