# 🎓 Sparkr
Team ID 17 LifeHack
This is a web application built with **Next.js** and **Firebase**. 
Our project is an interactive educational tool designed to enhance remote learning. It features integrated quizzes, real-time video conferencing, and student analytics to help educators track engagement and performance. Built with Next.js and Firebase, the platform supports a seamless and scalable learning experience.

---

## Requirements

- Node.js `>= 16`
- Firebase project (https://console.firebase.google.com/)
- npm

---

## Steps

### 1. Clone the Repository

```
git https://github.com/Prateek2030s/Sparkr.git
```

### 2. Install Dependencies

```
cd my-app
npm install
```

### 3. Environment SetUp

#### - Create a .env.local file in my-app folder
#### - Paste the following code inside

```
# Firebase config (publicly exposed, but only to your app)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCRHNE9POwyfhKm6ervbh-my5O8O7R-xx0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sparkr-a1398.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sparkr-a1398
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sparkr-a1398.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=642489838891
NEXT_PUBLIC_FIREBASE_APP_ID=1:642489838891:web:1c2b3fcbd085044d07696e
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YN393PBH3X

# Liveblocks secret (only available server-side)
LIVEBLOCKS_SECRET=pk_dev_LIy5UrW0710yvyckE3t5GEAvYSswZnfBP-LMQz6QKos8gBYa9T51NAp-iP_GW0BD

# JWT secret
JWT_SECRET=45bc5ee8d610e44c0ee6e15f44a19867
```

### 4. Start Development Server

```
cd my-app
npm run dev
```

