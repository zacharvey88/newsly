import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
      <div>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
