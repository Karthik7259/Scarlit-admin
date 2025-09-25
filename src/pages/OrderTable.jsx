import React, { useEffect, useState } from 'react';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 10;

  useEffect(() => {
    fetch('https://scarlit-backend.onrender.com/api/order/all')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-300">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Filter orders by status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {/* Status Filter */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="text-gray-300 font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // Reset to first page when filter changes
          }}
          className="px-3 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <span className="text-sm text-gray-400">
          Showing {filteredOrders.length} of {orders.length} orders
        </span>
      </div>
      
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Order ID</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Email</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Product</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Brand</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Size</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Color</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Status</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Changed By Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b border-gray-700">{order.orderId}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.name}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.email}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.productName}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.productBrand}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.selectedSize}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.selectedColour}</td>
              <td className="py-2 px-4 border-b border-gray-700">
                <span className={`px-2 py-1 rounded text-xs ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'processing' ? 'bg-blue-200 text-blue-800' :
                  order.status === 'completed' ? 'bg-green-200 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-200 text-red-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b border-gray-700">
                {order.history && order.history.length > 0 
                  ? order.history[order.history.length - 1].changedByEmail 
                  : '-'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          <span className="mx-2 text-sm text-gray-300">Page {currentPage} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderTable;
