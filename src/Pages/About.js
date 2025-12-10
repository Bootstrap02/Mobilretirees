import React, {useState} from 'react';
import { NavLink, useNavigate} from 'react-router-dom'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Nav from '../Modals/General/Nav';



export const About= ()=> {
    const navigate = useNavigate();
    const accessedToken =   JSON.parse(localStorage.getItem('userData'));
const [signin, setSignin] = useState(false);
  const [nav, setNav] = useState(false);

    const postProduct = ()=> {
      if(accessedToken){
        navigate('/createproductpage');
      }else{
        navigate('/signin')
      }
  
    }
    const openNav = () => {
        setNav(true);
      };
      const closeNav = () => {
        setNav(false);
      };

return(
    <div className=' w-[100%] '>
        <Header className='mb-[2rem] bg-black'  openNav={openNav} closeNav={closeNav}/>
        
      <div className='w-[100%] bg-black p-4'>
<div className='my-[6rem] max-lg:m-[3rem]  text-white '>
<div className=' text-2xl text-center mb-6'> <p><strong> About Us</strong></p></div>
<div className=' flex justify-center gap-2'><NavLink to='/'>Home ||</NavLink> <NavLink to='/about'>About</NavLink></div>
</div>
</div>
   <div className=' w-[100%] max-lg:mb-6'>
    <div className='w-[100%]'>
      
    

    <div className='mt-4 p-[4rem] max-lg:mt-2 max-lg:p-[2rem] '>
        <div className='mb-4 text-2xl max-lg:text-xl max-lg:mb-1'><strong>We bring commerce to your doorstep by 
connecting trade with your immediate environment
.</strong> </div>
        <div>
        At campusify, we focus on connecting buyers and sellers from the same locality. This means that the seller or buyer are never far away from each other. In this way, we eliminate one of the major hinderances of trade <strong>DISTANCE</strong>. Efficient business to business websites exist and they do a good job. However, Distance in trade is the problem we are trying to solve. Normally, Logistics services look like the perfect answer to distant trading. However, logistics cost more money, wastes time and could develop complications. It is always easier and more convenient for both the buyer and the seller if there is no distance between them. Many times people have gone through the difficulty of buying things far away because they could not find them nearby. It may not mean it was not available nearby, they just could not connect with the sellers. What we wish to solve are the problems associated with distance trading.  We wish to connect buyers and sellers within their locality, together  and our focus is in the tertiary institutions.
     Also, second hand products trading is a vibing market. It has thrived always in the background looking for an outlet. A lot of people have things they do not need anymore and wish they could sell but have no way of putting it out there for buyers to see. This is another problem we are here to solve. We are launching a platform where people can put things directly to people who really need those items.( The items a student possesses are most likely what another student needs). We are connecting trade between a student and another student. These are people in similar situations. It makes trading likely and when done with us, it becomes possible and easy.
Campusify.Inc, launched this month, is a pioneering business-to-business platform designed exclusively for tertiary institutions. Our mission is to foster a dynamic environment for students to seamlessly buy and sell goods and services within their academic community. Unlike traditional e-commerce platforms, Campusbuy does not coordinate transactions but rather provides the essential digital space for buyers and sellers to connect, creating a vibrant trading hub on university and other tertiary campuses.

        </div>

    </div>
    <div className='flex flex-col gap-5 p-[4rem]'>
        <div className=' p-2 text-2xl text-center w-full my-4 '><strong>How to use Campusify</strong></div>
        <div className='my-2'>
            <div className='text-xl text-[#FF9000]  '><strong>Sell on Campusify</strong></div>
            <div className='flex justify-between p-4'>
            <div className='flex flex-col gap-3 '>
                <div className='bg-[#FDDFB9] p-3 rounded-lg'><strong>1. </strong>Type in your school and choose it on the homepage</div>
                <div><strong>2. </strong>Click on  
          <button className='p-2 text-[#FF9000]' onClick={postProduct}>Sell Something</button>
                 </div>
                 <div><strong>3. </strong>Fill the form.</div>
                 <div><strong>4. </strong>Click Next and continue.</div>
            </div>
                <div className='w-[40%]'><img src='https://res.cloudinary.com/djj8xwuzn/image/upload/v1707425271/Default/Rectangle_316-removebg-preview_ryecai.png' alt='sell_on_campusify'/></div>
    
            </div>
        </div>

        <div  className='my-2 '>
            <div className='text-xl text-[#FF9000] '><strong>Buy on Campusify</strong></div>
            <div className='flex justify-between p-4'>
            <div className='w-[40%]'><img src='https://res.cloudinary.com/djj8xwuzn/image/upload/v1707425271/Default/Rectangle_316-removebg-preview_ryecai.png' alt='buy on_campusify'/></div>
            <div className='flex flex-col gap-3 '>
            <div className='bg-[#FDDFB9] p-3 rounded-lg'><strong>1. </strong>Type in your school and choose it on the homepage</div>
                <div><strong>1. </strong>Search for your Product on the search bar</div>
                 <div><strong>2. </strong>Click on the product you want to buy.</div>
                 <div><strong>3. </strong>Contact the seller via the seller information.</div>
                 <div><strong>4. </strong>Meet the seller in a public place and do business.</div>
            </div>
    
            </div>
        </div>
    </div>
    </div>
   </div>
   <div className={`nav-slide ${nav ? 'open' : ''}`}>
  <Nav closeModal={closeNav} setSignin={setSignin}/>
</div>
    <div><Footer/></div>

</div>
)
}



