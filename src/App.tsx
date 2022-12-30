import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/Login';
import { Post } from './pages/create-post/Post';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
