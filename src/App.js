import React, { useEffect, lazy, Suspense} from 'react';
import { Pageloader } from "./Modals/Loaders";
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import './App.css';
import {About} from './Pages/About';
import {Privacy} from './Pages/Privacy';
import {Deleteaccount} from './Pages/Deleteaccount';
import {Yourreferrals} from './Pages/Accessories/Yourreferrals';
import Contact from './Pages/Contact';
import {Signup, Signin, ForgotPassword, ResetPassword} from './Pages/Signup';
import EmploymentForm from './Pages/Useguide';
import FAQs from './Pages/FAQs';
import { Createproductpage } from './Pages/Createproductpage'
import {  Editproductpage } from './Pages/Editproductpage';
import Dashboard from './Pages/Yourproductspage';
import Newproduct from './Pages/Newproduct';
import Search from './Pages/Search';
import Mainpage from  './Pages/Accessories/Mainpage';
import Profile from   './Pages/Productpage';
import Store from './Pages/Links/Store';
import { Signuplink } from './Pages/Links/Signuplink';
import { Sellerregistration } from './Pages/Links/Sellerregistration';
import Webstore from './Pages/Links/Website/Webstore';
import Productpages from './Pages/Links/Website/Components/Products/Productpage';

const Firstpage = lazy(() => import("./Pages/Firstpage"));


function App() {
  let university = JSON.parse(localStorage.getItem("universities"));

  if (!university) {
      university = {
        label: "All Universities",
        value: "All Universities",
       };
      localStorage.setItem("universities", JSON.stringify(university));
  }
 
  return (
    <>
    
    <BrowserRouter>
    <Routes>
    <Route path="/"element={<Firstpage/>}/>
<Route path='/productpage/:slug/:id' element={<Profile />}/>
<Route path='/yourproductspage/:title/:id' element={<Dashboard />}/>
<Route path='/newproduct/:title/:id' element={<Newproduct />}/>
        <Route path='/store/:id' element={<Store />}/>
        <Route path='/webcreate' element={<Sellerregistration />}/>
        <Route path='/webstore/:webname' element={<Webstore />}/>
        <Route path='/webproductpage/:title' element={<Productpages />}/>
        <Route path='/signuplink/:id' element={<Signuplink />}/>
        <Route path='/editproductpage/:id/:title' element={<Editproductpage />}/>
        <Route path='/search/:university/:title' element= {<Search />}/>          
        <Route path='/mainpage/:id' element= {<Mainpage />}/>
        <Route path='/signup' element= {<Signup />}/>
        <Route path='/signin' element= {<Signin />}/>
        <Route path='/forgotpassword' element= {<ForgotPassword />}/>
        <Route path='/resetpassword' element= {<ResetPassword />}/>
        <Route path='/about' element= {<About />}/>
        <Route path='/privacy' element= {<Privacy />}/>
        <Route path='/deleteaccount' element= {<Deleteaccount />}/>
        <Route path='/yourreferrals' element= {<Yourreferrals />}/>
        <Route path='/contact' element= {<Contact />}/>
        <Route path='/faqs' element= {<FAQs />}/>
        <Route path='/createproductpage' element= {<Createproductpage />}/>
        <Route path='/useguide' element= {<EmploymentForm />}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
