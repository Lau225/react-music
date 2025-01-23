import { createRoot } from 'react-dom/client'
import {HashRouter, RouterProvider} from 'react-router-dom'
import 'normalize.css'
import App from './App'
import '@/css/index.less'
import routes from './router'
createRoot(document.getElementById('root')!).render(
 <RouterProvider router={routes}/>
)
