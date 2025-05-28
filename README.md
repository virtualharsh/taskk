<h1 align="center">Taskk 📝 </h1>
<p align="center">
  <i>A Notion-style minimalistic productivity web app built with MERN stack and shadcn/ui</i>
</p>

<p align="center">
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGVvbngyOXAwMHQwZ2dmbDczcGZxb3d0Z3MwcDI4bTdsMTBtbzluYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mCRJDo24UvJMA/giphy.gif" width="200" alt="Typing gif" />

</p>

<p align="center">
  <a href="https://taskk-1-16pw.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Try_Taskk_Live-%F0%9F%9A%80-blueviolet?style=for-the-badge&logo=chrome&logoColor=white" width="150" />
  </a>
</p>

---

## 🧩 Project Structure
`taskk/` <br>
&nbsp;&nbsp;&nbsp;├─ `client/` <br>
&nbsp;&nbsp;&nbsp;├─ `server/` <br>
&nbsp;&nbsp;&nbsp;├─ .gitignore <br>

---

## 🚀 Tech Stack

- ⚛️ **Frontend**: `React` + `Vite` + `Tailwind CSS` + `shadcn/ui`
- 🛠️ **Backend**: `Node.js` + `Express` + `MongoDB`
- 🔐 **Auth**: `JWT` + `Bcrypt` + `Nodemailer`
- 🧪 **Testing & Dev Tools**: `Postman`, `VS Code`, `ESLint`, `Prettier`
- ✈️ **Deployment**: `Render`

---

## Setup📋 - clone the repository
> git clone https://github.com/virtualharsh/taskk

<hr>

## 📁 Environment Variables

### > 🔒 `server/.env` 

```env
PORT = your_port
EMAIL_USER = your_email
EMAIL_PASS = your-app-password
BASE_URL = https://taskk-dslm.onrender.com
JWT_SECRET = your_JWT_SECKET_KEY
NODE_ENV=production
MONGODB_URI = YOUR_MONGODB_URL
```

### > 🔒 `client/.env`

```env
VITE_API_URL= BACKEND_URL + '/api'
VITE_SERVER= BACKEND_URL
```

<hr>

## 🚗 Execute the `server`
```
 cd server
 npm install 
 npm test
```

## 🚗 Execute the `client`
```
 cd server
 npm install 
 npm run dev
```

---

## ✨ Features

- 📝 Create, edit, and delete tasks/notes
- ✅ Simple and elegant Notion-style UI with `shadcn/ui`
- 🔐 Secure authentication with JWT
- 📩 Email-based registration and password reset using Nodemailer
- 📦 Modular folder structure with separate frontend and backend
- 🌈 Styled using `TailwindCSS` + pre-built shadcn components
- 📁 Environment-based configurations for scalable deployment

---

## 🔧 Best Practices Followed

- 📦 Environment Variables: Sensitive values are stored in .env files
- 🧠 Separation of Concerns: Client and server are in separate folders
- 🧼 Code Quality: ESLint and Prettier ensure consistent formatting
- 🔐 Security: JWTs are used for auth, Bcrypt for password hashing
- 🛠 Modularity: Routes, controllers, configs, and components are structured cleanly
- 🧪 API Testing: Postman used for backend endpoint testing
- 🔄 Reusable UI: shadcn/ui components are customized for reuse
- 🚫 Ignored Files: .gitignore used to exclude node_modules, .env, etc.

<br><br>
<p align="center"> <b>Crafted with care 💝</b><br> 
<a href="https://github.com/virtualharsh/taskk">⭐ Star this repo</a> if you like it! </p>