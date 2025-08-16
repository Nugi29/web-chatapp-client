# Web Chat App - Frontend (Client)

A modern, real-time chat application built with React, Vite, and Socket.io. This is the frontend repository for the Web Chat App project.

🔴 **PRIVACY WARNING**: This is a public chat application where all user names are visible to all users. DO NOT use your real name or any personal identifying information as your username. Use a pseudonym or nickname for privacy and security.

## Live Demo

🌐 **Live Application**: [https://web-chatapp-client.vercel.app/](https://web-chatapp-client.vercel.app/)

## Backend Repository

This frontend connects to a separate backend server. You can find the backend repository here:
- **Backend Repository**: https://github.com/Nugi29/web-chatapp-server.git

- The backend handles user authentication, message storage, and real-time communication

## Features

- ✅ Real-time messaging with Socket.io
- ✅ User authentication (Login/Signup)
- ✅ User profiles with avatar upload
- ✅ Responsive design with Tailwind CSS
- ✅ Online/Offline user status
- ✅ Modern UI with smooth animations
- ✅ Hot toast notifications
- ✅ Protected routes

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Socket.io Client** - Real-time communication
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## Environment Setup

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_BACKEND_URL=your_backend_server_url
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatContainer.jsx
│   ├── RightSidebar.jsx
│   └── Sidebar.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── ProfilePage.jsx
├── context/            # React context providers
│   ├── AuthContext.jsx
│   └── ChatContext.jsx
├── lib/               # Utility functions
│   └── util.js
├── assets/            # Static assets
└── App.jsx           # Main app component
```

## Key Components

- **ChatContainer**: Main chat interface
- **Sidebar**: User list and navigation
- **RightSidebar**: User profile/settings
- **AuthContext**: Handles user authentication state
- **ChatContext**: Manages chat-related state

## Deployment

This app is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Configuration Files

- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint rules
- `vercel.json` - Vercel deployment settings
- `tailwind.config.js` - Tailwind CSS configuration

## Security & Privacy

⚠️ **IMPORTANT PRIVACY NOTICE**: 
- This is a public chat application
- All usernames are visible to all users
- DO NOT use your real name
- DO NOT share personal information
- Use pseudonyms or nicknames only


#### Special Thanks For GreatStack Youtube Channel
