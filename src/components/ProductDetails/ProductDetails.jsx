import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Style from "./ProductDetails.module.css";
import { CartContext } from "../../Context/CartContext"; // Assuming you have a CartContext for addProduct
import { ClimbingBoxLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addProductToCart , currentProdcutId , } = useContext(CartContext)
  // const { addProduct } = useContext(CartContext); // Getting addProduct from CartContext
  let { id, category } = useParams();
  const [loding, setisLoding] = useState(false)


  let letToast = () =>{
    toast.success('Product added to cart successfully');
  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // setisLoding(false)
        setProductDetails(data.data);
        // console.log(data);
      })
      .catch((error) => {
        // setisLoding(false)
        console.error("Error fetching product details:", error);
      });
  }

  function getRelatedProducts(category) {
    
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        // setisLoding(false)
        let allProducts = data.data;
        let related = allProducts.filter((product) => product.category.name === category);
        setRelatedProducts(related);

      })
      .catch((error) => {
        // setisLoding(false)
        console.error("Error fetching related products:", error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);


  return (
    <>
      <div className="row my-8">
        <div className="w-1/4">
          {productDetails && (
            <Slider {...settings}>
              {productDetails?.images?.map((src, index) => (
                <img key={index} className="w-full" src={src} alt={productDetails.title} />
              ))}
            </Slider>
          )}
        </div>
        <div className="w-3/4 p-6">
          <h1 className="text-lg font-medium text-gray-800">{productDetails?.title}</h1>
          <p className="font-light text-gray-600 mt-2">{productDetails?.description}</p>
          <div className="flex mt-4 justify-between">
            <span>{productDetails?.price} EGP</span>
            <span>{productDetails?.ratingAverage} <i className="fas fa-star text-yellow-400"></i></span>
          </div>
          <button onClick={() => addProductToCart(productDetails)} className="btn mt-4">
          {currentProdcutId === productDetails?.id && loding?
          <i className="fas fa-spinner fa-spin"></i>:"Add To Cart"}
          </button>
        </div>
      </div>



      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-1/6 px-4">
            <div className="product py-4">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <img className="w-full" src={product.imageCover} alt={product.title} />
                <span className="block font-light mt-2 text-green-600">{product.category.name}</span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(' ').slice(0, 2).join(" ")}</h3>
                <div className="flex justify-between">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingAverage} <i className="fas fa-star text-yellow-400"></i></span>
                </div>
                
              </Link>
              <button  onClick={()=> addProductToCart(productDetails)} className="btn">
                {currentProdcutId === productDetails && toast && loding?<i className="fas fa-spinner fa-spin"></i>:"Add To Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
