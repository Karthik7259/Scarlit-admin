import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable.jsx';
import Header from '../Components/common/Header';
import { Truck, TruckIcon, PackageCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from '../Components/common/StatCard';




const fleetStats = {
  totalVehicles: 0,
  activeDeliveries: 0,
  availableDrivers: 0,
  maintenanceDue: 0,
};



const UsersPage = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Order Management' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
            name='Total Vehicles'
            icon={Truck}
            value={fleetStats.totalVehicles.toLocaleString()}
            color='#6366F1'
          />
          <StatCard
            name='Active Deliveries'
            icon={PackageCheck}
            value={fleetStats.activeDeliveries}
            color='#10B981'
          />
          <StatCard
            name='Available Drivers'
            icon={TruckIcon}
            value={fleetStats.availableDrivers.toLocaleString()}
            color='#F59E0B'
          />
          <StatCard
            name='Maintenance Due'
            icon={AlertTriangle}
            value={fleetStats.maintenanceDue}
            color='#EF4444'
          />
	
    			</motion.div>



                         
              {/* USER CHARTS */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Order History</h2>
                <OrderTable />
              </div>
                </main>
		</div>
  )
}

export default UsersPage;