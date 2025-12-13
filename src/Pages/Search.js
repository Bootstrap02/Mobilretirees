import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import {Searchcategories} from '../Components/Mobilecategories.js';
import { Productcard } from '../Components/Productcards.js';
import Mobilesearch from '../Components/Mobilesearch.js';
import { Pricetips, Purchasetips, Bulkgoodstips } from '../Modals/Tips';
import { Secondheader } from '../Components/Subheaders.js';
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import Footer from '../Components/Footer.js'; 
import { Loginmodal } from '../Modals/Pages/Signin.js';
import { Tokenerrormodal, Signedinmodal } from '../Modals/Forms.js';




const Search = () => {
  const {university, title} = useParams()
  const navigate =  useNavigate();
  const [activeButtonIndex, setActiveButtonIndex] = useState('1');
  const [pageNumber, setPageNumber] = useState(1);
  const [targetValue, setTargetValue] = useState('');
  const [noProducts, setNoProducts] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [loginSuccessModal, setLoginSuccessModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const universities = JSON.parse(localStorage.getItem('universities'));
  const searchKeyword = JSON.parse(localStorage.getItem('searchkeyword'));
  const searchedProducts = JSON.parse(localStorage.getItem('searchedproducts'));
  const [slicedProducts, setSlicedProducts] = useState(); // New state for sliced products

  const active = {
    backgroundColor: '#FEBD69',
    border: "black 1px solid",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 15px",
    color: "black",
  };
  const inactive = {
    fontWeight: "bold",
    color: "#646161",
  };

   useEffect(() => {
      setSlicedProducts(searchedProducts.slice(0, 15));
  }, []);

  const openLoginModal= ()=>{
    setLoginModal(true)
  };
  const closeLoginModal= ()=>{
    setLoginModal(false)
  };
  const openLoginError= ()=>{
    setLoginError(true)
  };
  const closeLoginError= ()=>{
    setLoginError(false)
  };
  const openLoginSuccessModal= ()=>{
    setLoginSuccessModal(true)
  };
  const closeLoginSuccessModal= ()=>{
    setLoginSuccessModal(false)
  };

  const handleChange = (e) => {
    setTargetValue(e.target.value); // Update state with input value
  };
  const searchPage = async (e) => {
    e.preventDefault();
  
    const pageValueNum = Number(targetValue); // explicitly convert to number
    const end = pageValueNum * 15;
    const start = end - 15;
    
    await setActiveButtonIndex(null);
    await setPageNumber(pageValueNum);
  
    if (start >= searchedProducts.length) {
      await setNoProducts(true);
      console.log(noProducts); // this will likely still show the old value due to async state
    } else {
      await setSlicedProducts(searchedProducts.slice(start, end));
      await setNoProducts(false); // just to be safe
    }
  };
  
  const handleSearch= async(index, num) => {
    const end = num * 15;
    const start = end - 15;
    await setActiveButtonIndex(index);
    await setPageNumber(num);
    if(start.length > searchedProducts.length) {
      await setNoProducts(true);
     await console.log(noProducts)
     }else{
       await setSlicedProducts(searchedProducts.slice(start, end));
     }
  }

  const NEW_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&condition=new`;
  const NEW_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&condition=new`;
  const REFURBISHED_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&condition=refurbished`;
  const REFURBISHED_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&condition=refurbished`;
  const USED_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&condition=used`;
  const USED_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&condition=used`;
  const NEWEST_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&sort=createdAt`;
  const NEWEST_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&sort=createdAt`;
  const OLDEST_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&sort=-createdAt`;
  const OLDEST_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&sort=-createdAt`;
  const CHEAPEST_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&sort=price`;
  const CHEAPEST_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&sort=price`;
  const MOST_EXPENSIVE_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=${searchKeyword}&sort=-price`;
  const MOST_EXPENSIVE_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${searchKeyword}&sort=-price`;
  const SEARCH_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${university}&search=${title}`;
  const SEARCH_API_KEYS = `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=${title}`;

  useEffect(() => {
    const Reload = async()=> {
      const response = await axios.get(universities.value === "All Universities" ? SEARCH_API_KEYS : SEARCH_API_KEY);
        await localStorage.setItem('searchedproducts', JSON.stringify(response.data.data));
       
        navigate(`/search/${university}/${title}`)
    }
    Reload()
  }, [title]);

  const Filterproducts = async (Apikey) => {
      
    try {
        const response = await axios.get(Apikey);
        console.log(response.data);
        await localStorage.setItem('searchedproducts', JSON.stringify(response.data.data));
        window.location.reload(); // Reload the page after updating localStorage
      
    } catch (error) {
      console.error('Error moving forward:', error);
      alert("No product found!");
    }
  };

  const [activeTip, setActiveTip] = useState(null);

  const closeTips = () => {
      setActiveTip(false);
  };
  
  const tipsArray = ['Pricetips', 'Purchasetips', 'Bulkgoodstips'];
  const getRandomTip = () => tipsArray[Math.floor(Math.random() * tipsArray.length)];const selectTips = Math.floor(Math.random() * 3); 
  useEffect(() => {
      const displayRandomTip = () => {
        const randomTip = getRandomTip();
        setActiveTip(randomTip);
      };
  
      // Display a random tip 30 seconds after the page mounts
      const displayTipTimeout = setTimeout(() => {
        displayRandomTip();
      }, 30000);
  
      // Change the tip every 10 minutes
      const changeTipInterval = setInterval(() => {
        displayRandomTip();
      }, 600000);
  
      // Clear the interval when the component unmounts
      return () => {
        clearTimeout(displayTipTimeout);
        clearInterval(changeTipInterval);
      };
    }, []); // Empty dependency array ensures that this effect runs only once on mount
  
  let tipComponent = null;
  
    if (activeTip === 'Pricetips') {
      tipComponent = <Pricetips closeTips={closeTips} />;
    } else if (activeTip === 'Purchasetips') {
      tipComponent = <Purchasetips closeTips={closeTips} />;
    } else if (activeTip === 'Bulkgoodstips') {
      tipComponent = <Bulkgoodstips closeTips={closeTips} />;
    }


  // const {category} = props;
  return (
    <div className='w-[100%] bg-[#0C0908]'>
  {/* Other meta tags */}
  <meta property="og:url" content="https://campusify.net/search" />
  <meta property="og:title" content="Search: Find any product on Campusify" />
  <meta
    property="og:description"
    content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery."
  />
  <meta property="og:image" content="https://res.cloudinary.com/dtthdh8tb/image/upload/v1728298881/IMG-20240227-WA0015_wdparn.jpg" />
  {/* Add other Open Graph meta tags like og:site_name */}
    <meta property="og:title" content="Campusify" />
    <meta property="og:description" content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery." />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://campusify.net/search" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Campusify" />
    <meta name="twitter:description" content="The largest student-to-student online marketplace in Nigeria. Buy and sell anything from your fellow students. Textbooks, electronics, clothes, and more! Safe and secure platform with guaranteed delivery." />
    <meta name="twitter:image" content="" />
      <div className='w-[100%] flex flex-col gap-2 max-lg:hidden'>
      <div className='w-[15%]  max-lg:w-[20%] all-round-tips rounded-lg bg-[rgba(255, 255, 255, 0.8)]'>
   
</div>
<div className='mb-[7rem]'><Secondheader/></div>

      <div className ='flex justify-center gap-[2rem] items-center text-white m-4'>
        <div className=' p-2 flex justify-start items-center'>
        <div  className='p-2 m-2 rounded-lg '>Campusify</div>
        /
        <div className='p-2 m-2 rounded-lg '>{searchKeyword}</div>
      </div>
      <div className='text-2xl text-bold'><h1><strong>{searchKeyword} in {universities.value}</strong></h1></div>
    </div>
      <div className='flex gap-3 items-start'>
        <div className='flex flex-col gap-2 w-[40%]'>
        <div className='bg-[#f5f5f5] shadow-sm my-2'>
          <div className=' text-white text-xl p-1 text-center bg-black'><h2>Categories</h2></div>
          <div className='container'><Searchcategories/></div>
        </div>
        

        <div className='bg-[#f5f5f5] shadow-sm my-2'>
          <div className='bg-black text-white text-xl p-1 text-center '><h2>Condition </h2></div>
          <div className='flex gap-2 flex-col'>
           <div onClick={()=>Filterproducts(universities.value === "All Universities" ? NEW_API_KEYS : NEWEST_API_KEY)} className='border flex  gap-1 p-2'>
          <input type='radio' />
           <label>- New</label>
           </div>
           <div onClick={()=>Filterproducts(universities.value === "All Universities" ? REFURBISHED_API_KEYS : REFURBISHED_API_KEY)} className='border flex  gap-1 p-2'>
          <input type='radio' />
           <label>- Refurbished</label>
           </div>
           <div onClick={()=>Filterproducts(universities.value === "All Universities" ? USED_API_KEYS : USED_API_KEY)} className='border flex  gap-1 p-2'>
          <input type='radio' />
           <label>- Used</label>
           </div>
          </div>
        </div>
        </div>
        <div className= 'flex flex-col gap-1'>
        <div className='flex justify-center items-center'>
          <div className='flex px-1 py-3 shadow-lg items-center text-white'>
          <div>Sort by:</div>
          <button onClick={()=>Filterproducts(universities.value === "All Universities" ? NEWEST_API_KEYS : NEWEST_API_KEY)} className='bg-black text-white rounded-sm border-2 border-[#FFD700] p-2 m-2'>Newest</button>
          <button onClick={()=>Filterproducts(universities.value === "All Universities" ? OLDEST_API_KEYS : OLDEST_API_KEY)} className='bg-black text-white rounded-sm border-2 border-[#FFD700] p-2 m-2'>Oldest</button>
          <button onClick={()=>Filterproducts(universities.value === "All Universities" ? CHEAPEST_API_KEYS : CHEAPEST_API_KEY)} className='bg-black text-white rounded-sm border-2 border-[#FFD700] p-2 m-2'>Cheapest</button>
          <button onClick={()=>Filterproducts(universities.value === "All Universities" ? MOST_EXPENSIVE_API_KEYS : MOST_EXPENSIVE_API_KEY)} className='bg-black text-white rounded-sm border-2 border-[#FFD700] p-2 m-2'>Most Expensive</button>
          </div>
        </div>
        <div className='flex-wrap flex justify-center'><Productcard slicedProducts={slicedProducts} openLoginError={openLoginError} closeLoginError={closeLoginError} openLoginModal={openLoginModal}/></div>
        <div className='flex justify-end max-lg:hidden items-center gap-4 m-4'>
        <div className='flex justify-center items-center gap-4 '>
          <button><IoChevronBack className='categories-react-icons-arrow' /></button>
          <button
              onClick={() =>handleSearch('1', 1)}
              style={activeButtonIndex === '1' ? active : inactive}
            >
              1
            </button>
          <button
              onClick={() =>handleSearch('2', 2)}
              style={activeButtonIndex === '2' ? active : inactive}
            >
              2
            </button>
          <button
              onClick={() =>handleSearch('3', 3)}
              style={activeButtonIndex === '3' ? active : inactive}
            >
              3
            </button>
          <button
              onClick={() =>handleSearch('4', 4)}
              style={activeButtonIndex === '4' ? active : inactive}
            >
              4
            </button>
          <button
              onClick={() =>handleSearch('5', 5)}
              style={activeButtonIndex === '5' ? active : inactive}
            >
              5
            </button>
          <button
              onClick={() =>handleSearch('6', 6)}
              style={activeButtonIndex === '6' ? active : inactive}
            >
              6
            </button>
          <button
              onClick={() =>handleSearch('7', 7)}
              style={activeButtonIndex === '7' ? active : inactive}
            >
              7
            </button>
          <button
              onClick={() =>handleSearch('8', 8)}
              style={activeButtonIndex === '8' ? active : inactive}
            >
              8
            </button>
          <button
              onClick={() =>handleSearch('9', 9)}
              style={activeButtonIndex === '9' ? active : inactive}
            >
              9
            </button>
          <button><IoChevronForwardOutline className='categories-react-icons-arrow' /></button>
          <button><IoChevronForwardOutline className='categories-react-icons-arrow' /></button>
        </div>
        <form className='flex justify-center items-center gap-4' onSubmit={searchPage}>
      <p className='text-[8px] text-[#FEBD69]'>Go to page</p>
      <input
        className='p-2 rounded-md w-[12%]'
        type="number"
        value={targetValue} // Bind state to the input value
        onChange={handleChange} // Update state on input change
      />
      <button type="submit" className='bg-white p-2 rounded-md'>Go</button>
    </form>
      </div>
        </div>
      </div>
      <Footer/>
    </div>
    <div className='hidden max-lg:block'>
    <div style={{zIndex:"4000"}} className='w-[25%]  max-lg:w-[30%] mobile-all-round-tips rounded-lg bg-[rgba(255, 255, 255, 0.8)]'>
   
</div>

  <Mobilesearch />
</div>
{loginModal &&  <div className='w-[25%] rounded-md flex justify-center ' style={{position:'fixed', top:'10%', left:'0', zIndex:'4000',}}> <Loginmodal closeModal={closeLoginModal} closeLoginSuccessModal={closeLoginSuccessModal} openLoginSuccessModal={openLoginSuccessModal}/></div>}
  {loginSuccessModal &&  <div className=' rounded-md flex justify-center ' style={{position:'fixed', top:'10%', left:'0', zIndex:'4000',}}> <Signedinmodal /></div>}
  {loginError &&  <div className='container rounded-md flex justify-center ' style={{position:'fixed', top:'0', right:'20', zIndex:'4000'}}> <Tokenerrormodal /></div>}

    </div>

  )
}

export default Search