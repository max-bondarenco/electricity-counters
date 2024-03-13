import Counter from './Counter'
import { useSelector } from 'react-redux'

const Counters = () => {
    const { counters } = useSelector((state) => state.counters)

    return (
        <div className="counters">
            {counters.map((counter) => (
                <div key={counter._id}>
                    <Counter counter={counter} />
                </div>
            ))}
        </div>
    )
}

export default Counters
