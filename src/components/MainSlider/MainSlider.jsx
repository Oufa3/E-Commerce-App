import React,{useEffect,useState} from "react"
import Style from "./MainSlider.module.css";
import Slider from "react-slick";
import mainSlider from "../../assets/images/slider-image-3.jpeg"
import mainSlider2 from "../../assets/images/grocery-banner-2.jpeg"
import mainSlider3 from "../../assets/images/grocery-banner.png"
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

    const [counter, setCounter] = useState(0)

    useEffect(()=>{}, [])
  return <>
  <div className="row my-5">
    <div className="w-3/4">
    <Slider {...settings}>
    <img src={mainSlider} className="w-full h-[400px]"/>
    <img src={mainSlider2} className="w-full h-[400px]"/>
    <img src={mainSlider3} className="w-full h-[400px]"/>
    </Slider>
    </div>
    <div className="w-1/4">
    <img src={slider1} className="w-full h-[200px]"/>
    <img src={slider2} className="w-full h-[200px]"/>
    </div>
  </div>
  </>
}
