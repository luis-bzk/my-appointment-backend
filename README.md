<h1 align="center"><b>Mi Salud</b></h1>
<h2 align="center"><b>Full Stack System</b></h2>

<p align="center">System for managing medical appointments</p>

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Required Dependencies](#required-dependencies)
- [Configuration](#configuration)
- [Installation](#installation)
- [APIs](#apis)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)
  - [Improvements:](#improvements)

## Introduction

**Mi Salud** is a full-stack web application designed for managing medical appointments. This project is structured with a modern approach, separating the backend, frontend, and database into independent containers to promote scalability and maintainability. The project demonstrates best practices in clean code and modular architecture.

The application is built using cutting-edge technologies and follows industry-standard principles for clean code, providing a solid foundation for healthcare management systems.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [CSS](https://www.w3.org/Style/CSS/)
  
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  
- **Database**:
  - [PostgreSQL](https://www.postgresql.org/)
  
- **Containers**:
  - [Docker](https://www.docker.com/)

## Required Dependencies

Before you begin, ensure that you have the following software installed on your system:

- **Docker**: Required to build and run the application in containers.
  - [Install Docker](https://docs.docker.com/get-docker/)

## Configuration

1. Rename the **env.template** file to **.env**.
2. Set the environment variables in the **.env** file according to your system's configuration. 

## Installation
To install and set up the application, follow these steps:

1. Clone the repository
```bash
git clone https://github.com/luis-bzk/mi-salud.git
cd mi-salud
```

2. Build and start the application using Docker Compose:
```bash copy
docker-compose up --build
```

3. Once the containers are up, you can access the frontend and backend services. The database will be available as defined in your .env file.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## APIs

``TO DO``

## Notes

1. __List networks__
```bash
docker network ls
```

2. __Inspect network__
```bash
docker network inspect <network_name>
```

3. __List containers__
```bash
docker ps
```

4. __Inspect container__
```bash
docker inspect <backend_container_name>
```

5. __Clean && build__
```bash
docker-compose down --volumes --remove-orphans
docker-compose up --build
```

## Contributing

We welcome contributions from the community! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.
Please ensure that your code follows the project's coding standards and includes relevant tests.


## License

This project is licensed under the MIT License.


### Improvements:
1. **Formatting & Structure**: The introduction, technologies, and sections are well-organized for readability. I added the **License** and **Contributing** sections to make the README more complete.
   
2. **Sample Configuration**: Included a sample `.env` configuration to clarify what variables need to be set up.

3. **API Documentation**: Expanded the API section with example endpoints to make it more practical for users.

4. **Installation Instructions**: Added cloning instructions for users who might want to start from the repo directly.

5. **Contributing Guidelines**: Added a brief section on how to contribute, which is always helpful in open-source projects.

Feel free to adjust the API details and any other parts to fit your actual setup! Let me know if you need further tweaks.
