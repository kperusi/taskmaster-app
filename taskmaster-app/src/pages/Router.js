import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './HomePage'
import DashboardPage from './DashboardPage'
import Task from './Task'
import ErrorPage from './ErrorPage'
import UserPage from './UserPage'
import SingleTask from './SingleTask'
import Registration from './Registration'
import Login from './Login'
import Calender from './Calender'

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
