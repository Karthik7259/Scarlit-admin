import { useState } from "react";
import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const salesStockData = [
	{ month: "Jan", storeSales: 1200, onlineSales: 2300, inStock: 8000 },
	{ month: "Feb", storeSales: 950, onlineSales: 2100, inStock: 7800 },
	{ month: "Mar", storeSales: 1500, onlineSales: 3000, inStock: 7600 },
	{ month: "Apr", storeSales: 1700, onlineSales: 2800, inStock: 7500 },
	{ month: "May", storeSales: 1900, onlineSales: 3200, inStock: 7200 },
	{ month: "Jun", storeSales: 1400, onlineSales: 2500, inStock: 7000 },
	{ month: "Jul", storeSales: 2000, onlineSales: 3500, inStock: 6800 },
];


const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>
					Store vs Online Sales & Stock
				</h2>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Quarter</option>
					<option>This Year</option>
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={salesStockData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area
							type='monotone'
							dataKey='storeSales'
							stroke='#3B82F6'
							fill='#3B82F6'
							fillOpacity={0.3}
							name='In-Store Sales'
						/>
						<Area
							type='monotone'
							dataKey='onlineSales'
							stroke='#10B981'
							fill='#10B981'
							fillOpacity={0.3}
							name='Online Sales'
						/>
						<Area
							type='monotone'
							dataKey='inStock'
							stroke='#F59E0B'
							fill='#F59E0B'
							fillOpacity={0.2}
							name='In Stock'
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default RevenueChart;