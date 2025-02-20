import './App.css'
import Login from './Component/Login'
import Register from './Component/Register'
import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Router>
        <nav className='h-20  bg-blue-200'>
          <div className='flex justify-between items-center px-10'>
             <div className='text-white font-bold text-4xl'>
              Government Scheme
            </div>

            <div className=' flex space-x-2 mt-5'>
              <button onClick= {() => window.location.href = "/login"}  className='bg-white  text-blue-500 font-bold px-5 py-2 rounded-md item-center hover:bg-purple-500 hover:text-white'>
                Login
              </button>
              <button onClick= {() => window.location.href = "/register"}  className='bg-white  text-blue-500 font-bold px-5 py-2 rounded-md item-center hover:bg-purple-500 hover:text-white' >
                Register
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
