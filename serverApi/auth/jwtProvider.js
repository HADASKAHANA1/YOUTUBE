import jwt from "jsonwebtoken";
import fetch from "node-fetch"; // יש לוודא שהספרייה מותקנת בעזרת npm install node-fetch
import User from "../services/users.js";
import net from 'net';
const userThreads = new Map(); // Store threads or connections by user ID



const jwtProvider = async (req, res) => {
    try {
        const { username, password } = req.body;

        // שלב 1: בדיקה אם היוזר קיים
        const user = await User.usernamePasswordAreExist(username, password);
        if (!user) {
            return res.status(401).json({ error: "Invalid username and/or password" });
        }

        // שלב 2: יצירת ה-JWT והחזרתו למשתמש
        const token = jwt.sign({ userId: user.id }, "mySuperSecretKey1234567890", {
            expiresIn: "1d"
        });

       
    // Establish a TCP connection for the user
    const client = new net.Socket();
    const ip_address = '127.0.0.1';
    const port_no = 5555;
   
    client.connect(port_no, ip_address, () => {
      console.log(`User ${user.username} connected to the server`);
      client.write(`${user.id}`);
    });
   
    // Handle incoming data from the server
    client.on('data', (data) => {
      console.log(`Received for user ${user.username}:`, data.toString());
    });
   
    // Handle the connection closing
    client.on('close', () => {
      console.log(`Connection closed for user ${user.username}`);
    });
   
    // Handle errors
    client.on('error', (error) => {
      console.error(`Error for user ${user.username}:`, error);
   });
    // Store the connection in the map
    const userId = user._id.toString();
    userThreads.set(userId, client);

        // שלב 4: החזרת התשובה ללקוח
        res.status(200).json({ token, user: user });
    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ error: "Login failed" });
    }
};

export default { jwtProvider , userThreads };
