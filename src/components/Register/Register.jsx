import React,{useContext, useEffect,useState} from "react"
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let {setUserLogin} = useContext(UserContext)

  let validationScehema = Yup.object().shape({
    name:Yup.string().min(3 ,"Name MinLingth Is 3").max(10 , "Name MaxLingth Is 10").required("Name Is Required"),
    email:Yup.string().email("Email Is InValid").required("Email Is Required"),
    // phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be valid egyption number').required('email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password Must Start With UpperCase").required("Password Is Required"),
    rePassword:Yup.string().oneOf[Yup.ref("password") , "Password Or rePassword Must Be Match"]
  })





  const [apiError , setapiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
   function handleRegister(formValues) {
    setIsLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
    .then((response)=> {
      if (response.data.message === 'success') {
        localStorage.setItem('userToken' , response.data.token)
        setUserLogin(response.data.token)
        navigate('/')
        setIsLoading(false)
        console.log(formValues);
        console.log("Done");
      }
      console.log(response.data);
    })
    .catch( (apiResponse)=> {
      setIsLoading(false)
      setapiError(apiResponse?.response?.data?.message);
      console.log("Error");
    })
    // console.log(formValues);
    // console.log("register");


    // let {data} = await axios.post ( `https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
    // if (data.message == "success") {
    //   // law tamam 5osh
    //   console.log(data.message);
    //   navigate ("/")
    // }else{
    //   // Error ^_^
    // }
  }
  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },
    validationSchema:validationScehema,
    onSubmit:handleRegister
  })
    const [counter, setCounter] = useState(0)
    useEffect(()=>{}, [])
  return <>
  <div className="py-36 mx-auto max-w-lg">
  {apiError ?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
    {apiError}
  </div> :null}


  <h2 className="text-3xl font-bold mb-6 text-green-600">Register Now</h2>
  <form onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input id="name" value={formik.values.name} onChange={formik.handleChange}  onBlur={formik.handleBlur} type="text" name="name"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
  </div>
  {formik.errors.name && formik.touched.name?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
  {formik.errors.name}
  </div>:null}

  <div className="relative z-0 w-full mb-5 group">
      <input id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email Address :</label>
  </div>
  {formik.errors.email && formik.touched.email?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
  {formik.errors.email}
  </div>:null}

  <div className="relative z-0 w-full mb-5 group">
      <input id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" name="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone :</label>
  </div>
  {formik.errors.phone && formik.touched.phone?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
  {formik.errors.phone}
  </div>:null}

  <div className="relative z-0 w-full mb-5 group">
      <input id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
  </div>
  {formik.errors.password && formik.touched.password?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
  {formik.errors.password}
  </div>:null}

  <div className="relative z-0 w-full mb-5 group">
      <input id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword :</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-500" role="alert">
  {formik.errors.rePassword}
  </div>:null}

  <div className="flex items-center ">
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Submit'}
    </button>
    <p className="ps-5 ">Did You Have Account  ? <span className="font-semibold"><Link to={"/login"}> Login Now </Link></span></p>
  </div>
  </form>
  </div>
  </>
}