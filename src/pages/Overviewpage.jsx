import { Package, Loader, CheckCircle, XCircle } from "lucide-react";

import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../Components/common/Header.jsx'
import StatCard from '../Components/common/StatCard.jsx'
import ViolationChart from '../Components/overview/ViolationChart.jsx'
import PatternChart from '../Components/overview/PatternChart.jsx'



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
  value="0" 
  color="#9333ea" 
/>

<StatCard 
  name="In Progress"
  icon={Loader} 
  value="0" 
  color="#3b82f6" 
/>

<StatCard 
  name="Delivered Today"
  icon={CheckCircle} 
  value="0" 
  color="#22c55e" 
/>

<StatCard 
  name="Cancelled Orders"
  icon={XCircle} 
  value="0" 
  color="#ef4444" 
/>

        </motion.div>

        {/* Charts and Reports Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          <ViolationChart />
          <PatternChart />
          
        </div>

        {/* Employee List Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Employees</h2>
          <EmployeeTable />
        </div>
      </main>
    </div>
  );
}

export default Overviewpage;

function EmployeeTable() {
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
        const res = await fetch('https://scarlit-backend.onrender.com/api/user/all');
      const data = await res.json();
      // expected shape: { success: true, data: [ ... ] }
      const list = data?.data || [];
      setEmployees(list);
    } catch (err) {
      console.error('Failed to fetch employees', err);
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);
  
  
  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this user?');
    if (!ok) return;
    try {
      // DELETE by email in request body (matches curl example)
      const res = await fetch(`https://scarlit-backend.onrender.com/api/user/delete/email`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: id })
      });
      const body = await res.json();
      if (body?.success) {
        toast.success('User deleted');
        fetchEmployees();
      } else {
        toast.error(body?.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete user');
    }
  };

  if (loading) return <div className="py-6 text-center text-gray-500">Loading employees...</div>;
  if (error) return <div className="py-6 text-center text-red-500">{error}</div>;
  if (employees.length === 0) return <div className="py-6 text-center text-gray-500">No employees found</div>;

  return (
    <div>
      <div className="mb-4" />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map(emp => (
                  <tr key={emp._id || emp.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{emp.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDelete(emp.email)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
        </table>
      </div>
    </div>
  )
}