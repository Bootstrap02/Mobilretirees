import React, { useEffect, lazy, Suspense} from 'react';
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
import Benefits from './Pages/Benefits'
import  NewsEvents from './Pages/NewsEvents';
import Dashboard from './Pages/Dashboard';
import Resources from './Pages/Resources';
import Mainpage from  './Pages/Accessories/Mainpage';
import Profile from "./Pages/Profile";
import Support from "./Pages/Support";
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
<Route path="/" element={<Firstpage />} />
<Route path='/productpage/:slug/:id' element={<Profile />} />
<Route path='/dashboard' element={<Dashboard />} />
        <Route path='/store/:id' element={<Store />}/>
        <Route path='/webcreate' element={<Sellerregistration /> }/>
        <Route path='/webstore/:webname' element={<Webstore /> }/>
        <Route path='/webproductpage/:title' element={<Productpages /> }/>
        <Route path='/signuplink/:id' element={<Signuplink /> }/>
        <Route path='/newsevents' element={<NewsEvents /> }/>
        <Route path='/resources' element= {<Resources /> }/>          
        <Route path='/mainpage/:id' element= {<Mainpage /> }/>
        <Route path='/signup' element= {<Signup /> }/>
        <Route path='/signin' element= {<Signin /> }/>
        <Route path='/forgotpassword' element= {<ForgotPassword /> }/>
        <Route path='/resetpassword' element= {<ResetPassword /> }/>
        <Route path='/about' element= {<About /> }/>
        <Route path='/privacy' element= {<Privacy /> }/>
        <Route path='/support' element= {<Support /> }/>
        <Route path='/deleteaccount' element= {<Deleteaccount /> }/>
        <Route path='/yourreferrals' element= {<Yourreferrals /> }/>
        <Route path='/contact' element= {<Contact /> }/>
        <Route path='/faqs' element= {<FAQs /> }/>
        <Route path='/benefits' element= {<Benefits /> }/>
        <Route path='/useguide' element= {<EmploymentForm /> }/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
