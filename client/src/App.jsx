import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar/TopBar'
import { Context } from './context/Context'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Settings from './pages/Settings/Settings'
import Single from './pages/Single/Single'
import Write from './pages/Write/Write'

function App() {

  const {user} = useContext(Context);

  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </div>
  );
}

export default App
