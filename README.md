# DevConnect

Welcome to **DevConnect** — a modern developer collaboration platform where engineers can showcase projects, explore profiles, and network with like-minded developers. It’s built with the MERN stack, offering a clean UI and seamless auth.

---

## 🚀 Features


### 🔐 Authentication (JWT-based)
- Signup/Login Forms on frontend
- **Backend routes**:

  ```
  POST /api/v1/auth/register

  POST /api/v1/auth/login
  ```

- JWT token stored in localStorage 

- Protected routes

- Middleware to validate JWT in backend

### 🧑 User Profile
- Form to fill profile:

  - Name, Email, Bio, Skills, Avatar

- **Backend routes**:

  ```
  GET /api/v1/users/me

  PUT /api/v1/users/me (update profile)
  ```

- **Frontend pages**:

  - Private profile edit

### 📁 Project Posting

- Create Project Form (title, description, live demo link, source code link)

- **Backend routes**:

  ```
  POST /api/v1/projects

  GET /api/v1/projects

  GET /api/v1/projects/:id
  ```

- Each project linked to a user

- View project list and individual project page

### 📋 Feedback System (Comments)
- Comment box below each project

- **Backend routes**:

  ```
  POST /api/v1/projects/:id/comments

  GET /api/v1/projects/:id/comments

  ```

- Show list of comments with user name, comment, timestamp

### 🔍 Search Feature
- Search bar (by username or project title)

- Backend route with query param: 

  ```
  GET /api/v1/search?query=
  ```

- Show users or projects matching search

### ✅ MVP Feature List

| Feature                | Status |
| ---------------------- | ------ |
| Signup/Login           | ✅      |
| JWT Auth Middleware    | ✅      |
| Profile Creation       | ✅      |
| Project Posting        | ✅      |
| View Projects          | ✅      |
| Add Feedback (Comment) | ✅      |
| Search Users/Projects  | ✅      |
| Responsive UI          | ✅      |

  
---

## 🔧 Tech Stack

Here’s what powers this project:

### 🖥️ Frontend
- **React (Vite)**
- **React Router**
- **Tailwind CSS**
- **Axios**
- **React Toastify**

### 🗄️ Backend
- **Node.js + Express** 
- **MongoDB** 
- **Mongoose** 
- **JWT** 
- **bcrypt**

---

## 🚀 Getting Started

To run the client locally:

```bash
# Clone the client repo
git clone https://github.com/SherlockValer/DevConnect.git
cd DevConnect

# Install dependencies
npm install

# Environment Setup
# Create a `.env` file with the backend URL:
VITE_API_URL=https://dev-connect-api-flax.vercel.app/api/v1

# Start the dev server
npm run dev
```

To run the server locally :
```bash
# Clone the backend repo
git clone https://github.com/SherlockValer/DevConnect-API.git
cd DevConnect-API

# Install dependencies
npm install

# Environment Setup
# Create a `.env` file:
MONGO_URI=
JWT_SECRET=
PORT=5001
CLIENT_URL=

# Start the dev server
npm run dev
```


🔗 [DevConnect Backend GitHub Repo](https://github.com/SherlockValer/DevConnect-API)

---

## 📸 Try it Out

Live demo available here:  
👉 [https://dev-connect-v1.vercel.app/](https://dev-connect-v1.vercel.app/)

### Login 
```
email : aarav@example.com
password : hashedpassword1

email : sneha@example.com
password : hashedpassword2
```

---

## 🤝 Contributions

Have suggestions or found bugs?  
Create an issue, send a PR, or connect with me!

---

## 👋 About the Creator

Hey! I’m **Vaibhav Chopde**, a full-stack developer focused on building fast, scalable, and clean web applications.

- 🌐 Portfolio: [vaibhav-chopde-pvla.vercel.app](https://vaibhav-chopde-pvla.vercel.app/)
- 🧑‍💻 GitHub: [@SherlockValer](https://github.com/SherlockValer)

---

Thanks for checking out **DevConnect**. I hope it helps your team work better, together! 🚀
