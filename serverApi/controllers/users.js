import usersModel from '../models/users.js'
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // היכן לשמור את הקבצים
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // שם הקובץ כולל סיומת
//     }
//   });
//   const upload = multer({ storage: storage });

const createUser  = async (req, res) => {

    console.log(req.body); 
       
    try {
       
      usersModel.createUser(req.body.username, req.body.password,req.body.profilePicture);
  
      res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  const getUsers  = async (req, res) => {
       
    try {
      const users = usersModel.getUsers();
  
      res.status(200).json({ users: users, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };
  const getUserById = async (req, res) =>{
    try{
        const user = usersModel.getUserById(req.params.id)
        
        res.status(200).json({ message: 'User received successfully' });

    } catch (error){
        res.status(500).json({ error: 'Failed to get user' });
    }
  }
  const login = async (req,res) => {
    try{
        const user = usersModel.usernamePasswordAreExist(req.body.username,req.body.password)
        if(user){
            res.status(200).json({ message: 'UserName and password are valid' });
        }
        else{
            res.status(401).json({ error: 'Invalid username and/or password' });
        }
    } catch (error){
        res.status(500).json({ error: 'Failed to get user' });
    }
  }

  const logout = async (req,res) => {
    try{
        const user = usersModel.getUserById(req.params.id)
        if(user){
            res.status(200).json({ message: 'user is exist' });
        }
        else{
            res.status(401).json({ error: 'user isnt exist' });
        }
    } catch (error){
        res.status(500).json({ error: 'Failed to logout user' });
    }

  }
  const uploadVideo = async(req,res)=>{
    try{
        const newVideo = usersModel.addVideo(req.params.id,req.body.title,req.body.url,req.body.thumbnail,req.body.description)
        if(newVideo){
            res.status(200).json({ message: 'success to upload video' });
        }
        else{
            res.status(400).json({ error: 'fail to upload video' });
        }

    }catch(error){
        res.status(500).json({ error: 'Failed to upload video' });
    }
    
  }


export default {
    createUser,
    getUsers,
    getUserById,
    login,
    logout,
    uploadVideo
}
