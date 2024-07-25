import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Navbar from './components/Navbar/Navbar'
import Notfound from './components/Notfound/Notfound'
import { CounterContextProvider } from './Context/CounterContext'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CartContextProvider } from './Context/CartContext'

import { Toaster } from 'react-hot-toast'
import FilterBrands from './components/FilterBrands/FilterBrands'
import FilterCategory from './components/FilterCategory/FilterCategory'
import ChekOut from './components/ChekOut/ChekOut'
import Orders from './components/Orders/Orders'


let query = new QueryClient();


let x = createBrowserRouter([
  {path:'' , element:<Layout/>,children:[
    {index:true , element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>,children:[
      {path:'filterbrands:id' , element:<ProtectedRoute><FilterBrands/></ProtectedRoute>}]},
    {path:'products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id/:category' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'chekout' , element: <ProtectedRoute><ChekOut/></ProtectedRoute>},
    {path:'orders' , element: <ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>,children:[
      {path:'filtercategory' , element: <ProtectedRoute><FilterCategory/></ProtectedRoute>}]},
    {path:'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'*' , element: <Notfound/>},
    
  ]}
])
function App() {
  const [count, setCount] = useState(0)

  return <QueryClientProvider  client={query}>
    <UserContextProvider>
    <CounterContextProvider>
      <CartContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
        <Toaster/>
      </CartContextProvider>
  </CounterContextProvider>
  </UserContextProvider>

  </QueryClientProvider>  
}

export default App
