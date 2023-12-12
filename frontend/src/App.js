import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  return (
    <>
      <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={
        <>
        <Navbar/>
        <Home/>
        </>
        } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={
        <>
        <Navbar/>
        <Dashboard/>
        </>
        } />
      </Routes>
    </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
