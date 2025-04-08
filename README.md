
## Vehicle Management System (MERN Stack)

A full-stack web application for managing vehicle check-ins, vendors, and products using the MERN stack (MongoDB, Express.js, React.js, Node.js).


## User Authentication

- Login/logout functionality
- Live previews
- Fullscreen mode
- Cross platform

## Vehicle Management

 - Check-in/check-out system
  - Automatic vendor/product association via PO numbers
  - Vehicle status tracking

## Vendor & Product Management

  - CRUD operations for vendors
  - CRUD operations for products
  - Association between vendors and products

## Dashboard
 - Overview of all vehicles
  - Quick access to all management features
    


## Technologies Used

### Frontend
- React.js (Vite)
- Material-UI (MUI)
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js
- CORS



## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas URI)
- Git
### Setup Instructions

1. Clone the repository
   
   git clone https://github.com/Vijay2127/Vehicle_Management
   
2. Backend Setup
- cd backend
- npm install
- cp .env.example .env
### Edit .env with your MongoDB URI and JWT secret
- npm run server

3. Frontend Setup
- cd frontend
- npm run dev
4. Create Admin User
- cd backend
- node createAdmin.js
## Environment Variables

### Backend (.env)
- PORT=5000
- MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vehiclemgmt?retryWrites=true&w=majority
- JWT_SECRET=your_jwt_secret_key

### Frontend (.env)
- VITE_API_BASE_URL=http://localhost:5000/api
## Default Credentials

### Admin User
- Username: admin
- Password: admin123
## API Endpoints


| Endpoint                     | Method | Description               |
|-----------------------------|--------|---------------------------|
| `/api/auth/login`           | POST   | User login                |
| `/api/vehicles`             | GET    | Get all vehicles          |
| `/api/vehicles`             | POST   | Create new vehicle check-in |
| `/api/vehicles/:id/checkout`| PUT    | Check-out vehicle         |
| `/api/vendors`              | GET    | Get all vendors           |
| `/api/vendors`              | POST   | Create new vendor         |
| `/api/vendors/:id`          | PUT    | Update vendor             |
| `/api/products`            | GET    | Get all products          |
| `/api/products`            | POST   | Create new product        |
| `/api/products/:id`        | PUT    | Update product            |







## Screenshots

![Login Page](https://github.com/user-attachments/assets/f8e5a8c3-34b5-4a25-8eac-0aff065063ed)
![Edit Vendor](https://github.com/user-attachments/assets/1c4b4e82-487c-4967-9ab8-348d47755dae)
![Dashboard](https://github.com/user-attachments/assets/94bd6d49-1d81-4e37-b94a-a25275b32fb2)
![Vehicle Check-in](https://github.com/user-attachments/assets/dfd8219b-8cb4-48f0-8eaf-8b1cc126277d)
![Vendors Page](https://github.com/user-attachments/assets/18d4b601-8a72-44f0-b953-bf68d710fcaa)

## Demo

- Click the link below to watch the demo:
[Watch Demo Video](https://github.com/user-attachments/assets/d89bf1f6-7c8a-46ad-9e35-aeb3527c704c)


## Contact



**Vijayakumar M**  
📧 Email: [mvijaykumarpbt@gmail.com](mailto:mvijaykumarpbt@gmail.com)   
🔗 Project Link: [Vehicle Management System](https://github.com/Vijay2127/Vehicle_Management)
