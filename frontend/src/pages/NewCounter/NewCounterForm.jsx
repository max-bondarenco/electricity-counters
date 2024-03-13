import { useState } from 'react'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import axios from '../../api/axios'
import { useDispatch } from 'react-redux'
import { addCounter } from '../../redux/counterSlice/counterSlice'

const NewCounterForm = () => {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post('/counters/', formData)
            dispatch(addCounter(res.data.data))
            navigate('/')
        } catch (error) {
            alert(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>Creating New Counter</h1>
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="Counter Name"
                required
            />
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="tariff_day"
                placeholder="Day Tariff"
                required
            />
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="penalty_day"
                placeholder="Day penalty"
                required
            />
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="tariff_night"
                placeholder="Night Tariff"
                required
            />
            <input
                autoComplete="off"
                onChange={handleInputChange}
                type="number"
                min="0"
                step="0.01"
                name="penalty_night"
                placeholder="Night penalty"
                required
            />
            <button>Create Counter</button>
        </form>
    )
}

export default NewCounterForm
