import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import Login from './components/Login';

function App() {
  return (
      <div>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
