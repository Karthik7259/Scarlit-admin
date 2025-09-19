import React, { useEffect, useState } from 'react';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Order ID</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Status</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Changed By Name</th>
            <th className="py-2 px-4 border-b border-gray-700 text-left">Changed By Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map(order => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b border-gray-700">{order.orderId}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.name}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.status}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.history && order.history.length > 0 ? order.history[order.history.length-1].changedByName : '-'}</td>
              <td className="py-2 px-4 border-b border-gray-700">{order.history && order.history.length > 0 ? order.history[order.history.length-1].changedByEmail : '-'}</td>
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
