import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import './App.css';
import About from './Pages/About';
import Community from './Pages/Community';
import Spotlight from './Pages/Spotlight';
import { Dues, DuesPayment }from './Pages/Dues';
import Notifications from './Pages/Notifications';
import Messages from './Pages/Messages';
import {Signup, Signin, ForgotPassword, ResetPassword, Payment} from './Pages/Signup';
import Benefits from './Pages/Benefits'
import  NewsEvents from './Pages/NewsEvents';
import  News from './Pages/News';
import Dashboard from './Pages/Dashboard';
import Elections from './Pages/Elections';
import Resources from './Pages/Resources';
import Profile from "./Pages/Profile";
import Support from "./Pages/Support";
import Comingsoon from "./Pages/Comingsoon";
import Firstpage from "./Pages/Firstpage";
import { VotingDashboard, ResultsPage } from "./Pages/Elections";
import Faqs from "./Pages/FAQuestions/Faqs";


function App() {
 
  return (
    <>
    
    <BrowserRouter>
    <Routes>
<Route path="/" element={<Firstpage />} />
<Route path='/profile/:id' element={<Profile />} />
<Route path='/dashboard/:id' element={<Dashboard />} />
<Route path='/elections/:id' element={<Elections />} />
        <Route path='/newsevents' element={<NewsEvents /> }/>
        <Route path='/news/:id' element={<News /> }/>
        <Route path='/resources' element= {<Resources /> }/>          
        <Route path='/signup' element= {<Signup /> }/>
        <Route path='/signin' element= {<Signin /> }/>
        <Route path='/forgotpassword' element= {<ForgotPassword /> }/>
        <Route path='/resetpassword/:token' element= {<ResetPassword /> }/>
        <Route path='/payment/:id' element= {<Payment /> }/>
        <Route path='/about' element= {<About /> }/>
        <Route path='/community' element= {<Community /> }/>
        <Route path='/spotlight' element= {<Spotlight /> }/>
        <Route path='/dues' element= {<Dues /> }/>
        <Route path='/duespayment/:id' element= {<DuesPayment /> }/>
        <Route path='/notifications/:id' element= {<Notifications /> }/>
        <Route path='/messages' element= {<Messages /> }/>
        <Route path='/support' element= {<Support /> }/>
        <Route path='/benefits' element= {<Benefits /> }/>
        <Route path='/comingsoon' element= {<Comingsoon /> }/>
        <Route path='/voting/:id' element= {<VotingDashboard /> }/>
        <Route path='/electionresults/:id' element= {<ResultsPage /> }/>
        <Route path='/faqs' element= {<Faqs /> }/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
