import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const generateToken = (payload) => {
    const options = {
        expiresIn : process.env.expiresIn,
    };
    return jwt.sign(payload, process.env.secretKey, options)
};

export{
    generateToken,
}