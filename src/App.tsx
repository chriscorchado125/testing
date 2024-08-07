import { useState } from 'react'
import './App.css'
import LiveRevenueDisplay from './components/LiveRevenueDisplay'

function App() {
    const [showRevenue, setShowRevenue] = useState(false)
    return (
		<div className="dashboard">
			<h1>Business Dashboard</h1>
			<button onClick={() => setShowRevenue(!showRevenue)}>
				{showRevenue ? 'Hide' : 'Show'}
            </button>

            {showRevenue && <LiveRevenueDisplay />}
		</div>
	)
}

export default App
