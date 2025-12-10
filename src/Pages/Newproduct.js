import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  useDispatch, } from 'react-redux';
import axios from 'axios';
import { Safetytips } from '../Modals/General/Safetytips.js';
import { Addedtowishlist, Notaddedtowishlist } from '../Modals/Pages/Products.js'; 
import { BigLoader } from '../Modals/Loaders.js';
import {Helmet} from 'react-helmet';
import { TbCurrencyNaira } from 'react-icons/tb';
import Nav from '../Modals/General/Nav.js';
import Header from '../Components/Header.js';
import Footer from '../Components/Footer.js';


export const Newproduct = () => {
  const {id, title} = useParams();
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [buttonloading, setButtonloading] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistfailed, setWishlistfailed] = useState(false);
  const [addWishlistOrAds, setAddWishlistOrAds] = useState(true);
  const [safety, setSafety] = useState(false);
   const [signin, setSignin] = useState(false);
    const [nav, setNav] = useState(false);
  const modalstyle = {
    position: 'fixed',
    top: '10%',
    right: '10%',
    zIndex: '4000',
    width: '40%'
  }
  const GET_PRODUCT_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/getproduct/${id}`;

  const openButtonloading = () => {
    setButtonloading(true);
  };
  const closeButtonloading = () => {
    setButtonloading(false);
  };
  const openWishlist = () => {
    setWishlist(true);
  };
  const closeWishlist = () => {
    setWishlist(false);
  };
  const openWishlistfailed = () => {
    setWishlistfailed(true);
  };
  const closeWishlistfailed = () => {
    setWishlistfailed(false);
  };
  const openSafety = () => {
    setSafety(true);
  };
  const closeSafety = () => {
    setSafety(false);
  };
  const openNav = () => {
    setNav(true);
  };
  const closeNav = () => {
    setNav(false);
  };
  const openLoginModal= ()=>{
    setSignin(true)
  };
  const closeLoginModal= ()=>{
    setSignin(false)
  };


  useEffect(() => {
    const Reload = async()=> {
      const response = await axios.get(GET_PRODUCT_API_KEY);
         await localStorage.setItem('newproduct', JSON.stringify(response.data));
       navigate(`/newproduct/${id}/${title}`)
    }
    Reload()
  },[]);

  const accessedToken =   JSON.parse(localStorage.getItem('userData'));
  
  const WISHLIST_API_KEY = 'https://campusbuy-backend-nkmx.onrender.com/addwishlist';
  const axiosInstance = axios.create({
    baseURL: 'https://campusbuy-backend-nkmx.onrender.com', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json',
      // Other default headers can be added here
    },
  });
  
  // Function to set JWT token in the headers
  const setAuthToken = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };
  
  // Use this function to set the token when the user logs in or the token is available
  if (accessedToken && accessedToken.accessToken){
    setAuthToken(accessedToken.accessToken);
  }  
  // Now, you can use axiosInstance for your requests with the token included in the headers
  
    
  const productState = JSON.parse(localStorage.getItem('newproduct'));
  
  const addWishlist = async () => {
    const accessedToken = JSON.parse(localStorage.getItem('userData'));
    openButtonloading();
    if (!accessedToken) {
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } else {
      try {
        const formData = new FormData();
        formData.append('productId', productState._id);

        const response = await axiosInstance.put(WISHLIST_API_KEY, formData);
        closeButtonloading()
        openWishlist();
        setTimeout(() => {
        closeWishlist();
      }, 4000);
      } catch (error){
        if(error.response){
          if (error.response.status === 403) {
            navigate('/signin')
            }else {
          openWishlistfailed();
          setTimeout(() => {
        closeWishlistfailed();
      }, 4000);
        console.error('Error creating your product:', error);
      // Handle error as needed
            }
       }
      }
          }
        };

        const openAds = () => {
          // Open the external ad link in a new tab using window.open()
          setAddWishlistOrAds(false)
          window.open('https://psolsumoo.net/4/8022756', '_blank');
        };
  
  
  const initialSelectedImage = productState ? productState.images[0] : null;
  const [selectedImage, setSelectedImage] = useState(initialSelectedImage);

  const openModals = () => {
      
    if (productState && productState.title) {
        dispatch({ type: 'EDIT_GENERAL_DETAILS', productDetails: productState });
    }else if(productState && productState.name){
      dispatch({ type: 'EDIT_GENERAL_SERVICE_DETAILS', serviceGeneralDetails: productState });
      dispatch({ type: 'TOGGLE_PRODUCT_AND_SERVICE', productToggle: "Service" });
    }
    navigate(`/editproductpage/${productState._id}/${productState.title || productState.name}`)
  };


  
  if (!productState) {
    return (
      <div>
        <h2 className="text-center">Product not found</h2>
      </div>
    );
  }
  

  return (
    <div className=" w-[100%] pt-[6rem] px-4 bg-[#0C0908]">
    <Header className='mb-[2rem] ' openNav={openNav} closeNav={closeNav}/>

      <Helmet>
  {/* Other meta tags */}
  <meta property="og:url" content="https://campusify.net/home" />
  <meta property="og:title" content="Products: Buy and Sell Anything on Campus (Nigeria)" />
  <meta
    property="og:description"
    content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery."
  />
  <meta property="og:image" content={productState.images[0]} />
  {/* Add other Open Graph meta tags like og:site_name */}
    <meta property="og:title" content="Campusify" />
    <meta property="og:description" content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery." />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://campusify.net/" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Campusify" />
    <meta name="twitter:description" content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery." />
    <meta name="twitter:image" content="" />
    </Helmet>
      <div className="container row max-lg:hidden mt-[5rem]">    
        <div className="col-3 flex flex-col gap-2 ">
        <div className="">
            <img src={selectedImage} alt="big_image" width={500} />
            </div>
            <div className=" w-[100%] flex gap-2 ">
          {Object.values(productState.images).map((image, index) => (
            <div  className=""
            key={index}
            style={{
              border: selectedImage === image ? '1px solid #FFD700' : 'transparent',
            }}
          >
            <img
              src={image}
              width={70} 
              alt="main_image"
              className=""
              onClick={() => setSelectedImage(image)}
            />
          </div>
          ))}
        </div> 
        </div>

        <div className="col-5 text-white">
            <div className="my-2">
              <h1 className=" text-2xl p-2">
                <strong>{productState.title || productState.name}</strong>
              </h1>
              <div className="my-2 flex flex-col gap-3 p-2 w-[80%]">
              <div className=""><strong>Description: </strong> {productState.description}</div>
                <div className=""><strong>{productState.title ? "Details: ": "Terms "} </strong> {productState.details || productState.terms}</div>
                <div className=""><strong>{productState.title ? "Brand: ": "Availability "} </strong> {productState.brand || productState.availability}</div>
                <div className=""><strong>{productState.title ? "Condition: ": "Area Coverage "} </strong> {productState.Condition || productState.coverage}</div>
                <div className=""><strong>{productState.title ? "Brand: ": "Availability "} </strong> {productState.brand || productState.availability}</div>
                {productState.title ? (
                  <div className='flex justify-between'>
                <div className=""><strong>Discount Price: </strong> <div className='flex flex-col gap-1'>{productState.promoPrice} <div className='text-[6px] text-gray-400'>{productState.promoQuantity}</div></div></div>
                  <div className='flex gap-2'><strong>Price: </strong><div className="text-2xl flex gap-1 text-[#FFD700]">
                    <TbCurrencyNaira className="naira" />
                    <h3 className="card-price-text text-2xl">{productState.price}</h3>
                </div>
                </div>
                </div>
                ) : (
                  <div className='my-2'>
                  <strong className='my-2'>Our Catalog:</strong> 
                  <div className='flex justify-between'>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className='text-sm'>{productState.service1}</strong> <p className='text-[6px]'>{productState.price1}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className='text-sm'>{productState.service2}</strong> <p className='text-[6px]'>{productState.price2}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className='text-sm'>{productState.service3}</strong> <p className='text-[6px]'>{productState.price3}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className='text-sm'>{productState.service4}</strong> <p className='text-[6px]'>{productState.price4}</p>
                  </div> 
                </div>
                </div>
                )}
                <div className=""><strong>{productState.title ? "Color: ": "Duration "} </strong> {productState.color || productState.duration}</div>
                <div className=""><strong>{productState.title ? "Business Status: ": "Our Location "} </strong> {productState.person || productState.sellerLocation}</div>
                <div className="">{productState.title ? (
                  <div><strong>Fault: </strong> {productState.fault}</div>) : null}</div>   
                
              </div>
          </div>
         
        </div>
        <div className="col-4 flex flex-col gap-4">
        <div className='flex gap-2'>
        <button onClick={ addWishlist}  className="btn btn-primary">{buttonloading ? (<div><BigLoader/></div>) : ('Add Wishlist')}</button>
        <button onClick={openModals}  className="btn btn-warning">Edit Product</button>
        <button onClick={openSafety}  className="btn btn-primary">Safety tips</button>
        </div>
        </div>
      </div>


      <div className="container hidden max-lg:block text-[8px]">
        <div className='flex gap 2 justify-center items-start'>
<div className="w-[45%] flex flex-col gap-2 ">
        <div className="">
            <img src={selectedImage} alt="big_image" width={160} />
            </div>
            <div className=" w-[100%] flex gap-2 ">
          {Object.values(productState.images).map((image, index) => (
            <div  className=""
            key={index}
            style={{
              border: selectedImage === image ? '1px solid #FFD700' : 'transparent',
            }}
          >
            <img
              src={image}
              width={25} 
              alt="main_image"
              className=""
              onClick={() => setSelectedImage(image)}
            />
          </div>
          ))}
        </div> 
        </div>

        <div className="w-[45%] text-white">
            <div className="my-2">
              <h1 className=" text-sm p-2">
                <strong>{productState.title || productState.name}</strong>
              </h1>
              <div className="my-2 flex flex-col gap-3 p-2 w-[80%]">
              <div className=""><strong>Description: </strong> {productState.description}</div>
                <div className=""><strong>{productState.title ? "Details: ": "Terms "} </strong> {productState.details || productState.terms}</div>
                <div className=""><strong>{productState.title ? "Brand: ": "Availability "} </strong> {productState.brand || productState.availability}</div>
                <div className=""><strong>{productState.title ? "Condition: ": "Area Coverage "} </strong> {productState.Condition || productState.coverage}</div>
                <div className=""><strong>{productState.title ? "Brand: ": "Availability "} </strong> {productState.brand || productState.availability}</div>
                {productState.title ? (
                  <div className='flex justify-between'>
                <div className=""><strong>Discount Price: </strong> <div className='flex flex-col gap-1'>{productState.promoPrice} <div className='text-[3px] text-gray-400'>{productState.promoQuantity}</div></div></div>
                  <div className='flex gap-2'><strong>Price: </strong><div className="text-sm flex gap-1 text-[#FFD700]">
                    <TbCurrencyNaira className="naira" />
                    <h3 className="card-price-text text-sm">{productState.price}</h3>
                </div>
                </div>
                </div>
                ) : (
                  <div className='my-2'>
                  <strong className='my-2'>Our Catalog:</strong> 
                  <div className='flex justify-between'>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className=''>{productState.service1}</strong> <p className='text-[3px]'>{productState.price1}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className=''>{productState.service2}</strong> <p className='text-[3px]'>{productState.price2}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className=''>{productState.service3}</strong> <p className='text-[3px]'>{productState.price3}</p>
                  </div>
                <div className="flex flex-col gap-2 w-20%">
                  <strong className=''>{productState.service4}</strong> <p className='text-[3px]'>{productState.price4}</p>
                  </div> 
                </div>
                </div>
                )}
                <div className=""><strong>{productState.title ? "Color: ": "Duration "} </strong> {productState.color || productState.duration}</div>
                <div className=""><strong>{productState.title ? "Business Status: ": "Our Location "} </strong> {productState.person || productState.sellerLocation}</div>
                <div className="">{productState.title ? (
                  <div><strong>Fault: </strong> {productState.fault}</div>) : null}</div>   
                  <div className='flex gap-2 text-[8px]'>
        <button onClick={ addWishlist}  className="p-2 bg-[#0d6efd] rounded-sm ">{buttonloading ? (<div><BigLoader/></div>) : ('Add Wishlist')}</button>
        <button onClick={openModals}  className="btn btn-warning">Edit Product</button>
        <button onClick={openSafety}  className="p-2 bg-[#0d6efd] rounded-sm ">Safety tips</button>
        </div>
              </div>
          </div>
         
        </div>
        </div>
         </div>
      {wishlist && <div style={modalstyle}><Addedtowishlist closeWishlist={closeWishlist}/></div>}
  {wishlistfailed && <div style={modalstyle}><Notaddedtowishlist closeWishlistfailed={closeWishlistfailed}/></div>} 
  {safety && <div style={modalstyle}><Safetytips closeSafety={closeSafety}/></div>}
  <div> <Footer/></div>
    </div>
  );
};

export default Newproduct;
