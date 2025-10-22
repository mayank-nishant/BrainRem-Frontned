# BrainRem Frontend

A modern, responsive React application for organizing and sharing learning content. Built with React, TypeScript, Tailwind CSS, and integrated with a Node.js backend.

## 🚀 Features

- **User Authentication**: Secure signup and signin with JWT tokens
- **Content Management**: Add, organize, and manage YouTube and Twitter content
- **Responsive Design**: Beautiful, mobile-first UI that works on all devices
- **Content Sharing**: Generate shareable links for your knowledge collections
- **Real-time Updates**: Automatic content refresh and live updates
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4.x
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Custom SVG components
- **Backend**: Node.js/Express (deployed on Render)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mayank-nishant/BrainRem-Frontend.git
cd BrainRem-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Features Overview

### Authentication
- Secure user registration and login
- JWT token-based authentication
- Automatic token validation and redirects

### Dashboard
- Clean, organized content grid
- Filter content by type (All, YouTube, Twitter)
- Add new content with a beautiful modal
- Share your entire collection with one click

### Content Management
- Add YouTube videos and Twitter posts
- Automatic content embedding
- Real-time content updates
- Responsive card-based layout

### Sharing
- Generate shareable links for your collections
- Public sharing pages for external access
- Mobile-optimized sharing interface

## 🎨 Design System

The application follows modern design principles:

- **Color Palette**: Purple and blue gradients with clean grays
- **Typography**: Inter font family for excellent readability
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible UI components
- **Animations**: Subtle hover effects and smooth transitions
- **Responsive**: Mobile-first design with breakpoints

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

## 🌐 Backend Integration

The frontend connects to a deployed backend API:

- **Base URL**: `https://brainrem-backend.onrender.com`
- **Authentication**: JWT token-based
- **Endpoints**: 
  - `/api/v1/signup` - User registration
  - `/api/v1/signin` - User login
  - `/api/v1/content` - Content management
  - `/api/v1/brain/share` - Collection sharing

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

Key responsive features:
- Collapsible sidebar on mobile
- Touch-friendly buttons and interactions
- Optimized content grid for different screen sizes
- Mobile-specific navigation patterns

## 🚀 Deployment

The application is ready for deployment on platforms like:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Frontend Repository**: [BrainRem-Frontend](https://github.com/mayank-nishant/BrainRem-Frontend)
- **Backend Repository**: [BrainRem-Backend](https://github.com/mayank-nishant/BrainRem-Backend)
- **Live Demo**: [Deployed Application](https://your-deployment-url.com)

## 📞 Support

For support or questions, please open an issue in the GitHub repository.
