import React,{useEffect,useState} from "react"
import Style from "./Footer.module.css";
import amazon from "../../assets/images/Amazon Pay.png"
import american from "../../assets/images/american Express.png"
// import mastercard from "../../assets/mastercard_82049.webp"
import paypal from "../../assets/images/paypal.webp"
import apple from "../../assets/images/apple.jpg"
import googlePlay from "../../assets/images/Google_Play.png"

export default function Footer() {
    const [counter, setCounter] = useState(0)

    useEffect(()=>{}, [])
  return <>

    <div className=" left-0 bottom-0 right-0 bg-gray-100 py-8">
      <div className="w-11/12 m-auto ">
        <h1 className="text-green-500 font-semibold text-2xl">Get The FreshCart App</h1>
        <p className="font-light">We Will Send You a Link Open It On Your Phone to Download The App .</p>

          <div className="mt-3 w-full flex">
            <input className="w-4/5 rounded-md py-2" type="text" placeholder="   Email ..."/>
              <div className="w-1/5">
              <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md   sm:w-auto ms-5 px-24 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share App Link</button>
              </div> 
          </div>

          <div className="flex mt-12 justify-between me-5">
            <div className="flex">
            <p className=" text-green-500 font-medium text-2xl">Payment Partners</p>
            <ul className=" flex items-center px-5 gap-8">
              <li>
                <img width={100}  src={amazon} alt="amazon-payment"/>
              </li>
              <li>
                <img width={50} src={american} alt="amazon-payment"/>
              </li>
              <li>
                <img width={100} src={paypal} alt="amazon-payment"/>
              </li>
            </ul>
            </div>
            
            
            <div className="flex">
              <p className=" text-green-500 font-medium text-2xl">Get Deliveries FreshCart</p>
              <ul className="flex items-center px-5 gap-8">
              <li>
                <img width={120} src={apple} alt="amazon-payment"/>
              </li>
              <li>
                <img width={120} src={googlePlay} alt="amazon-payment"/>
              </li>
            </ul>
            </div>

          </div>
      </div>
    </div>

  </>
}
