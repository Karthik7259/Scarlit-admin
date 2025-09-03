import { Package, Loader, CheckCircle, XCircle } from "lucide-react";

import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Header from '../Components/common/Header'
import StatCard from '../Components/common/StatCard'
import ViolationChart from '../Components/overview/ViolationChart'
import PatternChart from '../Components/overview/PatternChart'
import RiskChart from '../Components/overview/RiskChart'


const Overviewpage = () => {
  
    
   
  return (
    <div className='flex-1 overflow-auto relative z-10'>
     
      
      <Header title="Overview" />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* stats */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <StatCard
            name="Total Exams Administered"
            icon={ClipboardList}
            value="5"
            color='#2563eb'
          />
          <StatCard name='New Users' icon={Users} value='3' color='#9333ea' />
          <StatCard name='Violation Detection Rate' icon={ShieldAlert} value='3' color='#dc2626' />
          <StatCard name='Risk Escalation Trend	' icon={TrendingUp} value='12.5%' color='#f97316' /> */}

          <StatCard 
  name="Total Orders"
  icon={Package} 
  value="540" 
  color="#9333ea" 
/>

<StatCard 
  name="In Progress"
  icon={Loader} 
  value="72" 
  color="#3b82f6" 
/>

<StatCard 
  name="Delivered Today"
  icon={CheckCircle} 
  value="98" 
  color="#22c55e" 
/>

<StatCard 
  name="Cancelled Orders"
  icon={XCircle} 
  value="12" 
  color="#ef4444" 
/>

        </motion.div>

        {/* Charts and Reports Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <ViolationChart />
          <PatternChart />
          
        </div>
      </main>
    </div>
  );
}

export default Overviewpage;