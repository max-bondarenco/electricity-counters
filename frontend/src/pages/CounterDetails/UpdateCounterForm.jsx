import { useState } from 'react'
import axios from '../../api/axios'
import Loader from '../../components/Loader'
import { object } from 'prop-types'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import {
    removeCounter,
    updateCounter,
} from '../../redux/counterSlice/counterSlice'

const UpdateCounterForm = ({ counter }) => {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        if (counter[e.target.name] == e.target.value)
            setFormData((prev) => {
                delete prev[e.target.name]
                if (!Object.keys(formData).length) setButtonEnabled(false)
                return prev
            })
        else {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
            setButtonEnabled(true)
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/counters/${counter._id}`)
            dispatch(removeCounter(counter._id))
            navigate('..')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.patch(`/counters/${counter._id}`, formData)
            dispatch(updateCounter({ _id: counter._id, data: res.data.data }))
            navigate('..')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    return (
        <form className="counter-details-form" onSubmit={handleFormSubmit}>
            <h1>Change Counter Data</h1>
            <div>
                <label htmlFor="name">Counter Name:</label>
                <input
                    id="name"
                    autoComplete="off"
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    required
                    defaultValue={counter?.name}
                />
            </div>
            <div>
                <label htmlFor="tariff_day">Day Tariff:</label>
                <input
                    id="tariff_day"
                    autoComplete="off"
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="0.01"
                    name="tariff_day"
                    required
                    defaultValue={counter?.tariff_day}
                />
            </div>
            <div>
                <label htmlFor="penalty_day">Day penalty:</label>
                <input
                    id="penalty_day"
                    autoComplete="off"
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="0.01"
                    name="penalty_day"
                    required
                    defaultValue={counter?.penalty_day}
                />
            </div>
            <div>
                <label htmlFor="tariff_night">Night Tariff:</label>
                <input
                    id="tariff_night"
                    autoComplete="off"
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="0.01"
                    name="tariff_night"
                    required
                    defaultValue={counter?.tariff_night}
                />
            </div>
            <div>
                <label htmlFor="penalty_night">Night penalty:</label>
                <input
                    id="penalty_night"
                    autoComplete="off"
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="0.01"
                    name="penalty_night"
                    required
                    defaultValue={counter?.penalty_night}
                />
            </div>
            <button disabled={!buttonEnabled}>Update Counter</button>
            <button type="button" onClick={handleDelete}>
                Delete Counter
            </button>
        </form>
    )
}

UpdateCounterForm.propTypes = {
    counter: object,
}

export default UpdateCounterForm
