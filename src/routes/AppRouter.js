import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { TodoScreen } from '../pages/Todo.screen'
import { LoginForm } from '../components/modules/user/login'
import { useSelector } from 'react-redux'
import { getToken } from '../utils/helpers/tokenStorage.helper'
const AppRouter = () => {
    const isLoggedIn = useSelector(state=>state.authReducer.isLoggedIn || !!getToken())
  return (
    <Routes>
        {isLoggedIn? <>
        <Route path='/todo' element={<TodoScreen/>} />
        <Route path='*' element={<Navigate to='/todo'/>} />
        </>:<>
        <Route path='/' element={<LoginForm/>} />
        <Route path='*' element={<Navigate to='/'/>} />
        </>}
    </Routes>
  )
}

export default AppRouter
