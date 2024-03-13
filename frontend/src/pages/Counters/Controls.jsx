import { Link } from 'react-router-dom'
import { CiCirclePlus } from 'react-icons/ci'

const Controls = () => {
    return (
        <div className="controls">
            <Link to="/new">
                <CiCirclePlus />
            </Link>
        </div>
    )
}

export default Controls
