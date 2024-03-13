import { Outlet } from 'react-router'
import Header from '../components/Header'

const Layout = () => {
    return (
        <div className="page">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
