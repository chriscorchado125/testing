import React from 'react'
import useRevenueStream from '../hooks/useRevenueStream'

const LiveRevenueDisplay: React.FC = () => {
	const { revenue, error } = useRevenueStream()

	if (error) {
		return <div>Error: {error}</div>
	}

	if (!revenue) {
		return <div>Loading...</div>
	}

	const formattedRevenue = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	}).format(parseInt(revenue.amount));

	const formattedTime = new Date(revenue.timestamp).toLocaleTimeString('en-US');
	const [hours, minutes, seconds] = formattedTime.split(':');

	return (
		<div>
			<h2>Live Rename</h2>
			<p>{formattedRevenue}</p>
			<p>
				{hours}:{minutes}:{seconds}
			</p>
		</div>
	)
}

export default LiveRevenueDisplay
