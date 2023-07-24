import React from 'react'
import { Route, Routes } from 'react-router'
import { TodoScreen } from '../pages/Todo.screen'
import { LoginForm } from '../components/modules/user/login'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginForm/>} />
        <Route path='/todo' element={<TodoScreen/>} />
    </Routes>
  )
}

export default AppRouter
