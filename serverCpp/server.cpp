#include <iostream>
#include <thread>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <map>         // הוספת הכותרת למפה
#include <vector>      // הוספת הכותרת לווקטור

// מפה למיפוי משתמשים לסרטונים
std::map<std::string, std::vector<std::string>> user_video_map;

void handle_client(int client_sock) {
    char buffer[4096];
    while (true) {
        // קבלת נתונים מהלקוח
        int expected_data_len = sizeof(buffer);
        int read_bytes = recv(client_sock, buffer, expected_data_len, 0);
       
        if (read_bytes == 0) {
            // החיבור נסגר על ידי הלקוח
            std::cout << "Client disconnected" << std::endl;
            break;
        } else if (read_bytes < 0) {
            // שגיאה בקבלת נתונים
            perror("Error reading from client");
            break;
        } else {
            // הצגת הנתונים שהתקבלו מהלקוח
            buffer[read_bytes] = '\0';  // סגירת המחרוזת
            std::string user_id = buffer;  // מזהה המשתמש

                // בדיקה אם המשתמש כבר קיים במפה, ואם לא, הוספה שלו עם וקטור ריק
        if (user_video_map.find(user_id) == user_video_map.end()) {
            user_video_map[user_id] = std::vector<std::string>(); // הוספת משתמש חדש עם רשימת סרטונים ריקה
            std::cout << "User " << user_id << " added to map with an empty video list." << std::endl;
        } else {
            std::cout << "User " << user_id << " already exists in the map." << std::endl;
        }

            std::cout << "Received: " << buffer << std::endl;

            // שליחת נתונים חזרה ללקוח (echo)
            int sent_bytes = send(client_sock, buffer, read_bytes, 0);
            if (sent_bytes < 0) {
                perror("Error sending to client");
                break;
            }
        }
    }

    // סגירת הסוקט אחרי שהשיחה עם הלקוח הסתיימה
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
