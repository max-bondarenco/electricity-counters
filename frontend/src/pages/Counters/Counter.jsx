import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const Counter = ({ counter }) => {
    return (
        <div className="counter">
            <div className="counter__info">
                <Link to={`/${counter._id}`}>
                    <h3 className="counter__name">{counter.name}</h3>
                </Link>
                <span>Day Tariff: {counter.tariff_day}</span>
                <span>Day Penalty: {counter.penalty_day}</span>
                <span>Night Tariff: {counter.tariff_night}</span>
                <span>Night Penalty: {counter.penalty_night}</span>
            </div>
        </div>
    )
}

Counter.propTypes = {
    counter: object,
}

export default Counter
