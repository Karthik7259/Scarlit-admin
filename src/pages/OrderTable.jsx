import React, { useEffect, useState } from 'react';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-700 text-left">Order ID</th>
          <th className="py-2 px-4 border-b border-gray-700 text-left">Name</th>
          <th className="py-2 px-4 border-b border-gray-700 text-left">Status</th>
          <th className="py-2 px-4 border-b border-gray-700 text-left">Changed By</th>
          <th className="py-2 px-4 border-b border-gray-700 text-left">Changed By Email</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td className="py-2 px-4 border-b border-gray-700">{order.orderId}</td>
            <td className="py-2 px-4 border-b border-gray-700">{order.name}</td>
            <td className="py-2 px-4 border-b border-gray-700">{order.status}</td>
            <td className="py-2 px-4 border-b border-gray-700">{order.history && order.history.length > 0 ? order.history[order.history.length-1].changedBy : '-'}</td>
            <td className="py-2 px-4 border-b border-gray-700">{order.history && order.history.length > 0 ? order.history[order.history.length-1].changedByEmail : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
