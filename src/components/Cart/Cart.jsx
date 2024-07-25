import React,{useContext, useEffect,useState} from "react"
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let {getLoggedUserCart , updateCartItemCount , deleteProductItem ,clearCart , setCart} = useContext(CartContext)
  const [cartDetails, setCartDetails ] = useState(null)
    const [counter, setCounter] = useState(0)
    
    async function getCartItems() {
      let response = await getLoggedUserCart();
      console.log(response.data);
      setCartDetails(response.data.data)
      // console.log(response.data.data);
    }


     async function updateCartCount(productId , count) {
      let response = await updateCartItemCount(productId , count);
      // console.log(response.data.data);
      setCartDetails(response.data.data)
      setCart(response.data)
    }
     async function deleteItem(productId) {
      let response = await deleteProductItem(productId);
      console.log(response.data.data);
      setCartDetails(response.data.data)
      setCart(response.data)
    }
     async function delCart() {
      let response = await clearCart();
      // console.log(response.data.data);
      setCartDetails(response.data.data)
      setCart(response.data)

    }


    useEffect(()=>{
      getCartItems();
    }, [])
  return <>



<div className="relative my-14 overflow-x-auto shadow-md sm:rounded-lg">
  <h2 className="text-3xl  text-green-600 font-medium ms-5 mb-4">Shopping Cart</h2>
  <h2 className="text-xl  text-slate-600 font-medium ms-5 mb-2">Total Cart Price {cartDetails?.totalCartPrice} EGP</h2>
  <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-black uppercase bg-gray-50  dark:text-black">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartDetails?.products.map((product)=>      <tr key={product._id} className="bg-white border-b   ">
        <td key={product.product.id} className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> updateCartCount(product.product.id , product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200  dark:text-gray-400 dark:border-gray-600  dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <span>{product.count}</span>

            <button onClick={()=> updateCartCount(product.product.id , product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:border-gray-600  dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-black ">
          <span>{product.price * product.count} EGP</span>
        </td>
        <td className="px-6 py-4">
          <span onClick={()=> deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>)}
    </tbody>
    
  </table>
  <Link to={`/chekout`}>
    <button  className="btn w-full bg-green-600 text-white">CheckOut Now</button>
  </Link>
</div>
<div onClick={ ()=>  delCart()}  className=" flex items-center">{cartDetails !==null?<button  className="text-3xl font-bold mb-6 text-green-500 border  rounded  py-2 px-5">Clear Cart</button>:null}</div>

  </>
}
