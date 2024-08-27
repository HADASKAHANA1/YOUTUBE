import usersModel from '../models/users.js'
import multer from 'multer';
import path from 'path';

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
    //console.log(req.body); 
       
    try {
      const users = usersModel.getUsers();
      console.log('users: ', users);
  
      res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };


export default {
    createUser,
    getUsers
}
