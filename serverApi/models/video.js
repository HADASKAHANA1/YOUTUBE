

const videos = [  { id: 1, title: 'Video 1', url: '/videos/video1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:0},
{ id: 2, title: 'Video 2', url: '/videos/video2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [{"id":0,"user": "Alice","text": "Great video!"}], likes: [] ,views:892},
{ id: 3, title: 'Video 3', url: '/videos/video3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:46},
{ id: 4, title: 'Video 4', url: '/videos/video4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:998},
{ id: 5, title: 'Video 5', url: '/videos/video5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:34},
{ id: 6, title: 'Video 6', url: '/videos/video6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:10000},
{ id: 7, title: 'Video 7', url: '/videos/video7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:1345},
{ id: 8, title: 'Video 8', url: '/videos/video8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:666},
{ id: 9, title: 'Video 9', url: '/videos/video9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:40},
{ id: 10, title: 'Video 10', url: '/videos/video10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:110},
{ id: 11, title: 'יאלה לך הביתה גורדי', url: '/videos/videoplayback.mp4', thumbnail: '/thumbnails/לךהביתהגורדי.png', description: 'Description for Video 11', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:2140},
{ id: 12, title: 'מילקי-ברוכים המתפנקים', url: '/videos/bruchim.mp4', thumbnail: '/thumbnails/ברוכיםהמתפנקים.png', description: 'Description for Video 12', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:980},
{ id: 13, title: 'מילקי-מי צריך את זה', url: '/videos/mizaric.mp4', thumbnail: '/thumbnails/מיצריךאתזה.png', description: 'Description for Video 13', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:118},
{ id: 14, title: 'משהו טוב קורה באל על! עם מטוסי הדריימלינר המתקדמים ,חוויית טיסה 5  כוכבים ושעות הטיסה הכי נוחות.', url: '/videos/elal.mp4', thumbnail: '/thumbnails/פרסומתאלעל.png', description: 'Description for Video 14', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:10},
{ id: 15, title: 'מילקי קלאסי', url: '/videos/klasi.mp4', thumbnail: '/thumbnails/מילקיקלאסי.png', description: 'Description for Video 15', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:1166},
{ id: 16, title: 'ניר וגלי דואר ישראל -My Post', url: '/videos/israelpost.mp4', thumbnail: '/thumbnails/נירוגלידוארישראל.png', description: 'Description for Video 16', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:50},
{ id: 17, title: 'ניר וגלי דואר ישראל-תור בקליק', url: '/videos/klik.mp4', thumbnail: '/thumbnails/תורבקליל.png', description: 'Description for Video 17', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:11077},
{ id: 18, title: 'פיספוסי צ׳ילי', url: '/videos/fisfus.mp4', thumbnail: '/thumbnails/פספוסיצילי.png', description: 'Description for Video 18', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:12},
{ id: 19, title: 'פתחנו מסעדה בשמיים וכולם מוזמנים למטוס ולטעום', url: '/videos/misada.mp4', thumbnail: '/thumbnails/מסעדהבשמיים.png', description: 'Description for Video 19', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:1610},
{ id: 20, title: 'מילקי צהריים טובים_ - פס קול', url: '/videos/kol.mp4', thumbnail: '/thumbnails/צהריםטוביםמילקי.png', description: 'Description for Video 20', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:187},
]




function addComment(videoId, user, text) {
    for (const i in videos) {
        if (videos[i].id == videoId) {
            var curvideo = videos[i];

            // ודא שהמערך comments קיים, ואם לא - צור אותו
            if (!curvideo.comments) {
                curvideo.comments = [];
            }

            // חישוב commentid: אם המערך ריק, התחל ב-1, אחרת הוסף 1 ל-id של התגובה האחרונה
            const commentid = curvideo.comments.length > 0 
                ? curvideo.comments[curvideo.comments.length - 1].id + 1 
                : 0;
            

            // הוסף את התגובה למערך
            curvideo.comments.push({ id: commentid, user: user, text: text });

            return 1; // הצלחה
        }
    }
    return 0; // לא נמצא וידאו מתאים
}
function editComment(videoId,commentId,newComment)
{
    console.log("1")
    for ( const video of videos){
        if(video.id==parseInt(videoId)){
            console.log("3")
            for(const comment of video.comments){
                console.log(comment.id,commentId)
                if(parseInt(comment.id)==parseInt(commentId)){
                    console.log("5")
                    comment.text=newComment
                    return 1
                }
            }
        }
    }
    return 0

    
}
function deleteComment(videoId,commentId)
{
    for ( const video of videos){
        if(video.id==parseInt(videoId)){
            for(const j in video.comments){
                if(parseInt(video.comments[j].id)==parseInt(commentId)){
                    video.comments.splice(j,1)
                    return 1
                }
            }
        }
    }
    return 0

    
}


function getCombinedVideoList() {
    // // פונקציה למיון הסרטונים לפי צפיות
    // const getTopViewedVideos = (videos, count) => {
    //   return videos.slice().sort((a, b) => b.views - a.views).slice(0, count);
    // };
  
    // // פונקציה לבחירת סרטונים באקראי
    // const getRandomVideos = (videos, count) => {
    //   const shuffled = videos.slice().sort(() => 0.5 - Math.random());
    //   return shuffled.slice(0, count);
    // };

    // מציאת 10 הסרטונים הנצפים ביותר
    const topViewedVideos = videos.slice().sort((a, b) => b.views - a.views).slice(0, 10);
    
    // מציאת 10 סרטונים אקראיים מתוך הסרטונים שנותרו
    const remainingVideos = videos.filter(video => !topViewedVideos.includes(video));
    const shuffled = remainingVideos.slice().sort(() => 0.5 - Math.random());
    const randomVideos = shuffled.slice(0, 10);
    // שילוב שתי הרשימות וסידורן באקראי
    return [...topViewedVideos, ...randomVideos].sort(() => 0.5 - Math.random());
  }

function createVideo(title,url,thumbnail,description,uploadBy,idUser){
    const videoid =parseInt(videos[videos.length-1].id) 
    const newVideo = {id: videoid+1, title : title, url: url, thumbnail: thumbnail, 
        description: description, uploadedBy: uploadBy,idUser: idUser, comments: [], likes: [] ,
        views: Math.floor(Math.random() * (1000000000 - 0 + 1)) + 0}

    videos.push(newVideo)
    return newVideo
}
function deleteVideo(id){
    for (const i in videos) {
        if (videos[i].id==id)
        {
            videos.splice(i,1)
            return 1
        }
     }
     return 404 //video isnt exist
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

function editVideo(newTitle,videoId,newThumbnail, newVideo, newDescription){
    for (const i in videos) {
        if (videos[i].id==videoId)
        {
            videos[i].title=newTitle
            videos[i].description=newDescription
            videos[i].thumbnail=newThumbnail
            videos[i].url=newVideo
            return 1
        }
     }
     return 0
}


function getVideos(){
    return videos;
}



export default {
    createVideo,
    getVideoById,
    getCombinedVideoList,
    deleteVideo,
    editVideo,
    addComment,
    getVideos,
    editComment,
    deleteComment
}