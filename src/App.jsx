import React from 'react'
import { Routes,Route } from 'react-router-dom'


import Overviewpage from './pages/Overviewpage.jsx'
import ExamPage from './pages/OrderPage.jsx'
import SettingsPage from './pages/settingsPage.jsx'
import Sidebar from './Components/Sidebar.jsx'
import UsersPage from './pages/UsersPage.jsx'
import AnalyticsPage from './pages/analyticsPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx';

const App = () => {
  return (
    <div
     className='flex h-screen bg-blue-300 text-gray-100 overflow-hidden'
    >
  
{/* BG */}
  <div className='fixed inset-0 z-0'>
  <div className='absoulute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opactiy-80'/>
  <div className='absolute inset-0 backdrop-blur-sm'/>
  </div>

<Sidebar/>
    <Routes>
      <Route path='/' element={<Overviewpage/>}/>
      <Route path='/order' element={<ExamPage/>}/>
      <Route path='/Schedule' element={<SchedulePage/>}/>
      <Route path='/fleet' element={<UsersPage/>}/>
       <Route path='/analytics' element={<AnalyticsPage/>}/>
       <Route path='/setting' element={<SettingsPage/>}/>
    </Routes>

    </div>
  )
}

export default App