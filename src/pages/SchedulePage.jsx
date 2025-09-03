import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Package, Users } from 'lucide-react';
import Header from '../Components/common/Header.jsx';
import axios from 'axios';

const SchedulePage = () => {
  const [orderType, setOrderType] = useState('');
  const [employees, setEmployees] = useState([]);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('60');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [mEmployees, setMEmployees] = useState([]);

  // Order type options
  const orderOptions = [
    { id: 1, name: 'Electronics Delivery' },
    { id: 2, name: 'Grocery Order' },
    { id: 3, name: 'Furniture Transport' },
    { id: 4, name: 'Clothing Shipment' },
    { id: 5, name: 'Pharmaceutical Delivery' },
  ];

  // Fallback employees if API fails
  const defaultEmployees = [
    { id: 1, name: 'Ravi Kumar' },
    { id: 2, name: 'Anita Sharma' },
    { id: 3, name: 'Vikram Singh' },
    { id: 4, name: 'Neha Patel' },
    { id: 5, name: 'Arjun Mehta' },
  ];

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/employees');
      const employeeData = response.data.map((emp, index) => ({
        id: emp._id || index + 1,
        name: emp.fullname || `Employee ${index + 1}`,
      }));
      setMEmployees(employeeData);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setMEmployees(defaultEmployees);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const employeeOptions = mEmployees.length > 0 ? mEmployees : defaultEmployees;

  // Toggle employee selection
  const handleEmployeeToggle = (empId) => {
    if (employees.includes(empId)) {
      setEmployees(employees.filter((id) => id !== empId));
    } else {
      setEmployees([...employees, empId]);
    }
  };

  // Submit order schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedOrderType = orderOptions.find((opt) => opt.id === orderType)?.name;
    const selectedEmployees = employees.map(
      (empId) => employeeOptions.find((opt) => opt.id === empId)?.name
    );

    const orderData = {
      orderType: selectedOrderType,
      assignedEmployees: selectedEmployees,
      date,
      time,
      estimatedDuration: `${duration} minutes`,
    };

    try {
      console.log('Order Data:', orderData);
      const response = await axios.post('http://localhost:5000/orders/add', orderData);
      console.log('Success:', response.data);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setOrderType('');
    setEmployees([]);
    setTime('');
    setDate('');
    setDuration('60');
    setShowConfirmation(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-blue-300 relative z-10">
      <Header title="Schedule Employee Order" />

      <motion.div
        className="max-w-4xl mx-auto py-6 px-4 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showConfirmation ? (
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md p-8 rounded-xl border border-green-500 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <Check size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Scheduled Successfully!</h2>
            <p className="text-gray-300 mb-6">
              The order has been assigned and employees will be notified.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Schedule Another Order
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Type Selection */}
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <Package className="text-blue-400 mr-2" size={20} />
                <h3 className="text-lg font-medium text-white">Select Order Type</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {orderOptions.map((orderOption) => (
                  <div
                    key={orderOption.id}
                    onClick={() => setOrderType(orderOption.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      orderType === orderOption.id
                        ? 'bg-blue-600 text-white border-2 border-blue-400'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {orderOption.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Selection */}
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <Users className="text-blue-400 mr-2" size={20} />
                <h3 className="text-lg font-medium text-white">Assign Employees</h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {employeeOptions.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => handleEmployeeToggle(emp.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                      employees.includes(emp.id)
                        ? 'bg-blue-600 text-white border border-blue-400'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span>{emp.name}</span>
                    {employees.includes(emp.id) && <Check size={18} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Time & Duration */}
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-400 mr-2" size={20} />
                <h3 className="text-lg font-medium text-white">Delivery Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Estimated Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1 hour 30 minutes</option>
                    <option value="120">2 hours</option>
                    <option value="180">3 hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!orderType || employees.length === 0 || !time || !date || isSubmitting}
                className={`px-6 py-3 rounded-lg transition-all ${
                  !orderType || employees.length === 0 || !time || !date || isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Order'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default SchedulePage;
