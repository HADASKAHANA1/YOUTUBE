const videos = [  { id: '1', title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:0},
{ id: '2', title: 'Video 2', url: '/videos/video 2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:892},
{ id: '3', title: 'Video 3', url: '/videos/video 3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:46},
{ id: '4', title: 'Video 4', url: '/videos/video 4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:998},
{ id: '5', title: 'Video 5', url: '/videos/video 5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:34},
{ id: '6', title: 'Video 6', url: '/videos/video 6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:10000},
{ id: '7', title: 'Video 7', url: '/videos/video 7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:1345},
{ id: '8', title: 'Video 8', url: '/videos/video 8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:666},
{ id: '9', title: 'Video 9', url: '/videos/video 9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:40},
{ id: '10', title: 'Video 10', url: '/videos/video 10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10', uploadedBy: 'Sinai Cohen', comments: [], likes: [] ,views:110}]


function getCombinedVideoList(videos) {
    // פונקציה למיון הסרטונים לפי צפיות
    const getTopViewedVideos = (videos, count) => {
      return videos.slice().sort((a, b) => b.views - a.views).slice(0, count);
    };
  
    // פונקציה לבחירת סרטונים באקראי
    const getRandomVideos = (videos, count) => {
      const shuffled = videos.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
  
    // מציאת 10 הסרטונים הנצפים ביותר
    const topViewedVideos = getTopViewedVideos(videos, 10);
  
    // מציאת 10 סרטונים אקראיים מתוך הסרטונים שנותרו
    const remainingVideos = videos.filter(video => !topViewedVideos.includes(video));
    const randomVideos = getRandomVideos(remainingVideos, 10);
  
    // שילוב שני הרשימות וסידורן באקראי
    return [...topViewedVideos, ...randomVideos].sort(() => 0.5 - Math.random());
  }

function createVideo(title,url,thumbnail,description,uploadBy){
    const newVideo = {id: videos[videos.length-1].id+1, title : title, url: url, thumbnail: thumbnail, 
        description: description, uploadBy: uploadBy, comments: [], likes: [] ,
        views: Math.floor(Math.random() * (1000000000 - 0 + 1)) + 0}

    videos.push(newVideo)
    return newVideo
}
function deleteVideo(id){
    for (const i in videos) {
        if (videos[i].id==id)
        {
            videos.splice(videos[i],1)
        }
     }
}
function getVideoById(id){
    for (const i in videos) {
        if (videos[i].id==id)
        {
            return videos[i]
        }
     }
    return null
}

function editVideo(newTitle,videoId){
    for (const i in videos) {
        if (videos[i].id==videoId)
        {
            videos[i].title=newTitle
        }
     }
}
function addComment(videoId, userId, comment)
{
    for (const i in videos) {
        if (videos[i].id==videoId)
        {
            videos[i].comments.push({userId,comment} )
        }
     }
}
function editComment(videoId, userId, newComment)
{
    for (const i in videos) {
        if (videos[i].id==videoId)
        {
            for (const j in videos[i].comments)
            {

            }
        }
     }

}
function getVideos(){
    console.log("viiddeeoos: ")
    return videos;
}



export default {
    createVideo,
    getVideoById,
    getCombinedVideoList,
    deleteVideo,
    editVideo,
    addComment,
    getVideos
}