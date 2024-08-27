import videoModel from './video.js'


const users = [{id: 0, username: "Sinai Cohen", password: '12345ee!', profilePicture: null, videos: []}]

function getUsers(){
    return users
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

function addVideo(idUser,title,url,thumbnail,description,uploadBy)
{
    const newVideo = videoModel.createVideo(title,url,thumbnail,description,uploadBy)

    for (const i in users) {
        if (users[i].id==idUser)
        {
            users[i].videos.push(newVideo.id)
        }
    }
}
function getVideo(idUser,idVideo){
    return videoModel.getVideoById(idVideo)
}

function deleteVideo(userId, videoId){
    videoModel.deleteVideo(videoId)
}

function editVideo(userId, videoId,newTitle)
{
    videoModel.editVideo(newTitle,videoId)
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
    addComment
}