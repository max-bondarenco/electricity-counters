import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import axios from '../../api/axios'
import Counters from './Counters'
import Controls from './Controls'
import { useDispatch } from 'react-redux'
import { setCounters } from '../../redux/counterSlice/counterSlice'

const CountersPage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchCounters = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/counters/', {
                    signal: controller.signal,
                    params: { sort: '-updatedAt' },
                })
                dispatch(setCounters(res.data.data))
            } catch (error) {
                if (error.name === 'CanceledError') return
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCounters()

        return () => controller.abort()
    }, [dispatch])

    if (loading) return <Loader />

    return (
        <main>
            <Controls />
            <Counters />
        </main>
    )
}

export default CountersPage
