#include <iostream>
#include <thread>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <map>
#include <set>

// מפה למיפוי משתמשים לסרטונים
std::map<std::string, std::set<std::string>> user_video_map;

void handle_client(int client_sock) {
    char buffer[4096];
    while (true) {
        int expected_data_len = sizeof(buffer);
        int read_bytes = recv(client_sock, buffer, expected_data_len, 0);
       
        if (read_bytes == 0) {
            std::cout << "Client disconnected" << std::endl;
            break;
        } else if (read_bytes < 0) {
            perror("Error reading from client");
            break;
        } else {
            buffer[read_bytes] = '\0';
            std::string data = buffer;

            // בדיקה אם מדובר בקריאת Login או קריאת צפייה בסרטון
            if (data.find(",") == std::string::npos) {
                // קריאת Login - מזהה משתמש בלבד
                std::string user_id = data;
                std::cout << "User " << user_id << " logged in." << std::endl;

                // יצירת thread או הכנה אחרת עבור המשתמש (אם יש צורך)
                if (user_video_map.find(user_id) == user_video_map.end()) {
                    user_video_map[user_id] = std::set<std::string>();
                    std::cout << "User " << user_id << " added to the map." << std::endl;
                }

            } else {
                // קריאת צפייה בסרטון - מזהה משתמש וסרטון
                std::string user_id, video_id;
                size_t pos = data.find(",");
                user_id = data.substr(0, pos);
                video_id = data.substr(pos + 1);

                // עדכון הצפייה בסרטון
                if (user_video_map.find(user_id) == user_video_map.end()) {
                    user_video_map[user_id] = std::set<std::string>();  // יצירת רשימה עבור המשתמש אם אין
                }
                user_video_map[user_id].insert(video_id);  // הוספת הסרטון לסט של המשתמש
                std::cout << "User " << user_id << " watched video " << video_id << "." << std::endl;
            }

            // שליחת אישור שהבקשה התקבלה
            std::string response = "Request processed for user.";
            send(client_sock, response.c_str(), response.length(), 0);
        }
    }

    // סגירת החיבור
    close(client_sock);
}

int main() {
    const int server_port = 5555;

    // יצירת סוקט לשרת
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Error creating socket");
        return 1;
    }

    // הגדרת כתובת ה-IP והפורט לשרת
    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    // קישור הסוקט לכתובת ולפורט
    if (bind(sock, (struct sockaddr*)&sin, sizeof(sin)) < 0) {
        perror("Error binding socket");
        close(sock);
        return 1;
    }

    // האזנה לכניסת חיבורים מלקוחות
    if (listen(sock, 5) < 0) {
        perror("Error listening to a socket");
        close(sock);
        return 1;
    }

    std::cout << "Server is listening on port " << server_port << std::endl;

    // לולאה לטיפול בלקוחות חדשים
    while (true) {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);

        // קבלת חיבור חדש מלקוח
        int client_sock = accept(sock, (struct sockaddr*)&client_sin, &addr_len);
        if (client_sock < 0) {
            perror("Error accepting client");
            continue;
        }

        std::cout << "New client connected" << std::endl;

        // יצירת thread חדש עבור הלקוח
        std::thread client_thread(handle_client, client_sock);
        client_thread.detach();  // לאפשר ל-thread לפעול בצורה עצמאית
    }

    // סגירת הסוקט של השרת
    close(sock);
    return 0;
}