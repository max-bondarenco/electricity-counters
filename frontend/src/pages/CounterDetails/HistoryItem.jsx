import { object } from 'prop-types'

const HistoryItem = ({ data }) => {
    return (
        <div className="history-item">
            <div className="history-item__info">
                <span>Date: {new Date(data.createdAt).toLocaleString()}</span>
                <span>Day: {data.energy_day} kW</span>
                <span>Night: {data.energy_night} kW</span>
                <span className="history-item__cost">
                    {data.to_pay || 0} uah
                </span>
            </div>
        </div>
    )
}

HistoryItem.propTypes = {
    data: object,
}

export default HistoryItem
