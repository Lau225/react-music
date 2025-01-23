import {createBrowserRouter} from 'react-router-dom'
import { lazy, Suspense } from 'react';
import App from '@/App';
const Discover = lazy(() => import('@/views/discover'));
const Download = lazy(() => import('@/views/download'));
const Mine = lazy(() => import('@/views/mine'));
const Focus = lazy(() => import('@/views/focus'));
const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[{
        path:'/discover',
        element: <Suspense fallback={<div>Loading...</div>}>
            <Discover/>
        </Suspense>,
    }, {
        path:'/download',
        element:<Suspense fallback={<div>Loading...</div>}>
            <Download/>
        </Suspense>,
    }, {
        path:'/focus',
        element:<Suspense fallback={<div>Loading...</div>}>
            <Focus/>
        </Suspense>,
    }, {
        path:'/mine',
        element:<Suspense fallback={<div>Loading...</div>}>
            <Mine/>
        </Suspense>,
    }]
    },
    
])

export default routes
