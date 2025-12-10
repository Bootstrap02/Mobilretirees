import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../Components/Categories.js';
import { Trendingproducts,  Latestproducts } from '../Components/Trendingproducts.js';

const Home = () => {
  let universities = JSON.parse(localStorage.getItem("universities"));

  if (!universities) {
    universities = {
      label: "All Universities",
      value: "All Universities",
     };
    localStorage.setItem("universities", JSON.stringify(universities));
  }

  

  return (
    <div className='container mb-[5rem]'>
     
      <div className='max-lg:hidden'>
  <h2 className='header text-xl my-4 text-white'><strong>Categories</strong></h2>
  <div style={{ height: '500px', overflowY: 'auto' }} className='container mb-4 '>
    <Categories className="" />
  </div>
 
      <br />
      <h2 className=' header text-xl my-4 text-white'><strong>Trending Products</strong></h2>
      <Trendingproducts className='mb-4'/>
      <br /> <br/>
      <h2 className=' header text-xl my-4 text-white'><strong>Latest Arrivals</strong></h2>
      <Latestproducts className='mb-4' />  
      </div>
      <div className='container hidden max-lg:block '>
      <h2 className=' header text-xl my-2 text-white'><strong>Categories</strong></h2>
      <div className='w-[100%] mb-4 '>
          <Categories className="" />
      </div>
      <br />
      <h2 className=' header text-xl my-4 text-white'><strong>Trending Products</strong></h2>
      <Trendingproducts className='mb-4'/>
      <br /> <br/>
      <h2 className=' header text-xl my-4 text-white'><strong>Latest Arrivals</strong></h2>
      <Latestproducts className='mb-4' />  
      </div>
      
    </div>
  )
}

export default Home;
