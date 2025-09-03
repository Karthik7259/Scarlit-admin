// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Edit, Search, Trash2 } from "lucide-react";
// import axios from "axios";

// const Examtable = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);

//   // Fetch orders from backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/order/all");
//         setOrders(res.data);
//         setFilteredOrders(res.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Search filter
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = orders.filter(
//       (order) =>
//         order.name?.toLowerCase().includes(term) ||
//         order.email?.toLowerCase().includes(term) ||
//         order.productType?.toLowerCase().includes(term) ||
//         order.brand?.toLowerCase().includes(term) ||
//         order.size?.toLowerCase().includes(term) ||
//         order.colour?.toLowerCase().includes(term)
//     );

//     setFilteredOrders(filtered);
//   };

//   return (
//     <motion.div
//       className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-gray-100">Order List</h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={handleSearch}
//             value={searchTerm}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-700">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Brand</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Colour</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Comments</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Store Comment</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {filteredOrders.map((order, index) => (
//               <motion.tr
//                 key={order._id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{index + 1}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order._id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.phone}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.productType}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.brand}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.size}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.colour}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.address}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.comments}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.status || "Pending"}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.storeComment || ""}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default Examtable;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const ExamTable = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/order/all");
//         setOrders(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Search filter
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.productType?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search by name, email or product..."
//         className="mb-4 p-2 border rounded w-full"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-300 border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Phone</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Product Type</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Brand</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Size</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Colour</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr
//                 key={order._id}
//                 className="cursor-pointer hover:bg-gray-200"
//                 onClick={() => setSelectedOrder(order)}
//               >
//                 <td className="px-4 py-2">{order.name}</td>
//                 <td className="px-4 py-2">{order.email}</td>
//                 <td className="px-4 py-2">{order.phone}</td>
//                 <td className="px-4 py-2">{order.productType}</td>
//                 <td className="px-4 py-2">{order.brand}</td>
//                 <td className="px-4 py-2">{order.size}</td>
//                 <td className="px-4 py-2">{order.colour}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal / Dialog */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <motion.div
//             className="bg-white p-6 rounded-lg w-11/12 max-w-lg shadow-lg"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//           >
//             <h2 className="text-xl font-bold mb-4">Order Details</h2>
//             <div className="space-y-2">
//               <p><strong>Name:</strong> {selectedOrder.name}</p>
//               <p><strong>Email:</strong> {selectedOrder.email}</p>
//               <p><strong>Phone:</strong> {selectedOrder.phone}</p>
//               <p><strong>Product Type:</strong> {selectedOrder.productType}</p>
//               <p><strong>Brand:</strong> {selectedOrder.brand}</p>
//               <p><strong>Size:</strong> {selectedOrder.size}</p>
//               <p><strong>Colour:</strong> {selectedOrder.colour}</p>
//               <p><strong>Address:</strong> {selectedOrder.address}</p>
//               <p><strong>Comments:</strong> {selectedOrder.comments}</p>
//               <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>
//               <p><strong>Store Comment:</strong> {selectedOrder.storeComment || ""}</p>
//             </div>
//             <button
//               className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
//               onClick={() => setSelectedOrder(null)}
//             >
//               Close
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExamTable;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      }
    };
    fetchOrders();
  }, []);

  // Search filter
  const filteredOrders = orders.filter(
    (order) =>
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Management</h1>
          <p className="text-gray-600">View and manage all customer orders</p>
        </div>

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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colour</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <motion.tr
                      key={order._id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => setSelectedOrder(order)}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    >
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {order.productType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="h-4 w-4 rounded-full border border-gray-300 mr-2"
                            style={{ backgroundColor: order.colour?.toLowerCase() }}
                          ></div>
                          <span className="text-sm text-gray-500">{order.colour}</span>
                        </div>
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
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                        <dl className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Name:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.name}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Email:</dt>
                            <dd className="text-sm text-gray-700 break-all">{selectedOrder.email}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Phone:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.phone}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-20">Address:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.address}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Product Details</h3>
                        <dl className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Product Type:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.productType}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Brand:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.brand}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Size:</dt>
                            <dd className="text-sm text-gray-700">{selectedOrder.size}</dd>
                          </div>
                          <div className="flex items-start">
                            <dt className="text-sm font-medium text-gray-900 w-24">Colour:</dt>
                            <dd className="flex items-center">
                              <div 
                                className="h-4 w-4 rounded-full border border-gray-300 mr-2"
                                style={{ backgroundColor: selectedOrder.colour?.toLowerCase() }}
                              ></div>
                              <span className="text-sm text-gray-700">{selectedOrder.colour}</span>
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
                          <dd className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg">
                            {selectedOrder.comments || "No comments provided"}
                          </dd>
                        </div>
                        <div className="flex items-start">
                          <dt className="text-sm font-medium text-gray-900">Status:</dt>
                          <dd className="ml-2">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                selectedOrder.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {selectedOrder.status || "Pending"}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-900">Store Comment:</dt>
                          <dd className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg">
                            {selectedOrder.storeComment || "No store comments"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </button>
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

