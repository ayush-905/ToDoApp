import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  return (
    <div  className='home'>
        <h1>Welcome to Todo App!</h1>
        <p style={{margin:'50px 20px'}}>
            Start organizing your tasks and stay productive. Add new tasks, edit 
            and delete the tasks and manage your todo list effortlessly.
        </p>
        <p style={{margin:'50px 20px'}}>If you are new to our app Register and start using app.</p>
  </div>
);
}

export default Home
