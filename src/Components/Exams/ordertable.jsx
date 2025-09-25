import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://scarlit-backend.onrender.com/api/order/all");
        setOrders(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  // Search filter
  const filteredOrders = orders.filter(
    (order) =>
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  // Handle edit button click
  const handleEditClick = () => {
    setEditingOrder({ ...selectedOrder });
    setIsEditing(true);
  };

  // Handle input changes in edit mode
  const handleInputChange = (field, value) => {
    setEditingOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle status change
  const handleStatusChange = (value) => {
    setEditingOrder(prev => ({
      ...prev,
      status: value
    }));
  };

  // Submit updated order details const handleSubmit = async () => {
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Filter only allowed fields as per backend API
      const allowedFields = ['name', 'phone', 'address', 'comments', 'selectedSize', 'selectedColour', 'status'];
      const updateData = {
        email: editingOrder.email, // Required field for finding the order
      };
      
      // Only include allowed fields that have been modified
      allowedFields.forEach(field => {
        if (editingOrder[field] !== undefined) {
          updateData[field] = editingOrder[field];
        }
      });

      const res = await axios.put(
        `https://scarlit-backend.onrender.com/api/order/update`,
        updateData
      );
      
      // Update the orders list with the updated order
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.email === editingOrder.email ? { ...order, ...updateData } : order
        )
      );
      
      setSelectedOrder({ ...selectedOrder, ...updateData });
      setIsEditing(false);
      setIsSubmitting(false);
      
      // Show success toast
      toast.success("Order updated successfully!");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      
      // Show error toast with backend message if available
      const errorMessage = err.response?.data?.message || "Failed to update order. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingOrder(null);
    toast.info("Edit cancelled");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Management</h1>
          <p className="text-gray-600">View and manage all customer orders</p>
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-indigo-500 hover:text-white`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <span className="ml-4 text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, email or product..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? "Try adjusting your search term" : "Get started by creating a new order"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <motion.tr
                      key={order._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => setSelectedOrder(order)}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-indigo-800">
                              {order.name ? order.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {order.productName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.productBrand}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.selectedSize}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="h-4 w-4 rounded-full border border-gray-300 mr-2"
                            style={{ backgroundColor: order.selectedColour?.toLowerCase() }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700">{order.selectedColour}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal / Dialog */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                  <div className="flex items-center space-x-2">
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                      >
                        Edit Details
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedOrder(null);
                        setIsEditing(false);
                        setEditingOrder(null);
                      }}
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                        <dl className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Name:</dt>
                            <dd className="text-sm text-gray-700">
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 rounded px-2 py-1 w-full"
                                  value={editingOrder.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                              ) : (
                                selectedOrder.name
                              )}
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Email:</dt>
                            <dd className="text-sm text-gray-700 break-all">
                              <div className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {selectedOrder.email}
                              </div>
                              <span className="text-xs text-gray-400 mt-1">Email cannot be changed</span>
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Phone:</dt>
                            <dd className="text-sm text-gray-700">
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 rounded px-2 py-1 w-full"
                                  value={editingOrder.phone}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                />
                              ) : (
                                selectedOrder.phone
                              )}
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Address:</dt>
                            <dd className="text-sm text-gray-700">
                              {isEditing ? (
                                <textarea
                                  className="border border-gray-300 rounded px-2 py-1 w-full"
                                  value={editingOrder.address}
                                  onChange={(e) => handleInputChange('address', e.target.value)}
                                  rows="3"
                                />
                              ) : (
                                selectedOrder.address
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Product Details</h3>
                        <dl className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Order ID:</dt>
                            <dd className="text-sm text-gray-700">
                              <div className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {selectedOrder.orderId}
                              </div>
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Product:</dt>
                            <dd className="text-sm text-gray-700">
                              <div className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {selectedOrder.productName}
                              </div>
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Brand:</dt>
                            <dd className="text-sm text-gray-700">
                              <div className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {selectedOrder.productBrand}
                              </div>
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Size:</dt>
                            <dd className="text-sm text-gray-700">
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 rounded px-2 py-1 w-full"
                                  value={editingOrder.selectedSize}
                                  onChange={(e) => handleInputChange('selectedSize', e.target.value)}
                                />
                              ) : (
                                selectedOrder.selectedSize
                              )}
                            </dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Colour:</dt>
                            <dd className="flex items-center">
                              <div 
                                className="h-4 w-4 rounded-full border border-gray-300 mr-2"
                                style={{ backgroundColor: (isEditing ? editingOrder.selectedColour : selectedOrder.selectedColour)?.toLowerCase() }}
                              ></div>
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 text-slate-900 rounded px-2 py-1 w-full"
                                  value={editingOrder.selectedColour}
                                  onChange={(e) => handleInputChange('selectedColour', e.target.value)}
                                />
                              ) : (
                                <span className="text-sm font-medium text-gray-700">{selectedOrder.selectedColour}</span>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Additional Information</h3>
                      <dl className="mt-2 space-y-2">
                        <div>
                          <dt className="text-sm font-medium text-gray-900">Comments:</dt>
                          <dd className="text-sm text-gray-700 mt-1">
                            {isEditing ? (
                              <textarea
                                className="border border-gray-300  px-2 py-1 w-full bg-gray-50 p-3 rounded-lg"
                                value={editingOrder.comments || ""}
                                onChange={(e) => handleInputChange('comments', e.target.value)}
                                rows="3"
                                placeholder="No comments provided"
                              />
                            ) : (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                {selectedOrder.comments || "No comments provided"}
                              </div>
                            )}
                          </dd>
                        </div>
                        <div className="flex items-start">
                          <dt className="text-sm font-medium text-gray-900">Status:</dt>
                          <dd className="ml-2">
                            {isEditing ? (
                              <select
                                className="border border-gray-300 rounded px-2 py-1 text-black"
                                value={editingOrder.status || "pending"}
                                onChange={(e) => handleStatusChange(e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  selectedOrder.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                  selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'}`}>
                                {selectedOrder.status ? selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) : "Pending"}
                              </span>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                        onClick={handleCancelEdit}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Changes"}
                      </button>
                    </>
                  ) : (
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      onClick={() => {
                        setSelectedOrder(null);
                        setIsEditing(false);
                        setEditingOrder(null);
                      }}
                    >
                      Close
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderTable;