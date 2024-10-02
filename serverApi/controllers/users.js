import usersService from '../services/users.js'

import usersModel from '../models/users.js'

import net from 'net'
import jwtProvider from '../auth/jwtProvider.js'




const createUser  = async (req, res) => {

       
    try {
      const { username, password } = req.body;
      const profilePictureUrl = `http://localhost:8000/uploads/${req.file.filename}`; 

      
      const ret =await usersService.createUser(username,password,profilePictureUrl);
  
      if(!ret){
        return res.status(409).json({ error: 'user already exist' });
      }
      return res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  const getUsers  = async (req, res) => {
       
    try {
      const users = await usersService.getUsers();
  
      res.status(200).json({ users: users, message: 'Users recieved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to bring users' });
    }
  };
  const getUserById = async (req, res) =>{
    try{
        const user = await usersService.getUserById(req.params.id)
        if(!user){
          return res.status(409).json({error : 'user not found' });

        }
        res.status(200).json({user:user, message: 'User received successfully' });

    } catch (error){
        res.status(500).json({ error: 'Failed to get user' });
    }
  }
  // const login = async (req,res) => {
  //   try{
  //       const user = usersModel.usernamePasswordAreExist(req.body.username,req.body.password)
  //       if(user){
  //           res.status(200).json({ message: 'UserName and password are valid' });
  //       }
  //       else{
  //           res.status(401).json({ error: 'Invalid username and/or password' });
  //       }
  //   } catch (error){
  //       res.status(500).json({ error: 'Failed to get user' });
  //   }
  // }

  const logout = async (req,res) => {
    try{

      
        const user = await usersService.getUserById(req.params.id)
        if(user){
          let sockets = jwtProvider.userThreads
          const socket = sockets.get(user._id.toString())
         // console.log("socket: ",sockets.keys)
          if (socket) {
            socket.end(() => {
            console.log(`Disconnected user ${user.id}`);
            sockets.delete(user._id.toString); // הסר את הסוקט מהמפה
        });
    } else {
        console.log(`No connection found for user ${user.id}`);
    }

            res.status(200).json({ message: 'user logged out' });
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

      const { title, description } = req.body;

      
      // קבלת הקבצים
      const videoFile = req.files.videoFile[0]; // הסרטון שהועלה
      const thumbnail = req.files.thumbnail[0]; // התמונה שהועלתה
      const videoUrl = `http://localhost:8000/uploads/${videoFile.filename}`;
      const imageUrl = `http://localhost:8000/uploads/${thumbnail.filename}`;


        const newVideo = await usersService.addVideo(req.params.id,title,videoUrl,imageUrl,description)
    
        if(newVideo){
            res.status(200).json({video: newVideo, message: 'success to upload video' });
        }
        else{
            res.status(404).json({ error: 'user is not exist' });
        }

    }catch(error){
        res.status(500).json({ error: 'Failed to upload video' });
    }
    
  }
  const deleteVideo = async(req,res)=>{
    try{
        const ret = await usersService.deleteVideo(req.params.id,req.params.pid)
      

        if(ret ==1){

            res.status(200).json({ message: 'success to delete video' });
        }
        if(ret==404){

        
            res.status(404).json({ error: 'video is not exist' });
        }
        if(ret==400){

        
          res.status(400).json({ error: 'user is not exist' });
      }

    }catch(error){
        res.status(500).json({ error: 'Failed to delete video' });
    }
    
  }

  const editVideo = async(req,res)=>{
    try{
      
      const { title, description } = req.body;

      let videoUrl, imageUrl;

       // בדיקה אם הסרטון הועלה
    if (req.files && req.files.videoFile) {
      const videoFile = req.files.videoFile[0];
      videoUrl = `http://localhost:8000/uploads/${videoFile.filename}`;
    }

    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail[0];
      imageUrl = `http://localhost:8000/uploads/${thumbnail.filename}`;
    }

    const ret = await usersService.editVideo(
      req.params.pid,
      title,
      videoUrl,   
      imageUrl,   
      description
    );

        if(ret==1){

            res.status(200).json({ message: 'success to edit video' });
        }
        
        else{
        
          res.status(404).json({ error: 'video is not exist' });
      }

    }catch(error){
        res.status(500).json({ error: 'Failed to edit video' });
    }
    
  }
  const getUsersVideos = async(req,res)=>{
    try{


        const userVideos = await usersService.getUsersVideo(req.params.id);
        if(userVideos){
          res.status(200).json({ videos : userVideos, message: 'user videos' });

        }
        else{
          res.status(400).json({  error: 'user not found' });

        }
        

    }catch(error){
        res.status(500).json({ error: 'Failed in user videos' });
    }
    
  }
  
  const editUser = async(req,res)=>{
    try{
      const { password } = req.body;
      let profilePictureUrl;


      if (req.file) {
        const profilePicture = req.file;
        profilePictureUrl = `http://localhost:8000/uploads/${profilePicture.filename}`;
      }

        const ret = await usersService.editUser(req.params.id,password,profilePictureUrl);
        if(!ret){
          res.status(400).json({ error: 'user isnot exist' });
            return;
        }
        res.status(200).json({user: ret, message: 'edit user success'})

    }catch(error){
        res.status(500).json({ error: 'Failed in edit user' });
    }
    
  }

  const deleteUser = async(req,res)=>{
    try{

        const ret = await usersService.deleteUserById(req.params.id);
        if(!ret){
          return res.status(400).json({ error: 'user isnot exist' });

        }
        return res.status(200).json({ message: 'delete user success'})

    }catch(error){
        res.status(500).json({ error: 'Failed in delete user' });
    }
    
  }
  const addComment = async(req,res)=>{
    try{

        const ret = await usersService.addComment(req.params.pid,req.body.user,req.body.text);
        
        if(!ret){
          return res.status(400).json({ error: 'video isnot exist' });

        }
        return   res.status(200).json({ message: 'add comment success'})

    }catch(error){
      return  res.status(500).json({ error: 'Failed in add comment' });
    }
    
  }

  const editComment = async(req,res)=>{
    try{
      
      const ret = await usersService.editComment(req.params.pid,req.body.commentId,req.body.text);
        
        if(!ret){
          return res.status(400).json({ error: 'video isnot exist' });

        }
        return   res.status(200).json({ message: 'edit comment success'})

    }catch(error){
      return  res.status(500).json({ error: 'Failed in edit comment' });
    }
    
  }
  const deleteComment = async(req,res)=>{
    try{
      
      const ret = await usersService.deleteComment(req.params.pid,req.body.commentId);
        
        if(!ret){
          return res.status(400).json({ error: 'video isnot exist' });

        }
        return   res.status(200).json({ message: 'delete comment success'})

    }catch(error){
      return  res.status(500).json({ error: 'Failed in delete comment' });
    }
  
  }

const getVideoById = async (req, res) => {
  try {
      const video = await usersService.getVideoById(req.params.pid);

      if (video) {
          let sockets = jwtProvider.userThreads;
          const socket = sockets.get(req.params.id.toString());

          if (socket) {
              // אם הסוקט קיים, שולחים את המידע לשרת
              const userId = req.params.id; // מזהה המשתמש
              const videoId = req.params.pid; // מזהה הוידאו
              const views = parseInt(video.views); // מספר צפיות

              // שליחת המידע לשרת בפורמט המתאים, בלי פסיקים
              const message = `view:${userId}:${videoId}:${views}`;
              socket.write(message);            
          } else {
              console.log(`Socket not found for user ID: ${req.params.id}`);
          }
      }
      res.status(200).json({ video: video, message: 'bring video success' });
  } catch (error) {
      res.status(500).json({ video: null, error: 'video does not exist' });
  }
};


export default {
    createUser,
    getUsers,
    getUserById,
    logout,
    uploadVideo,
    deleteVideo,
    editVideo,
    getUsersVideos,
    editUser,
    deleteUser,
    addComment,
    editComment,
    deleteComment,
    getVideoById  
}