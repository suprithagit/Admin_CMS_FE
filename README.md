# 🧩 Petricular — Admin CMS

🛠️ A lightweight, modern, and scalable admin panel for managing the Petricular Portfolio, built using Next.js and Tailwind CSS.

## 🌐 Live App

https://admportcms.netlify.app/

## 📌 Overview

Petricular Admin CMS provides a clean and intuitive interface to manage portfolio content such as profile details, projects, blogs, skills, services, testimonials, media uploads, and contact messages. It is designed with production-ready architecture, secure authentication, and a responsive UI suitable for real-world use.

## ✨ Key Features

- 🧑‍💼 Manage About, Skills, Projects, Testimonials, Media, and Messages
- 🔐 Secure authentication using access and refresh tokens
- 💾 Token handling with localStorage
- 📤 Media and file upload support
- 🧩 Modular and reusable UI components
- 🔔 Toast notifications using react-toastify

## 🧰 Tech Stack

- ⚛️ Next.js
- ⚛️ React
- 🎨 Tailwind CSS
- 🔗 Axios
- 📝 react-hook-form
- 🔄 react-query
- 🗂️ zustand
- 🔔 react-toastify

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm / yarn / pnpm
- Backend API service running

## 🚀 Installation

Clone the repository and install dependencies.

```bash
git clone <repository-url> petricular-admin
cd petricular-admin
npm install
```

## 🔐 Environment Configuration

After completing the installation, configure the environment variables required for backend communication.

Create a `.env.local` file in the project root and add the following value:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Ensure the backend API is running and accessible at the configured URL.  
Restart the development server whenever environment variables are updated.

## 📜 Available Scripts

- npm run dev — Start development server
- npm run build — Build for production
- npm run start — Start production server
- npm run lint — Run lint checks

## ▶️ Running the Application Locally

```bash
npm run dev
```

Open http://localhost:3000

## 🗂️ Project Structure

- src/pages — Next.js routes
- src/components — Reusable UI components
- src/lib/apiClient.js — Axios client with token refresh
- src/lib/api.js — API wrappers
- src/context/authStore.js — Authentication store

## 🔑 Authentication

Uses access & refresh tokens stored in localStorage with automatic refresh handling.

## 🧑‍💻 Default Admin Login

- Email: admin@example.com
- Password: Create via backend

## 🧩 Admin Features

- 🔐 Authentication
- 📊 Dashboard
- 📝 Skills, Projects, Blogs management
- 🧾 Services & Testimonials
- 📬 Messages handling
- 🖼️ Media uploads
- 👤 Profile & About management

## ☁️ Deployment

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_API_URL` in hosting provider settings.

## 👩‍💻 Author

Supritha RP  


## 📸 Screenshots

<img width="1678" height="810" alt="image" src="https://github.com/user-attachments/assets/d974ba2c-3f28-4bf1-be1c-31622c3fb82b" />

<img width="1814" height="808" alt="image" src="https://github.com/user-attachments/assets/93b07f69-d604-435e-89e4-ddf997a2f29a" />

<img width="1903" height="711" alt="image" src="https://github.com/user-attachments/assets/39b8fa07-5380-45cd-b37c-1ce28988c162" />

<img width="1906" height="768" alt="image" src="https://github.com/user-attachments/assets/ef33b27f-ebb5-4d67-8c56-a65957094ef9" />

<img width="1906" height="817" alt="image" src="https://github.com/user-attachments/assets/561f49b0-e131-4869-8f54-0427e0cf44e4" />


