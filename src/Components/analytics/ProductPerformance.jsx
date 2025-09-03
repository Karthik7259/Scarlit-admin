import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const orderPerformanceData = [
  { name: "Online Orders", orders: 5200, fulfillmentRate: 92, delayedShipments: 450 },
  { name: "In-Store Purchases", orders: 3100, fulfillmentRate: 97, delayedShipments: 120 },
  { name: "Backordered Items", orders: 800, fulfillmentRate: 65, delayedShipments: 600 },
  { name: "Returned Orders", orders: 950, fulfillmentRate: 88, delayedShipments: 50 },
  { name: "Cancelled Orders", orders: 700, fulfillmentRate: 0, delayedShipments: 0 },
];


const ProductPerformance = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Order Performance</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={orderPerformanceData}>
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
						<Bar dataKey='orders' fill='#8B5CF6' />
						<Bar dataKey='fulfillmentRate' fill='#10B981' />
						<Bar dataKey='delayedShipments' fill='#F59E0B' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default ProductPerformance;