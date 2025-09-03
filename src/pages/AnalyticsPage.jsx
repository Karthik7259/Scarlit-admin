
import RevenueChart from "../Components/analytics/RevenueChart.jsx";
import ChannelPerformance from "../Components/analytics/ChannelPerformance.jsx";
import ProductPerformance from "../Components/analytics/ProductPerformance.jsx";
import UserRetention from "../Components/analytics/UserRetention.jsx";
import CustomerSegmentation from "../Components/analytics/CustomerSegmentation.jsx";
import Header from "../Components/common/Header.jsx";
import OverviewCards from "../Components/analytics/OverviewCards.jsx";


const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10 bg-gray-900'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				
			</main>
		</div>
	);
};
export default AnalyticsPage;
