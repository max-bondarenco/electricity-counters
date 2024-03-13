import { array } from 'prop-types'
import HistoryItem from './HistoryItem'

const CounterHistory = ({ history }) => {
    return (
        <div className="history">
            <h1>History</h1>
            {history?.map((element) => (
                <HistoryItem key={element._id} data={element} />
            ))}
        </div>
    )
}

CounterHistory.propTypes = {
    history: array,
}

export default CounterHistory
