import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <NavLink to="/">Counters</NavLink>
            <NavLink to="send">Send Readings</NavLink>
        </nav>
    )
}

export default Navigation
