import React,{useEffect,useState} from "react"
import Style from "./CategoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay:true
  };


  const [categories, setCategories] = useState([])
  function getCategories() 
  {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   .then(({data})=>{
    setCategories(data.data)
    console.log();
    
   })
   .catch((error)=>{

   })
  }
    const [counter, setCounter] = useState(0)

    useEffect(()=>{
      getCategories()
    }, [])
  return <>
  <div className="" >
    <h2 className="py-3 text-gray-800 font-semibold text-lg">Shop Popular Categories</h2>
  <Slider {...settings}>
      {categories.map((category) => <div key={category._id}> <img className="category-img w-full" src={category.image} alt={category.name}/>
      <h3 className="font-light mt-1">{category.name}</h3>
      </div>
      )}
    </Slider>
  </div>
  </>
}
