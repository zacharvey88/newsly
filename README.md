<img src="/src/assets/newsly-logo.png" width="300">

# Newsly - A Modern News Platform

Welcome to Newsly, a comprehensive news platform built using React with Vite, communicating with a Node.js backend hosted on Render. This project is part of my software development bootcamp with Northcoders and builds on the backend which I previously built. You can view that repository [here](https://github.com/zacharvey88/nc-news).

## 🚀 Live Demo

Visit the deployed site on [Netlify](https://zacharvey-newsly.netlify.app/)

**Note:** The backend service spins down with inactivity, so initial page loads may take a moment to get a response from the API.

## ✨ Features

### 🔐 User Authentication & Profile Management
- **Secure Login System**: Username and password authentication
- **Profile Management**: 
  - Update your display name
  - Change your avatar URL
  - Password reset functionality
- **Session Management**: Automatic login state persistence
- **Protected Routes**: Secure access to user-specific features

### 📰 Article Management
- **Browse Articles**: Explore articles by topic or search functionality
- **Article Creation**: Create new articles with rich text editor
- **Article Editing**: Edit your own articles with full content management
- **Article Deletion**: Remove your articles with confirmation dialogs
- **Rich Text Editor**: WYSIWYG editor for article content using React Quill
- **Image Support**: Add article images via URL
- **Topic Categorization**: Organize articles by topics

### 💬 Comment System
- **Interactive Comments**: Engage with other users through comments
- **Comment Management**: 
  - Add comments to articles
  - Edit your own comments
  - Delete your comments
- **Comment Moderation**: Delete all comments for specific articles
- **Real-time Updates**: Comments update immediately after posting

### ❤️ Engagement Features
- **Article Likes**: Like/unlike articles with heart icon
- **Like Persistence**: Like state stored locally for consistent experience
- **Vote Tracking**: Real-time vote count updates

### 🎛️ Dashboard & Content Management
- **User Dashboard**: Comprehensive management interface
- **Article Management**:
  - View all your articles
  - Edit articles inline
  - Delete individual articles
  - Bulk delete all articles
  - Sort articles by date, likes, or comments
- **Comment Management**:
  - View all your comments across articles
  - Edit individual comments
  - Delete individual comments
  - Delete all comments for specific articles
  - Bulk delete all comments
  - Sort comments by various criteria
- **Load More Functionality**: Paginated content loading

### 🔍 Search & Navigation
- **Article Search**: Search through all articles
- **Topic Navigation**: Browse articles by specific topics
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Intuitive Navigation**: Easy-to-use interface with clear navigation

### 📱 User Interface
- **Modern Design**: Clean, professional Bootstrap-based interface
- **Responsive Layout**: Optimized for all screen sizes
- **Modal System**: Smooth modal dialogs for forms and confirmations
- **Loading States**: Visual feedback during data operations
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: Keyboard navigation and screen reader support

### 🎨 Visual Features
- **Custom Styling**: Modern card-based layouts
- **Avatar Support**: User profile pictures throughout the app
- **Article Images**: Support for article header images
- **Icon Integration**: FontAwesome icons for enhanced UX
- **Consistent Theming**: Cohesive color scheme and typography

## 🛠️ Technical Features

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: Responsive CSS framework
- **React Router**: Client-side routing
- **Context API**: State management for user authentication
- **Axios**: HTTP client for API communication
- **React Quill**: Rich text editor for article content
- **DOMPurify**: XSS protection for user-generated content

### Backend Integration
- **RESTful API**: Full CRUD operations for articles and comments
- **User Authentication**: Secure login and session management
- **Real-time Updates**: Immediate data synchronization
- **Error Handling**: Comprehensive error management

### Performance & UX
- **Optimized Loading**: Efficient data fetching and caching
- **Smooth Interactions**: Responsive UI with loading states
- **Form Validation**: Client-side and server-side validation
- **Confirmation Dialogs**: Prevent accidental deletions
- **Search Functionality**: Fast article search capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📞 Contact

If you have any questions or feedback, please don't hesitate to reach out to me at [projects@zacharvey.com](mailto:projects@zacharvey.com).

---

**Built with ❤️ during the Northcoders Software Development Bootcamp**

