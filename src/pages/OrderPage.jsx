import { motion } from "framer-motion";
import React from 'react'
import Header from '../Components/common/Header'
import { Users, ClipboardCheck, Package, Truck } from "lucide-react";

import StatCard from "../Components/common/StatCard";
import OrderTable from "../Components/Exams/ordertable";

const OrderPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
			<Header title='Employee Management & Tracking' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
 {/* stats */}
 <motion.div
        className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
             <StatCard 
  name="Employees on Duty" 
  icon={Users} 
  value="0" 
  color="#4F46E5" 
/>

<StatCard 
  name="Orders Processed" 
  icon={ClipboardCheck} 
  value="0" 
  color="#10B981" 
/>

<StatCard 
  name="Pending Orders" 
  icon={Package} 
  value="0" 
  color="#F59E0B" 
/>

<StatCard 
  name="Employee Deliveries" 
  icon={Truck} 
  value="0" 
  color="#DC2626" 
/>
      </motion.div>
{/* Exam table */}
      <OrderTable/>
     {/* Charts */}
    

      </main>
            </div>
  )
}

export default OrderPage