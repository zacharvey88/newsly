import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import ResultsPage from './pages/ResultsPage';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import ArticleForm from './pages/ArticleForm';
import UserDashboard from './pages/Dashboard';
import BackToTop from './components/BackToTopButton';
import ProtectedRoute from './utilities/ProtectedRoute'
import Profile from './pages/Profile';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/articles" element={<ResultsPage />} />
          <Route exact path="/articles/:article_id" element={<ArticlePage />} />
          <Route exact path="/:topic/articles" element={<ResultsPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/new-article" element={<ProtectedRoute><ArticleForm /></ProtectedRoute>} />
          <Route exact path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
