# part 4
### the Android for this part is in this repository: *https://github.com/Hodayaby/androidpart4.git*
### the rest of the code is in this repository..

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

## our team work:
We faced challenges with different and busy schedules, which required us to carefully coordinate our work.
Additionally, organizing and maintaining order in our project was essential.
Effective teamwork and regular communication helped us overcome these obstacles and keep the project on track.




