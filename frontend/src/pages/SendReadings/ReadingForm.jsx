import { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const ReadingForm = () => {
    const { counters } = useSelector((state) => state.counters)
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (!formData.counter_id) delete formData.counter_id

        try {
            setLoading(true)
            await axios.post('/readings/', formData)
            navigate('..')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (loading) return <Loader />

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>Send Your Readings</h1>
            <select required name="counter_id" onChange={handleInputChange}>
                <option value="">Select Counter</option>
                {counters.map((counter) => (
                    <option value={counter._id} key={counter._id}>
                        {counter.name}
                    </option>
                ))}
            </select>
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="energy_day"
                placeholder="Day Energy, kW"
                required
            />
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="energy_night"
                placeholder="Night Energy, kW"
                required
            />
            <button>Send Readings</button>
        </form>
    )
}

export default ReadingForm
