import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from '../../api/axios'
import Loader from '../../components/Loader'
import UpdateCounterForm from './UpdateCounterForm'
import CounterHistory from './CounterHistory'
import { useSelector } from 'react-redux'

const CounterDetails = () => {
    const { id } = useParams()
    const { counters } = useSelector((state) => state.counters)
    const [counter, setCounter] = useState({})
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCounter(counters.filter((counter) => counter._id === id)[0])
    }, [id, counters])

    useEffect(() => {
        const controller = new AbortController()

        const fetchHistory = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/counters//${id}/history`, {
                    signal: controller.signal,
                })
                setHistory(res.data.data)
            } catch (error) {
                if (error.name === 'AbortError') return
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchHistory()
    }, [id])

    if (loading) return <Loader />

    return (
        <main className="counter-details-page">
            <div>
                <UpdateCounterForm counter={counter} />
            </div>
            <div className="history-container">
                <CounterHistory history={history} />
            </div>
        </main>
    )
}

export default CounterDetails
