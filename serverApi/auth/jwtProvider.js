

//import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../services/users.js"

const jwtProvider = async (req, res) => {
    try {
    
        const { username, password } = req.body;
        
        const user = await User.usernamePasswordAreExist(username,password) 
        if(!user){
            return res.status(401).json({ error: "Invalid username and/or password" });
        }
        const token = jwt.sign({userId: user.id},"mySuperSecretKey1234567890",{
            expiresIn: "1d"
        });
        res.status(200).json({ token, user: user });


    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

export default{ jwtProvider }