import { motion } from "framer-motion";
import {
	ResponsiveContainer,
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Legend,
	Tooltip,
} from "recharts";

const orderTrackingData = [
  { metric: "Orders Placed", Completed: 420, Pending: 50, Canceled: 20, fullMark: 500 },
  { metric: "Orders Shipped", Completed: 380, Pending: 40, Canceled: 10, fullMark: 450 },
  { metric: "Orders Delivered", Completed: 350, Pending: 30, Canceled: 5, fullMark: 400 },
  { metric: "Returns", Completed: 10, Pending: 5, Canceled: 0, fullMark: 20 },
  { metric: "Customer Complaints", Completed: 15, Pending: 3, Canceled: 0, fullMark: 20 },
  { metric: "Stock Outs", Completed: 5, Pending: 2, Canceled: 0, fullMark: 10 },
];

const CustomerSegmentation = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Order Tracking Segmentation</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<RadarChart cx='50%' cy='50%' outerRadius='80%' data={orderTrackingData}>
						<PolarGrid stroke='#374151' />
						<PolarAngleAxis dataKey='metric' stroke='#9CA3AF' />
						<PolarRadiusAxis angle={30} domain={[0, 500]} stroke='#9CA3AF' />
						<Radar name='Completed' dataKey='Completed' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.6} />
						<Radar name='Pending' dataKey='Pending' stroke='#10B981' fill='#10B981' fillOpacity={0.6} />
						<Radar name='Canceled' dataKey='Canceled' stroke='#F59E0B' fill='#F59E0B' fillOpacity={0.6} />
						<Legend />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CustomerSegmentation;
