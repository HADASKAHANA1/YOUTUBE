import mongoose from 'mongoose';
import User from './models/users.js'; // 
import Video from './models/video.js'; // 

const defaultUser = {
    id: 0,
    username: "Sinai Cohen",
    password: '12345ee!',
    profilePicture: '/thumbnails/4.png',
    videos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
};

const defaultVideos = [  { id: 1, title: 'Video 1', url: '/videos/video1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:0},
{ id: 2, title: 'Video 2', url: '/videos/video2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'Sinai Cohen',authorId: 0, comments: [], likes: [] ,views:892},
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

const addDefaultDataToMongo = async () => {
    try {
        // התחבר למסד הנתונים של MongoDB
        await mongoose.connect('mongodb://localhost:27017/youtube', { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        // הוסף את המשתמש הדיפולטי למסד הנתונים
        const newUser = new User(defaultUser);
        await newUser.save();
        console.log('Default user added to MongoDB');

        // הוסף את הווידאוים הדיפולטיים למסד הנתונים
        await Video.insertMany(defaultVideos);
        console.log('Default videos added to MongoDB');

        // נתק את החיבור למסד הנתונים
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding default data to MongoDB:', error);
        mongoose.connection.close();
    }
};

// קריאה לפונקציה
addDefaultDataToMongo();
