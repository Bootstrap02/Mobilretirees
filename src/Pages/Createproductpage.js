import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import {Minifooter} from '../Components/Subheaders';
import {Secondheader} from '../Components/Subheaders';
import {Firstheader} from '../Components/Subheaders';
import Footer from '../Components/Footer';
import ProductsNav from '../Components/Sellsomething/Products/Nav';
import ServicesNav from '../Components/Sellsomething/Services/Nav';
import { Pricetips, Purchasetips, Bulkgoodstips } from '../Modals/Tips';
// import { Mediumadlink1, Mediumadlink2, Mediumadlink3 } from '../Modals/Adslinks';

export const Createproductpage = () => {

  const activeButton ={
 backgroundColor: '#FEBD69',
 color: 'black',
 fontWeight: 'bold',
 padding: '5px',
//  borderRadius: '6px 0 0 6px '
  };

  const inActiveButton ={
 backgroundColor: 'gray',
 color: 'white',
 fontWeight: 'bold',
 padding: '5px',
//  borderRadius: ' 0 6px 6px 0'
  }

  const [activeTip, setActiveTip] = useState(null);
  const [activeComponent, setActiveComponent] = useState('ProductsNav'); // Initial active component

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
  };

  

  const handleButtonClick = (componentName,) => {
    setActiveComponent(componentName);
  };


    
  const renderComponent = () => {
    switch (activeComponent) {
      case 'ProductsNav':
        return <ProductsNav />;
      case 'ServicesNav':
          return <ServicesNav />;
      default:
        return null;
    }
  };  
  
  // const [activeAdslinkmedium, setActiveAdslinkmedium] = useState(null);

  // const closeAdslinkmedium = () => {
  //     setActiveAdslinkmedium(false);
  // };
  
  // const adslinkmediumArray = ['Studyabroad', 'Auctionedgoods', 'Boostsales'];
  // const getRandomAdlinkmedium = () => adslinkmediumArray[Math.floor(Math.random() * adslinkmediumArray.length)];const selectAdslinkmedium = Math.floor(Math.random() * 3); 
  // useEffect(() => {
  //     const displayRandomAdlinkmedium = () => {
  //       const randomAdlinkmedium = getRandomAdlinkmedium();
  //       setActiveAdslinkmedium(randomAdlinkmedium);
  //     };
  
  //     // Display a random tip 30 seconds after the page mounts
  //     const displayAdlinkmediumTimeout = setTimeout(() => {
  //        displayRandomAdlinkmedium();
  //     }, 600000);

  
  //     // Change the tip every 90 seconds
  //     const changeAdlinkmediumInterval = setInterval(() => {
  //       displayRandomAdlinkmedium();
  //     }, 90000);
  
  //     // Clear the interval when the component unmounts
  //     return () => {
  //       clearTimeout(displayAdlinkmediumTimeout);
  //       clearInterval(changeAdlinkmediumInterval);
  //     };
  //   }, []); // Empty dependency array ensures that this effect runs only once on mount
  
  // let adlinkmediumComponent = null;
  
  //   if (activeAdslinkmedium === 'Studyabroad') {
  //     adlinkmediumComponent = <Mediumadlink1 closeAdslink={closeAdslinkmedium} />;
  //   } else if (activeAdslinkmedium === 'Auctionedgoods') {
  //     adlinkmediumComponent = <Mediumadlink2 closeAdslink={closeAdslinkmedium} />;
  //   } else if (activeAdslinkmedium === 'Boostsales') {
  //     adlinkmediumComponent = <Mediumadlink3 closeAdslink={closeAdslinkmedium} />;
  //   }

    return (
      <div className='w-[100%]'>
         <div className="w-[100%] max-lg:hidden flex flex-col justify-center bg-[#0C0908]">
        <div className='w-[20%]  max-lg:w-[30%] all-round-tips rounded-lg bg-[rgba(255, 255, 255, 0.8)]'>
   
</div>
{/* <div style={{zIndex:"7000"}} className='w-[70%] all-round-adslinksmedium max-lg:hidden rounded-lg'>
  {adlinkmediumComponent}
</div> */}
<div className=''><Secondheader/></div>

 <div className='flex mt-[12rem] border-2 border-white w-[fit-content] rounded-[6px] mx-4'>
  <button className='' style={activeComponent === 'ProductsNav' ? activeButton : inActiveButton} 
  onClick={() => handleButtonClick('ProductsNav')}>Products</button>
  <button className='' style={activeComponent === 'ServicesNav' ? activeButton : inActiveButton} 
  onClick={() => handleButtonClick('ServicesNav')}>Services</button>
 </div>
          <div className= 'w-[100%]'>{renderComponent()}</div>
          <Footer/>
        </div>

        <div className="w-[100%] hidden max-lg:flex flex-col justify-center bg-[#0C0908]">
        <div className='w-[20%]  max-lg:w-[30%] mobile-all-round-tips rounded-lg bg-[rgba(255, 255, 255, 0.8)]'>
   
</div>
{/* <div style={{zIndex:"7000"}} className='w-[100%] hidden max-lg:block mobile-all-round-adslinksmedium  rounded-lg'>
  {adlinkmediumComponent}
</div> */}
<div className=''><Secondheader/></div>

 <div className='flex mt-[6rem] border-2 border-white w-[fit-content] rounded-[4px] mx-2'>
  <button className='' style={activeComponent === 'ProductsNav' ? activeButton : inActiveButton} 
  onClick={() => handleButtonClick('ProductsNav')}>Products</button>
  <button className='' style={activeComponent === 'ServicesNav' ? activeButton : inActiveButton} 
  onClick={() => handleButtonClick('ServicesNav')}>Services</button>
 </div>
          <div className= 'w-[100%]'>{renderComponent()}</div>
          <Footer/>
        </div>
      </div>
     
    );
  
};


