import usersService from '../services/users.js'

import usersModel from '../models/users.js'




const createUser  = async (req, res) => {

       
    try {
       
      const ret =await usersService.createUser(req.body.username, req.body.password,req.body.profilePicture);
  
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
  
      res.status(200).json({ users: users, message: 'User  successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to  user' });
    }
  };
  const getUserById = async (req, res) =>{
    try{
        const user = await usersService.getUserById(req.params.id)
        console.log("req.params.id: ",req.params.id)
        
        res.status(200).json({user:user, message: 'User received successfully' });

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
        const user = usersService.getUserById(req.params.id)
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
            res.status(400).json({ error: 'fail to upload video' });
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
          console.log("ret: 404")

        
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

    // בדיקה אם התמונה הועלתה
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail[0];
      imageUrl = `http://localhost:8000/uploads/${thumbnail.filename}`;
    }

    // שליחת הערכים לקובץ ה-service
    const ret = await usersService.editVideo(
      req.params.id,
      req.params.pid,
      title,
      videoUrl,   // ישמש רק אם הועלה סרטון
      imageUrl,   // ישמש רק אם הועלתה תמונה
      description
    );

        console.log(ret)
        if(ret){

            res.status(200).json({ message: 'success to edit video' });
        }
        
        else{
        
          res.status(400).json({ error: 'video is not exist' });
      }

    }catch(error){
        res.status(500).json({ error: 'Failed to edit video' });
    }
    
  }
  const getUsersVideos = async(req,res)=>{
    try{


        const userVideos = await usersService.getUsersVideo(req.params.id);
        console.log(userVideos)

        res.status(200).json({ videos : userVideos, message: 'user videos' });
        

    }catch(error){
        res.status(500).json({ error: 'Failed in user videos' });
    }
    
  }
  
  const editUser = async(req,res)=>{
    try{

        const ret = await usersService.editUser(req.params.id,req.body.username,req.body.password,req.body.profilePicture);
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
        console.log("usercontrolerdeleteuser: ",req.params.id)
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
  
  


export default {
    createUser,
    getUsers,
    getUserById,
    login,
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
    
}
