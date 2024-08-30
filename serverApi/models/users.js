import videoModel from './video.js'


const users = [{id: 0, username: "Sinai Cohen", password: '12345ee!', profilePicture: null, videos: [1,2,3,4,5,6,7,8,9,10]}]

function getUsers(){
    return users
}

function getUserByUsernameAndPassword(username,password){
    
}

function createUser(username,password,profilePicture){
    const newUser = {id: users[users.length-1].id+1, username: username, password: password,profilePicture: profilePicture,videos:[]}
    users.push(newUser)
}

function getUserById(id){
    for (const i in users) {
       if (users[i].id==id)
       {
        return users[i]
       }
    }
    return null
}

function usernamePasswordAreExist(username,password){
    console.log(getUsers());
    console.log(username,password);
    for (const i in users) {
        console.log(users[i].password,password)
        console.log(users[i].username,username)

        if(users[i].username==username && users[i].password==password){
        //    console.log(users[i])
            return users[i]
        }
    }

   // return users.find(user => user.username === username && user.password === password);

}

function editUser(){

}

function deleteUserById(id){
    for (const i in users) {
        if (users[i].id==id)
        {
           users.splice(users[i],1)
        }
     }
}

function getUsersVideo(id){
    for (const i in users) {
        if (users[i].id==id)
        {
         return users[i].videos
        }
     }
     return null
}

function addVideo(idUser,title,url,thumbnail,description)
{
    const username = getUserById(idUser).username
    const newVideo = videoModel.createVideo(title,url,thumbnail,description,username)

    for (const i in users) {
        if (users[i].id==idUser)
        {
            users[i].videos.push(newVideo.id)
        }
    }
    return newVideo
}
function getVideo(idUser,idVideo){
    return videoModel.getVideoById(idVideo)
}

function deleteVideo(userId, videoId){

    for (const i in users) {
        if (users[i].id==userId) {
            if(videoModel.deleteVideo(videoId)==1){

                    users[i].videos = users[i].videos.filter(video => video.id !== videoId);
                    return 1
            }
            return 404 //video isnt exist
        }
            
    }
    return 400 //user isnt exist
    
}

function editVideo(userId, videoId,newTitle,newVideo,newThumbnail, newDescription)
{
    return videoModel.editVideo(newTitle,videoId,newThumbnail,newVideo,newDescription)
}
function addComment(videoId,userId, comment){
    videoModel.addComment(videoId,userId,comment)
}
function editComment(videoId,userId, newComment){

}


export default {
    getUserById,
    getUsers,
    editUser,
    getUsersVideo,
    deleteUserById,
    createUser,
    addVideo,
    getVideo,
    deleteVideo,
    editVideo,
    addComment,
    usernamePasswordAreExist
}