import { useState, useEffect } from 'react'

interface RevenueData {
	amount: string
	timestamp: number
}

//const socketURL = 'wss://api.example.com/revenue-stream';
const socketURL = 'wss://echo.websocket.org/'

let socket = new WebSocket(socketURL)

const useRevenueStream = () => {
	const [revenue, setRevenue] = useState<RevenueData>({
		amount: '0',
		timestamp: Date.now(),
	})
	const [error, setError] = useState<string | null>(null)
	useEffect(() => {
		socket = new WebSocket(socketURL)
	}, [])

    useEffect(() => {
            socket.onopen = () => {
                console.log(`WebSocket established: readyState ${socket.readyState}`)

                if (socket.readyState) {
                    socket.send(JSON.stringify({ action: 'subscribe' }))
                }
            }
        socket.onmessage = (event) => {
                // need to parse the data from the event
                console.log(event)
                //const data = JSON.parse(JSON.stringify(event))
                //console.log(data)

                // hard code data for the time being
                setRevenue({amount: '555555555',timestamp: Date.now(),})
            }
            socket.onerror = (event) => {
                console.error(`Websocket error: ${event}`)
                setError(`Websocket error: ${event}`)
            }
        return () => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ action: 'unsubscribe' }));
                    socket.close()
                }
            }
	}, [revenue])
	return { revenue, error }
}

export default useRevenueStream
