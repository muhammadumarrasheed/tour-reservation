
# 🌍 Tour Reservation System

Welcome to the **Tour Reservation System**, a comprehensive Spring Boot application for managing tour reservations. This project features both **Admin** and **Guest** views with a dynamic user interface and CRUD operations. The application uses **H2 Database** for in-memory storage and **Spring Boot** for RESTful API services.

## 📂 Project Structure

```plaintext
tour-reservation/
├── .gitignore
├── pom.xml
├── README.md
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── tour/
│   │   │       ├── controller/
│   │   │       ├── model/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── TourApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── data.sql
│   │       ├── schema.sql
│   │       └── static/
│   │           ├── css/
│   │           ├── admin/
│   │           │   ├── admin.js
│   │           │   ├── index.html
│   │           │   ├── reservation.js
│   │           │   ├── reservations.html
│   │           │   └── tours.html
│   │           ├── guest.js
│   │           ├── index.html
│   │           ├── reservation.js
│   │           ├── reservations.html
│   │           └── tours.html
└── test/
    └── java/
        └── tour/
```

## ⚙️ Prerequisites

- **Java JDK 17** or higher
- **Maven**
- **Git**

## 🚀 How to Run the Application

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/muhammadumarrasheed/tour-reservation.git
cd tour-reservation
```

### 2️⃣ Build the Project with Maven

```bash
mvn clean install
```

### 3️⃣ Run the Spring Boot Application

```bash
mvn spring-boot:run
```

Alternatively, you can run the application using the compiled JAR file:

```bash
java -jar target/tour-reservation-1.0-SNAPSHOT.jar
```

### 4️⃣ Access the Application

- **Admin Interface:** [http://localhost:8080/admin/index.html](http://localhost:8080/admin/index.html)
- **Guest Interface:** [http://localhost:8080/index.html](http://localhost:8080/index.html)

### 5️⃣ H2 Database Console

You can access the H2 database console at: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

- **JDBC URL:** `jdbc:h2:mem:testdb`
- **Username:** `sa`
- **Password:** `password`

## 🗂️ Configuration

### application.properties

```properties
# ===============================
# Server Configuration
# ===============================
server.port=8080

# ===============================
# H2 Database Configuration
# ===============================
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# ===============================
# JPA and Hibernate Configuration
# ===============================
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# ===============================
# DevTools Configuration
# ===============================
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
```

## 📜 Features

### Guest View

- **List Available Tours:** View a list of all tours with descriptions, prices, and capacities.
- **Reserve a Tour:** Reserve a spot on a tour.
- **View Reservations:** View all reservations made by the guest.
- **Cancel Reservation:** Cancel an existing reservation.

### Admin View

- **Manage Tours:** Create, edit, and delete tours.
- **Manage Reservations:** View, search, and cancel reservations.

## 📦 API Endpoints

### Tours

- **GET /api/tours**: Retrieve all tours
- **GET /api/tours/{id}**: Retrieve a specific tour by ID
- **POST /api/tours**: Create a new tour
- **PUT /api/tours/{id}**: Update an existing tour
- **DELETE /api/tours/{id}**: Delete a tour

### Reservations

- **GET /api/reservations/guest/{guestReference}**: Retrieve reservations by guest reference
- **GET /api/reservations/tour/{tourId}**: Retrieve reservations by tour ID
- **POST /api/reservations**: Create a new reservation
- **DELETE /api/reservations/{id}**: Cancel a reservation

## 💡 Tips for Development

- Enable **Spring Boot DevTools** for live reloads during development.
- Use the **H2 Database Console** to inspect and debug the data.

## 🛠️ Troubleshooting

- If you encounter errors while running the application, make sure the required dependencies are installed and up to date.
- If the H2 console is not accessible, verify the `spring.h2.console.enabled` property in `application.properties`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Feel free to fork this repository and make your own contributions. Please follow the **conventional commit** guidelines and submit a pull request for review.

## 📞 Support

For any issues or questions, please contact me at:

- **GitHub:** [muhammadumarrasheed](https://github.com/muhammadumarrasheed)
- **portfolio:** muhammadumarsipra.com

---

**Developed with 💻 by Muhammad Umar Rasheed**

![Uploading image.png…]()
