import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header'
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import TopicPage from './pages/TopicPage';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  return (
      <div>
        <Header />
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFound/>}></Route>
            <Route path="/not-found" element={<NotFound/>}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/articles/:article_id" element={<ArticlePage />}></Route>
            <Route exact path="/:topic/articles" element={<TopicPage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
