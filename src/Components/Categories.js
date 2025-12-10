import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { Categoriesmodal } from '../Modals/General/Categories.js';
import { MediumLoaders } from '../Modals/Loaders';
import { BigLoader } from '../Modals/Loaders';
import { IoMdArrowDropdown } from "react-icons/io";
import { Loginmodal } from '../Modals/Pages/Signin.js';
import { Tokenerrormodal, Signedinmodal } from '../Modals/Forms.js';
import Productsample from '../assets/Productsample.png';


const truncateDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};

const Categories = () => {
  const navigate = useNavigate();
  const [activeButtonIndex, setActiveButtonIndex] = useState('1');
  const [category, setCategory] = useState('Clothes');
  const [categoryState, setCategoryState] = useState([])
  const [loader, setLoader] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [targetValue, setTargetValue] = useState('');
  const [loginSuccessModal, setLoginSuccessModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [categories, setCategories] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const [pageNumber, setPageNumber] = useState(false);
  const [slicedProducts, setSlicedProducts] = useState(); // New state for sliced products
  const [buttonloading, setButtonloading] = useState('');
  const accessedToken = JSON.parse(localStorage.getItem('userData'));


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



  const openCategories = () => {
    setCategories(true)
  };
  const closeCategories = () => {
    setCategories(false)
  };
  const openLoader = () => {
    setLoader(true)
  };
  const closeLoader = () => {
    setLoader(false)
  };
  const openLoginModal = () => {
    setLoginModal(true)
  };
  const closeLoginModal = () => {
    setLoginModal(false)
  };
  const openLoginError = () => {
    setLoginError(true)
  };
  const closeLoginError = () => {
    setLoginError(false)
  };
  const openLoginSuccessModal = () => {
    setLoginSuccessModal(true)
  };
  const closeLoginSuccessModal = () => {
    setLoginSuccessModal(false)
  };

  let universities = JSON.parse(localStorage.getItem("universities"));

  if (!universities) {
    universities = {
      label: "All Universities",
      value: "All Universities",
    };
    localStorage.setItem("universities", JSON.stringify(universities));
  }
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
  if (accessedToken && accessedToken.accessToken) {
    setAuthToken(accessedToken.accessToken);
  }
  // Now, you can use axiosInstance for your requests with the token included in the headers

  const API_KEY = {
    APARTMENTS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Apartments`,
    APARTMENTS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Apartments`,
    PHONES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Phones`,
    PHONES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Phones`,
    BEDS_AND_FURNITURES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Beds and Furnitures`,
    BEDS_AND_FURNITURES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Beds and Furnitures`,
    LAPTOPS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Laptops`,
    LAPTOPS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Laptops`,
    GENERATORS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Generators`,
    GENERATORS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Generators`,
    POTS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Pots`,
    POTS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Pots`,
    DISHES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Dishes`,
    DISHES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Dishes`,
    WATCHES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Watches`,
    WATCHES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Watches`,
    PLAYSTATION_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproductsuniversity=${universities.value}&?search=Playstation`,
    PLAYSTATION_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Playstation`,
    GAMES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Games`,
    GAMES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Games`,
    TV_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Tv`,
    TV_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Tv`,
    GOTV_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Gotv`,
    GOTV_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Gotv`,
    DSTV_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Dstv`,
    DSTV_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Dstv`,
    TRICYCLE_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Tricycle`,
    TRICYCLE_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Tricycle`,
    CARS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Cars`,
    CARS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Cars`,
    TUTORIALS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Tutorials`,
    TUTORIALS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Tutorials`,
    HAIRS_AND_WIGS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Hairs and Wigs`,
    HAIRS_AND_WIGS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Hairs and Wigs`,
    CLOTHES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Clothes`,
    CLOTHES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Clothes`,
    ELECTRICAL_APPLIANCES_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Electrical Appliances`,
    ELECTRICAL_APPLIANCES_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Electrical Appliances`,
    TEXTBOOKS_HANDOUT_AND_MATERIALS_API_KEY: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Textbooks, Handouts and Materials`,
    TEXTBOOKS_HANDOUT_AND_MATERIALS_API_KEYS: `https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Textbooks, Handouts and Materials`,
  };

  if (!pageNumber) {
    setPageNumber(1);
  }
  const fetchCategories = async (category, categoryApi) => {
    const end = pageNumber * 15;
    const start = end - 15;
    openLoader();
    closeCategories();
    try {
      setCategory(category);
      const response = await axios.get(categoryApi);
      await setCategoryState(response.data.data);
      if (start.length > categoryState.length) {
        await setNoProducts(true);
      } else {
        await setSlicedProducts(categoryState.slice(start, end));
      }
      closeLoader();
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert("No Products in this category yet");
      closeLoader();
    }
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
  
    if (start >= categoryState.length) {
      await setNoProducts(true);
      console.log(noProducts); // this will likely still show the old value due to async state
    } else {
      await setSlicedProducts(categoryState.slice(start, end));
      await setNoProducts(false); // just to be safe
    }
  };

  const handleCategories = async (index, num) => {
    const end = num * 15;
    const start = end - 15;
    await setActiveButtonIndex(index);
    await setPageNumber(num);
    if (start.length > categoryState.length) {
      await setNoProducts(true);
    } else {
      await setSlicedProducts(categoryState.slice(start, end));
    }
  }

  useEffect(() => {
    const getApis = async () => {
      try {
        const getCategories = await axios.get(universities.value === "All Universities" ?
          "https://campusbuy-backend-nkmx.onrender.com/searchproducts?search=Clothes" :
          `https://campusbuy-backend-nkmx.onrender.com/searchproducts?university=${universities.value}&search=Clothes`);
        await setCategoryState(getCategories.data.data)
        if (!getCategories.data.data) {
          await setNoProducts(true);
        } else {
          await setSlicedProducts(getCategories.data.data.slice(0, 15));
        }
      } catch (error) {
        console.error('Error getting APIs:', error);
      }
    };
    getApis();
  }, []);

  return (
    <div className=''>
      <section className='container my-2  flex justify-between gap-2 max-lg:hidden'>
        <div className='mt-[15px]'>
          <div className='flex flex-col gap-1 bg-white justify-center p-2 rounded-md'>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Clothes", universities.value === "All Universities" ? API_KEY.CLOTHES_API_KEY : API_KEY.CLOTHES_API_KEYS) }} className='text-sm'><strong>Clothes</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Apartments", universities.value === "All Universities" ? API_KEY.APARTMENTS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Apartments</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Phones", universities.value === "All Universities" ? API_KEY.PHONES_API_KEY : API_KEY.PHONES_API_KEYS) }} className='text-sm'><strong>Phones</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Laptops", universities.value === "All Universities" ? API_KEY.LAPTOPS_API_KEY : API_KEY.LAPTOPS_API_KEYS) }} className='text-sm'><strong>Laptops</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Beds", universities.value === "All Universities" ? API_KEY.BEDS_AND_FURNITURES_API_KEY : API_KEY.FURNITURES_API_KEYS) }} className='text-sm'><strong>Beds and Furnitures</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Hairs", universities.value === "All Universities" ? API_KEY.HAIRS_AND_WIGS_API_KEY : API_KEY.HAIRS_AND_WIGS_API_KEYS) }} className='text-sm'><strong>Hairs and Wigs</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Tutorials", universities.value === "All Universities" ? API_KEY.TUTORIALS_API_KEY : API_KEY.TUTORIALS_API_KEYS) }} className='text-sm'><strong>Tutorials</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Generators", universities.value === "All Universities" ? API_KEY.GENERATORS_API_KEY : API_KEY.GENERATORS_API_KEYS) }} className='text-sm'><strong>Generators</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Pot", universities.value === "All Universities" ? API_KEY.POTS_API_KEY : API_KEY.POTS_API_KEYS) }} className='text-sm'><strong>Pot</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Dishes", universities.value === "All Universities" ? API_KEY.DISHES_API_KEY : API_KEY.DISHES_API_KEYS) }} className='text-sm'><strong>Dishes</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Watches", universities.value === "All Universities" ? API_KEY.WATCHES_API_KEY : API_KEY.WATCHES_API_KEYS) }} className='text-sm'><strong>Watches</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Playstation", universities.value === "All Universities" ? API_KEY.PLAYSTATION_API_KEY : API_KEY.PLAYSTATION_API_KEYS) }} className='text-sm'><strong>Playstation</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Games", universities.value === "All Universities" ? API_KEY.GAMES_API_KEY : API_KEY.GAMES_API_KEYS) }} className='text-sm'><strong>Games</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Tv", universities.value === "All Universities" ? API_KEY.TV_API_KEY : API_KEY.TV_API_KEYS) }} className='text-sm'><strong>Tv</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Gotv", universities.value === "All Universities" ? API_KEY.GOTV_API_KEY : API_KEY.GOTV_API_KEYS) }} className='text-sm'><strong>Gotv</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Dstv", universities.value === "All Universities" ? API_KEY.DSTV_API_KEY : API_KEY.DSTV_API_KEYS) }} className='text-sm'><strong>Dstv</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Tricycle", universities.value === "All Universities" ? API_KEY.TRICYCLE_API_KEY : API_KEY.TRICYCLE_API_KEYS) }} className='text-sm'><strong>Tricycle</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Cars", universities.value === "All Universities" ? API_KEY.CARS_API_KEY : API_KEY.CARS_API_KEYS) }} className='text-sm'><strong>Cars</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Electrical Appliances", universities.value === "All Universities" ? API_KEY.ELECTRICAL_APPLIANCES_API_KEY : API_KEY.ELECTRICAL_APPLIANCES_API_KEYS) }} className='text-sm'><strong>Electrical Appliances</strong></NavLink></p>
            <p className='homepage-hot-categories'><NavLink onClick={() => { fetchCategories("Textbooks", universities.value === "All Universities" ? API_KEY.TEXTBOOKS_HANDOUT_AND_MATERIALS_API_KEY : API_KEY.TEXTBOOKS_HANDOUT_AND_MATERIALS_API_KEYS) }} className='text-sm'><strong>Textbooks, Handouts and Materials</strong></NavLink></p>
            <p className='bg-black text-center text-[#C0C0C0]'><NavLink onClick={openCategories} className=''><strong>See more...</strong></NavLink></p>
          </div>
        </div>
        <div className='w-[100%] flex-wrap flex justify-center'>
          {
            slicedProducts ? slicedProducts.map((Product) => {
              const truncatedDescription = truncateDescription(Product.description, 15);
              const moveForward = async () => {
                await localStorage.setItem('product', JSON.stringify(Product._id));
                await localStorage.setItem('fullproduct', JSON.stringify(Product));
                await navigate(`/trendingproductpage/${Product.slug}/${Product._id}`);
              };
              const addWishlist = async (id) => {
                const accessedToken = JSON.parse(localStorage.getItem('userData'));
                const WISHLIST_API_KEY = 'https://campusbuy-backend-nkmx.onrender.com/addwishlist';
                if (!accessedToken) {
                  setButtonloading(false)
                  openLoginError();
                  setTimeout(() => {
                    closeLoginError();
                    openLoginModal();
                  }, 3000)
                } else {
                  setButtonloading(id);
    
                  try {
                    const formData = new FormData();
                    formData.append('productId', Product._id);
                    const response = await axiosInstance.put(WISHLIST_API_KEY, formData);
                    setButtonloading(false)
                    alert('Added to wishlist!');
                  } catch (error) {
                    if (error.response.status === 403) {
                      setButtonloading(false)
                      openLoginError();
                      setTimeout(() => {
                        closeLoginError();
                        openLoginModal();
                      }, 3000)
                    }
                    console.error('Error adding to wishlist:', error);
                  }
                }
              };
              if (noProducts) {
                return (
                  <div className='container text-center text-white'><p>No more available products in this category</p></div>
                )
              } else {
                
                return (
                  <div className='product-card max-lg:hidden flex m-3 w-[25%]  border-2 border-[#FFD700]' key={Product._id}>
                    <div className='card p-2 justify-center items-center bg-[#222121]'>
                      <div onClick={moveForward}>
                        <img src={Product.images[0]? Product.images[0] : Productsample} className='card-img-top' alt='...' width={80} />
                        <div className=' text-sm text-white bg-[#222121]'>
                          <div className='flex my-1 justify-between items-center'>
                            {Product.title ? (
                              <div className='product-price d-flex gap-1 align-items-center justify-center'>
                                <TbCurrencyNaira className='naira' />
                                <h3 className='card-price-text text-lg'>{Product.price}</h3>
                              </div>
                            ) : null}
                            <strong className='card-condition-text'>{Product.condition}</strong>
                          </div>
                          <h5 className='card-title m-2'>
                            <strong>{Product.title || Product.name}</strong>
                          </h5>
                          <h6 className='text-[#cfcfc7] m-2'>{truncatedDescription}</h6>

                          <strong className='text-[#cfcfc7]'>{Product.location || Product.coverage}</strong>

                          {Product.title ? (
                            <div className='flex my-1 justify-between items-center text-sm'>
                              <p className='card-brand'>
                                <strong>{Product.brand}</strong>
                              </p>
                            </div>
                          ) : (
                            <div className='flex my-1 justify-between items-center text-sm'>
                              <div className='text-[8px] flex flex-col gap-1'>
                                {Product.price1} {Product.service1}
                              </div>
                              <div className='text-[8px] flex flex-col gap-1'>
                                {Product.price2} {Product.service2}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <NavLink onClick={() => { addWishlist(Product._id) }} className='btn btn-secondary text-[10px] flex gap-1'>
                        <p>{buttonloading === Product._id ? (<div><BigLoader /></div>) : ('Add Wishlist')}</p> <FaHeart className='wishlist-react-icons' />
                      </NavLink>
                    </div>
                    {loginModal && <div className='w-[25%] rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', left: '0', zIndex: '4000', }}> <Loginmodal closeModal={closeLoginModal} closeLoginSuccessModal={closeLoginSuccessModal} openLoginSuccessModal={openLoginSuccessModal} /></div>}
                    {loginSuccessModal && <div className=' rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', left: '0', zIndex: '4000', }}> <Signedinmodal /></div>}
                  </div>
                );
              }
            })

              : null
          }
        </div>

        {categories && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', right: '0', zIndex: '4000' }}> <Categoriesmodal closeModal={closeCategories} fetchCategories={fetchCategories} setPageNumber={setPageNumber} /></div>}
        {loginError && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '0', right: '20', zIndex: '4000' }}> <Tokenerrormodal /></div>}
        {loader && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '60%', left: '50%', zIndex: '5000' }}> <MediumLoaders /></div>}
      </section>
      <section className='w-[100%] hidden max-lg:flex flex-col  justify-center items-center gap-2'>
        <div className='mt-[15px]'>
          <div className='dropdown mt-[-0.38rem]'>
            <button
              className=' btn btn-secondary dropdown-toggle   dropdown-toggle-no-caret border-none'
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <div style={{ border: '2px solid #FFD700' }} className='flex  rounded-md  gap-1 justify-start items-start text-[#FFD700] py-2 px-4 text-sm bg-gray-500 shadow-lg'>
                <strong>{category}</strong> <IoMdArrowDropdown />
              </div>
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Clothes", universities.value === "All Universities" ? API_KEY.CLOTHES_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Clothes</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Apartments", universities.value === "All Universities" ? API_KEY.APARTMENTS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Apartments</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Phones", universities.value === "All Universities" ? API_KEY.PHONES_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Phones</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Laptops", universities.value === "All Universities" ? API_KEY.LAPTOPS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Laptops</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Beds", universities.value === "All Universities" ? API_KEY.BEDS_AND_FURNITURES_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Beds and Furnitures</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Hairs", universities.value === "All Universities" ? API_KEY.HAIRS_AND_WIGS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Hairs and Wigs</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Tutorials", universities.value === "All Universities" ? API_KEY.TUTORIALS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Tutorials</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Generators", universities.value === "All Universities" ? API_KEY.GENERATORS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Generators</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Pot", universities.value === "All Universities" ? API_KEY.POTS_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Pot</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Dishes", universities.value === "All Universities" ? API_KEY.DISHES_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Dishes</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Watches", universities.value === "All Universities" ? API_KEY.WATCHES_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Watches</strong></NavLink></li>
              <li className='homepage-hot-categories text-white'><NavLink onClick={() => { fetchCategories("Playstation", universities.value === "All Universities" ? API_KEY.PLAYSTATION_API_KEY : API_KEY.APARTMENTS_API_KEYS) }} className='text-sm'><strong>Playstation</strong></NavLink></li>
              <li className='bg-white text-center text-[#C0C0C0]'><NavLink onClick={openCategories} className=''><strong>See more...</strong></NavLink></li>

            </ul>
          </div>

        </div>
        <div className='container flex-wrap flex justify-center gap-2 items-center '>
          {
            slicedProducts ? slicedProducts.map((Product) => {
              const moveForward = async () => {
                await localStorage.setItem('product', JSON.stringify(Product._id));
                await localStorage.setItem('fullproduct', JSON.stringify(Product));
                await navigate(`/trendingproductpage/${Product.slug}/${Product._id}`);
              };
              const addWishlist = async (id) => {
                const accessedToken = JSON.parse(localStorage.getItem('userData'));
                const WISHLIST_API_KEY = 'https://campusbuy-backend-nkmx.onrender.com/addwishlist';
                if (!accessedToken) {
                  setButtonloading(false)
                  openLoginError();
                  setTimeout(() => {
                    closeLoginError();
                    openLoginModal();
                  }, 3000)
                } else {
                  setButtonloading(id);
    
                  try {
                    const formData = new FormData();
                    formData.append('productId', Product._id);
                    const response = await axiosInstance.put(WISHLIST_API_KEY, formData);
                    setButtonloading(false)
                    alert('Added to wishlist!');
                  } catch (error) {
                    if (error.response.status === 403) {
                      setButtonloading(false)
                      openLoginError();
                      setTimeout(() => {
                        closeLoginError();
                        openLoginModal();
                      }, 3000)
                    }
                    console.error('Error adding to wishlist:', error);
                  }
                }
              };

              if (noProducts) {
                return (
                  <div className='container text-center text-white'><p>No more available products in this category</p></div>
                )
              } else {
                
                return (
                  <div className='mobile-product-card p-1  bg-[#222121]  w-[48%]' key={Product._id}>
                     <div onClick={moveForward} className='card  bg-[#222121] '>
                                      <img src={Product.images[0]? Product.images[0] : Productsample} className='card-img-top' alt='...' width={14} />
                                      <div className=' w-[100%] text-[9px] text-white bg-[#222121]'>
                                        <div className='flex my-1 justify-between'>
                                          <div className='product-price flex gap-1 align-items-center w-full'>
                                            <TbCurrencyNaira className='mobile-naira' />
                                            <h3 className='card-price-text '>{Product.price}</h3>
                                          </div>
                                          <strong className='card-condition-text'>{Product.condition}</strong>
                                        </div>
                                        <h5 className='card-title'>
                                          <strong>{Product.title || Product.name}</strong>
                                        </h5>
                                        <div className='flex my-1 justify-between text-[#cfcfc7]'>
                                          <strong className='card-brand '>{Product.location || Product.coverage}</strong>
                                          <strong>{Product.person || Product.status}</strong>
                                        </div>
                                        <div className='flex my-1 justify-between items-center '>
                                        </div>
                                      </div>
                                    </div>
                    <NavLink onClick={() => { addWishlist(Product._id) }} className=' mx-2 btn btn-secondary text-[10px] flex gap-1'>
                      <p>{buttonloading === Product._id ? <BigLoader /> : 'Add Wishlist'}</p> <FaHeart className='wishlist-react-icons' />
                    </NavLink>
                    {loginModal && <div className='w-[60%] rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', left: '0', zIndex: '4000' }}> <Loginmodal closeModal={closeLoginModal} closeSuccessModal={closeLoginSuccessModal} setLoginSuccessModal={setLoginSuccessModal} set /></div>}
                    {loginSuccessModal && <div className=' rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', left: '0', zIndex: '4000', }}> <Signedinmodal /></div>}
                  </div>
                );
              }
            })
              : null
          }
        </div>
        {categories && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '10%', left: '0', zIndex: '4000', height: '500px', width: '100%' }}> <Categoriesmodal closeModal={closeCategories} fetchCategories={fetchCategories} setPageNumber={setPageNumber} /></div>}
        {loginError && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '0', left: '5', zIndex: '4000' }}> <Tokenerrormodal /></div>}
        {loader && <div className='container rounded-md flex justify-center ' style={{ position: 'fixed', top: '30%', left: '0', zIndex: '5000' }}> <MediumLoaders /></div>}
      </section>
      <div className='flex justify-end max-lg:hidden items-center gap-4 m-4'>
        <div className='flex justify-center items-center gap-4 '>
          <button onClick={() => handleCategories(activeButtonIndex - 1, activeButtonIndex - 1)}><IoChevronBack className='categories-react-icons-arrow' /></button>
          <button
            onClick={() => handleCategories('1', 1)}
            style={activeButtonIndex === '1' ? active : inactive}
          >
            1
          </button>
          <button
            onClick={() => handleCategories('2', 2)}
            style={activeButtonIndex === '2' ? active : inactive}
          >
            2
          </button>
          <button
            onClick={() => handleCategories('3', 3)}
            style={activeButtonIndex === '3' ? active : inactive}
          >
            3
          </button>
          <button
            onClick={() => handleCategories('4', 4)}
            style={activeButtonIndex === '4' ? active : inactive}
          >
            4
          </button>
          <button
            onClick={() => handleCategories('5', 5)}
            style={activeButtonIndex === '5' ? active : inactive}
          >
            5
          </button>
          <button
            onClick={() => handleCategories('6', 6)}
            style={activeButtonIndex === '6' ? active : inactive}
          >
            6
          </button>
          <button
            onClick={() => handleCategories('7', 7)}
            style={activeButtonIndex === '7' ? active : inactive}
          >
            7
          </button>
          <button
            onClick={() => handleCategories('8', 8)}
            style={activeButtonIndex === '8' ? active : inactive}
          >
            8
          </button>
          <button
            onClick={() => handleCategories('9', 9)}
            style={activeButtonIndex === '9' ? active : inactive}
          >
            9
          </button>
          <button onClick={() => handleCategories(activeButtonIndex + 1, activeButtonIndex + 1)}><IoChevronForwardOutline className='categories-react-icons-arrow' /></button>
        </div>
        <form onSubmit={searchPage} className='flex justify-center items-center gap-4 '>
          <p className='text-[8px] text-[#FEBD69]'>Go to page</p>
          <input className='p-2 rounded-md w-[12%] ' type='number' onChange={handleChange}/>
          <button type="submit" className='bg-white p-2 rounded-md '>Go</button>
        </form>
      </div>

      <div className='hidden justify-between max-lg:flex items-center gap-1 my-2'>
        <div className='flex justify-start items-center gap-2 text-[8px] '>
          <button onClick={() => handleCategories(activeButtonIndex - 1, activeButtonIndex - 1)}><IoChevronBack className='categories-react-icons-arrow' /></button>
          <button
            onClick={() => handleCategories('1', 1)}
            style={activeButtonIndex === '1' ? active : inactive}
          >
            1
          </button>
          <button
            onClick={() => handleCategories('2', 2)}
            style={activeButtonIndex === '2' ? active : inactive}
          >
            2
          </button>
          <button
            onClick={() => handleCategories('3', 3)}
            style={activeButtonIndex === '3' ? active : inactive}
          >
            3
          </button>
          <button
            onClick={() => handleCategories('4', 4)}
            style={activeButtonIndex === '4' ? active : inactive}
          >
            4
          </button>
          <button
            onClick={() => handleCategories('5', 5)}
            style={activeButtonIndex === '5' ? active : inactive}
          >
            5
          </button>
          <button
            onClick={() => handleCategories('6', 6)}
            style={activeButtonIndex === '6' ? active : inactive}
          >
            6
          </button>
          <button
            onClick={() => handleCategories('7', 7)}
            style={activeButtonIndex === '7' ? active : inactive}
          >
            7
          </button>
          <button
            onClick={() => handleCategories('8', 8)}
            style={activeButtonIndex === '8' ? active : inactive}
          >
            8
          </button>
          <button
            onClick={() => handleCategories('9', 9)}
            style={activeButtonIndex === '9' ? active : inactive}
          >
            9
          </button>
          <button onClick={() => handleCategories(activeButtonIndex + 1, activeButtonIndex + 1)}><IoChevronForwardOutline className='categories-react-icons-arrow' /></button>
        </div>
        <form onSubmit={searchPage} className='flex justify-between items-center gap-1  '>
          <p className='text-[8px] text-[#FEBD69] w-[40%]'>Go to page</p>
          <input className='px-2 py-1 rounded-md w-[30%] ' type='number' onChange={handleChange} />
          <button type="submit" className='bg-white p-1 rounded-md '>Go</button>
        </form>

      </div>
    </div>
  )
}

export default Categories;





