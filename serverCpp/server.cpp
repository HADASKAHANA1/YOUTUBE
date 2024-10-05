#include <iostream>
#include <thread>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <map>
#include <set>
#include <vector>
#include <algorithm>

// מפה למיפוי משתמשים לסרטונים
std::map<std::string, std::set<std::string>> user_video_map;
// מפה למיפוי סרטונים למספר צפיות
std::map<std::string, int> video_view_map;


void printVideoViewMap(const std::map<std::string, int>& video_view_map) {
    for (const auto& pair : video_view_map) {
        std::cout << "Video ID: " << pair.first << ", Views: " << pair.second << std::endl;
    }
}

// פונקציה להדפסת כל המידע על המשתמשים והוידאוים שלהם
void print_user_video_map() {
    for (const auto& pair : user_video_map) {
        const std::string& user_id = pair.first; // מזהה המשתמש
        const std::set<std::string>& video_ids = pair.second; // הוידאוים של המשתמש

        // הדפסת מידע על המשתמש
        std::cout << "User " << user_id << " has watched the following videos:" << std::endl;
        for (const auto& video_id : video_ids) {
            std::cout << " - " << video_id << std::endl; // הדפסת מזהה הוידאו
        }
    }
}

std::vector<std::string> get_recommendations(const std::string& user_id) {

    std::set<std::string> watched_videos = user_video_map[user_id];
    std::set<std::string> recommended_videos; // סט חדש להמלצות

    // לולאת קביעת המלצות על בסיס משתמשים שצפו באותם סרטונים
    for (const auto& video : watched_videos) {
        for (const auto& pair : user_video_map) {
            const std::string& other_user = pair.first;
            const std::set<std::string>& other_watched = pair.second;

            // אם משתמשים אחרים צפו גם בסרטון זה
            if (other_user != user_id && other_watched.count(video) > 0) {
                // הוספת כל הסרטונים שצפה בהם המשתמש האחר
                for (const auto& rec_video : other_watched) {
                    // הוספת הסרטון להמלצות (גם אם המשתמש כבר צפה בו)
                    recommended_videos.insert(rec_video); 
                }
            }
        }
    }

  /*  if (recommended_videos.size() > 10) {
        // יש יותר מעשרה סרטונים
    }  */ 


     //המרת הסט לרשימה והחזרת התוצאה
    return std::vector<std::string>(recommended_videos.begin(), recommended_videos.end());


}

void handle_client(int client_sock) {
    char buffer[4096];
    bool response_sent = false; // דגל לבדיקת שליחת תגובה

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

            std::cout << "Received data: [" << data << "]" << std::endl;

            // Reset the response flag for each new message
            response_sent = false;

            if (data.find(":") != std::string::npos) {
                // קריאת צפייה בסרטון - מזהה משתמש, סרטון ומספר צפיות
                std::string user_id, video_id;
                size_t pos1 = data.find(":");
                size_t pos2 = data.find(":", pos1 + 1);
                size_t pos3 = data.find(":", pos2 + 1);

                user_id = data.substr(pos1 + 1, pos2 - pos1 - 1);
                video_id = data.substr(pos2 + 1, pos3 - pos2 - 1);
                int views_count = std::stoi(data.substr(pos3 + 1));

                std::cout << "User ID: " << user_id << std::endl;
                std::cout << "Video ID: " << video_id << std::endl;
                std::cout << "Views Count: " << views_count << std::endl;

                // עדכון הצפייה בסרטון
                user_video_map[user_id].insert(video_id);
                video_view_map[video_id] += views_count;

            } else if (data.find("get_recommendations") != std::string::npos) {
                // בקשה להמלצות
                std::string user_id = data.substr(data.find(",") + 1);
                std::vector<std::string> recommendations = get_recommendations(user_id);

                if (!response_sent) { // בדוק אם התגובה נשלחה
                    if (recommendations.empty()) {
                        std::string response = "empty";
                        send(client_sock, response.c_str(), response.length(), 0);
                    } else {
                        // בניית תגובה בפורמט טקסטואלי
                        std::string response = "recommended_videos:";
                        for (size_t i = 0; i < recommendations.size(); ++i) {
                            response += recommendations[i];
                            if (i < recommendations.size() - 1) {
                                response += ",";
                            }
                        }
                        // שליחת התגובה ללקוח
                        send(client_sock, response.c_str(), response.length(), 0);
                    }
                    response_sent = true; // קובעים שהתגובה נשלחה
                }

            } else {
                // קריאת Login - מזהה משתמש בלבד
                std::string user_id = data;
                std::cout << "User " << user_id << " logged in." << std::endl;

                // יצירת thread או הכנה אחרת עבור המשתמש (אם יש צורך)
                if (user_video_map.find(user_id) == user_video_map.end()) {
                    user_video_map[user_id] = std::set<std::string>();
                }

                // שליחת אישור בפורמט JSON
                if (!response_sent) {
                    std::string response = "{\"status\": \"User logged in successfully.\"}";
                    send(client_sock, response.c_str(), response.length(), 0);
                    response_sent = true; // קובעים שהתגובה נשלחה
                }
            }
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