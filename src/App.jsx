import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header'
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import TopicPage from './pages/TopicPage';
import Footer from './components/Footer';

function App() {
  return (
      <div>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
            <Route path="/:topic/articles" element={<TopicPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
