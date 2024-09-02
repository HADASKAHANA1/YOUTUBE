import usersModel from '../models/users.js'

const createUser  = async (req, res) => {

       
    try {
       
      const ret = usersModel.createUser(req.body.username, req.body.password,req.body.profilePicture);
  
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
      const users = usersModel.getUsers();
  
      res.status(200).json({ users: users, message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };
  const getUserById = async (req, res) =>{
    try{
        const user = usersModel.getUserById(req.params.id)
        
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
        const ret = usersModel.deleteVideo(req.params.id,req.params.pid)
        console.log("ret: ",ret)
      

        if(ret ==1){

            res.status(200).json({ message: 'success to delete video' });
        }
        if(ret==404){
          console.log("ret: 404")

        
            res.status(404).json({ error: 'video is not exist' });
        }
        if(ret==400){
          console.log("ret: 400")

        
          res.status(400).json({ error: 'user is not exist' });
      }

    }catch(error){
        res.status(500).json({ error: 'Failed to delete video' });
    }
    
  }

  const editVideo = async(req,res)=>{
    try{
        const ret = usersModel.editVideo(req.params.id, req.params.pid, req.body.newtitle,req.body.newurl, req.body.newthumbnail,  req.body.newdescription)
      
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
      console.log("req.params.id ", req.params.id)


        const userVideos = usersModel.getUsersVideo(req.params.id);

        res.status(200).json({ videos : userVideos, message: 'user videos' });
        

    }catch(error){
        res.status(500).json({ error: 'Failed in user videos' });
    }
    
  }
  
  const editUser = async(req,res)=>{
    try{

        const ret = usersModel.editUser(req.params.id);
        if(!ret){
          res.status(400).json({ error: 'user isnot exist' });

        }
        res.status(200).json({ message: 'edit user success'})

    }catch(error){
        res.status(500).json({ error: 'Failed in edit user' });
    }
    
  }

  const deleteUser = async(req,res)=>{
    try{

        const ret = usersModel.deleteUserById(req.params.id);
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

        const ret = usersModel.addComment(req.params.pid,req.body.user,req.body.text);
        
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
      
      const ret = usersModel.editComment(req.params.pid,req.body.commentId,req.body.text);
      console.log(ret)
        
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
      
      const ret = usersModel.deleteComment(req.params.pid,req.body.commentId);
        
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
    deleteComment
}
