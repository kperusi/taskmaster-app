import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './homepage/HomePage'
import DashboardPage from './dashboard/DashboardPage'
import Task from './tasks/Task'
import ErrorPage from './ErrorPage'
import UserPage from './userPage/UserPage'
import SingleTask from './singletask/SingleTask'
import Registration from './registration/Registration'
import Login from './login/Login'
import Calender from './calender/Calender'

export default function Router() {
  return (
    <>
    <Routes>
    <Route path='/' element= {<HomePage/>} />
    <Route path='/taskmaster/register' element={<Registration/>}/>
    <Route path='/taskmaster/login' element={<Login/>}/>
    <Route path='/user' element={<UserPage/>}>
      <Route index element={<DashboardPage/>}/>
      <Route path='dashboard' element={<DashboardPage/>}/>
      <Route path='tasks' element= {<Task/>}/>
      <Route path='/user/tasks/:id' element={<SingleTask/>}/>
      <Route path='/user/calender' element={<Calender/>}/>
    </Route>
    <Route path='/user/tasks/:id' element={<SingleTask/>}/>
    <Route path='*' element= {<ErrorPage/>}/>
    </Routes>
    
    </>
  )
}
