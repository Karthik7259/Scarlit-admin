import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const orderTrendData = [
  { name: "Week 1", delivered: 420, pending: 50, canceled: 20 },
  { name: "Week 2", delivered: 390, pending: 70, canceled: 25 },
  { name: "Week 3", delivered: 450, pending: 40, canceled: 15 },
  { name: "Week 4", delivered: 480, pending: 30, canceled: 10 },
  { name: "Week 5", delivered: 500, pending: 25, canceled: 12 },
  { name: "Week 6", delivered: 520, pending: 20, canceled: 8 },
  { name: "Week 7", delivered: 530, pending: 18, canceled: 6 },
  { name: "Week 8", delivered: 550, pending: 15, canceled: 5 },
];



const UserRetention = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Order Retention</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={orderTrendData}>
  <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
  <XAxis dataKey='name' stroke='#9CA3AF' />
  <YAxis stroke='#9CA3AF' />
  <Tooltip
    contentStyle={{
      backgroundColor: "rgba(31, 41, 55, 0.8)",
      borderColor: "#4B5563",
    }}
    itemStyle={{ color: "#E5E7EB" }}
  />
  <Legend />
  <Line type='monotone' dataKey='delivered' stroke='#8B5CF6' strokeWidth={2} />
  <Line type='monotone' dataKey='pending' stroke='#F59E0B' strokeWidth={2} />
  <Line type='monotone' dataKey='canceled' stroke='#EF4444' strokeWidth={2} />
</LineChart>

				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default UserRetention;