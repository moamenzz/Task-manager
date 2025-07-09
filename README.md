# Spotify Clone

<div align="center">
<img src="/client/assets/readme-cover.png" alt="Demo Screenshot">
  
  <!-- Tech Stack -->
  
  <div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
    <img src="https://img.shields.io/badge/ShadCN-FACC15?style=for-the-badge&logo=radixui&logoColor=black" alt="shadcn" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
    <img src="https://img.shields.io/badge/Zod-EF4444?style=for-the-badge&logo=zod&logoColor=white" alt="zod" />
  </div>
</div>

<br />
<br />

[![Status](https://img.shields.io/badge/Status-complete-green)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey)]()
[![Live Demo](https://img.shields.io/badge/Live-Demo-orange)](https://taskify319.vercel.app)

---

## 📖 Description

Taskify is a modern task management application that helps users stay organized and productive. Users can create, update, and categorize tasks, track their progress, and manage deadlines through a clean and intuitive interface.

Whether you're planning daily to-dos or managing larger projects, Taskify provides a simple yet powerful way to stay on top of your responsibilities and boost your personal productivity.

---

## 🚀 Features

- 🔒 Authentication & OAuth
- 📦 Task Management
- 🌐 Fully responsive UI
- ⚙️ Deployment via Render + Vercel

---

## 🔧 Technologies Used

| Frontend | Backend              | Database           | Other                  |
| -------- | -------------------- | ------------------ | ---------------------- |
| React    | Node.js (Express.js) | MongoDB (Mongoose) | JWT, Axios, Vite, etc. |

---

## 🖥️ Live Demo

🌐 [Click here to view the app](https://taskify319.vercel.app)

---

## 🧪 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/moamenzz/Task-manager.git

# Navigate to project folder
cd Task-manager

# Install dependencies for both frontend and backend
cd client && npm install
cd ../server && npm install

# Add .env files in both folders as per .env.example

# Run the project
npm run dev
```

## 🤫 .env.example

client .env:

```
CLOUDINARY_API_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_BACKEND_API=
VITE_GITHUB_OAUTH_URL=
VITE_GOOGLE_OAUTH_URL=
VITE_SENTRY_DSN=
```

server .env:

```
NODE_ENV=
APPLICATION_NAME=
CLIENT_URL=
PORT=
MONGODB_URI=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
RESEND_SECRET=
SENDER_DOMAIN=
SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


```

# ©️ Credits

The architecture of this application was completely made by me but the entire UI/Design was inspired by The Code Dealer on YouTube
