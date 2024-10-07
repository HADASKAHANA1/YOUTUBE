# *Project Wiki*

## *Project Overview*
This project simulates YouTube in both an app and a website. The system allows users to upload, manage, and watch videos, integrating a backend for managing video data and user information.

### *Team Members:*
- Hadas Ben David (Kahana)
- Hodaya Ben Yashar
- Ester Hadas Yanir (Itzhaki)

---

## *Setting Up the Environment*

### *General Prerequisites*
Before setting up, ensure you have the following installed:
- *Node.js*: Download from [nodejs.org](https://nodejs.org).
- *MongoDB*: Download and ensure it is running (MongoDB Compass or local instance).
- *Visual Studio Code* (or another text editor): [VS Code](https://code.visualstudio.com).
- *Android Studio*: Download from [Android Studio](https://developer.android.com/studio).
- *g++ compiler* (for C++ server).

---

### *Node.js and MongoDB Setup (Backend)*

1. *Install MongoDB*
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com).

2. *Clone the Repository*
   - Open the terminal and run:
     bash
     git clone -b WSL https://github.com/HADASKAHANA1/WEB-PROJECT.git
     cd WEB-PROJECT
     cd serverApi
     

3. *Install Dependencies*
   - Run the following command to install necessary dependencies:
     bash
     npm install
     
   - Install mongoose to connect to MongoDB:
     bash
     npm install mongoose
     

4. *Initialize Database*
   - Run the command to seed the database with default data:
     bash
     node addDefaultData.js
     

5. *Additional Setup:*
   - Install uuid package for unique identifiers:
     bash
     npm install uuid
     
   - Create an uploads directory for video uploads:
     bash
     cd public
     mkdir uploads
     cd ..
     

### *Start the Node.js Server*
To start the server that connects to MongoDB, run:
bash
node app.js


---

### *React Frontend Setup*

1. *Navigate to the React project directory:*
   bash
   cd vsc/src
   

2. *Install Dependencies*
   - Run the following command to install React dependencies:
     bash
     npm install
     

3. *Start the React Frontend*
   - Once the dependencies are installed, start the frontend:
     bash
     npm start
     

---

### *C++ Server Setup*

1. *Install WSL (Windows Subsystem for Linux)*
   - Run the following commands:
     bash
     wsl --install
     

2. *Open Visual Studio Code with WSL*
   - Go to the Extensions panel in VS Code and install the *WSL* extension.
   - Open the terminal and connect to WSL:
     bash
     cd serverCpp
     

3. *Compile and Run the C++ Server*
   - Compile the C++ server:
     bash
     g++ server.cpp -o server
     
   - Run the C++ server:
     bash
     ./server
     

---

### *Android App Setup*

1. *Clone the Android Repository*
   - Run the following commands to clone the Android app:
     bash
     git clone https://github.com/Hodayaby/androidpart4.git
     git checkout master
     

2. *Sync Project with Gradle*
   - Open Android Studio and sync the project with Gradle files.

3. *Run the Android App*
   - Set up an emulator (API 30, Android 11.0 ("R")) for better performance. You can create a new emulator in *Tools > Device Manager > Create Device*.
   - Press the green arrow or use the shortcut *Shift + F10* to run the app.

---

## *User Operations*

### *Managing Users (Web and Android))*

1. *Registration and Login (Web and Android)*
   - *Web*: 
     - For *login* click the "SIGN IN" button on the home page.
If you want to *sign up*, click "SIGN UP" on the login page.
Please note that in order to sign up, you must meet the compatibility requirements regarding filling in the details,
   - *Android*: 
     - For *login* click the floating button on the right side (user icon) and proceed to the login screen.  
To *sign up*, click "Don't have an account? Register here" on the login screen, and you will be redirected to the registration page.  
Please note that in order to sign up, you must meet the compatibility requirements regarding filling in the details.

2. *Edit or Delete a User*
   - *Web*: 
     - To edit or delete a user, make sure you are logged in to the account, and in the side menu on the home page, select the appropriate button.
   - *Android*: 
     - To edit or delete a user, make sure you are logged in to the account, click on the profile picture at the top of the home page, and navigate to the user page. There you can edit or delete the user, as well as view the videos you have uploaded.  


### *Managing Videos (Web and Android)*

1. *Create a Video*
   - *Web*: 
     - In the side menu, click the "Upload Video" button and fill in the required fields.
Please note that you must be logged in to upload videos (the same applies for liking and commenting).
   - *Android*: 
     -To upload a video, click the middle floating button (with the plus icon) and fill in the required fields.
Please note that you must be logged in to upload videos (the same applies for liking and commenting).

2. *Edit or Delete a Video*
   - *Web*: 
     - If you want to edit or delete a video, you need to go to the relevant video's viewing page.
Please note that only the user who uploaded the video can edit or delete it.
   - *Android*: 
     - If you want to edit or delete a video, you need to go to the video's viewing page and click the appropriate button.  
Please note that only the user who uploaded the video can edit or delete it.

---

## *Sync Between Android and Web*
There is full synchronization between the Android app and the web platform. Any action performed in one interface will immediately reflect on the other, thanks to the connection established through the Node.js server. This ensures real-time data consistency between both platforms.

---
