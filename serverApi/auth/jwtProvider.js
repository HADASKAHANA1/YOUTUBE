

//import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/users.js"

const jwtProvider = async (req, res) => {
    try {
    
        const { username, password } = req.body;
        console.log('req.body: ', req.body);

        const user = User.usernamePasswordAreExist(username,password) 
        if(!user){
            return res.status(401).json({ error: "Invalid username and/or password" });
        }
        const token = jwt.sign({userId: user.id},"mySuperSecretKey1234567890",{
            expiresIn: "1d"
        });
      //  console.log('token:',token ,'userId:  ', user.id);
        res.status(200).json({ token, user: user });


        // const user = await User.findOne({ user });
        // if (!user) {
        //     return res.status(401).json({ error: "User does not exists" });
        // }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     return res.status(401).json({ error: "Inccorect password" });
        // }
        // const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        //     expiresIn: "10h",
        // });
        // res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

export default{ jwtProvider }