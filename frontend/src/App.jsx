import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import CountersPage from './pages/Counters/CountersPage'
import CounterDetails from './pages/CounterDetails/CounterDetails'
import NewCounterPage from './pages/NewCounter/NewCounterPage'
import SendReadingsPage from './pages/SendReadings/SendReadingsPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CountersPage />,
            },
            {
                path: ':id',
                element: <CounterDetails />,
            },
            {
                path: 'new',
                element: <NewCounterPage />,
            },
            {
                path: 'send',
                element: <SendReadingsPage />,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
