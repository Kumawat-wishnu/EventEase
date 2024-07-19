import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePages';
import EventPage from './pages/EventPage';
import Heading from './components/home/heading';
import Header from './components/home/Header/Header';
import Footer from './components/home/footer';
import RegisterEventPage from './pages/RegisterEventPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MyBookingsPage from './pages/MyBookings';
function App(){
  return (
    
    
    
      <Router>
           <Header/>
         <Routes>
         {/* <Route exact path="/" element={<HomePage/>}/> */}
         <Route exact path="/" element={<HomePage />} /> 
         <Route path="/events" element={<EventPage/>} />
         <Route path="/RegisterEvent" element={<RegisterEventPage/>} />
         <Route path="/Login" element={<LoginPage/>}/>
         <Route path="/Signup" element={<SignupPage/>}/>
         <Route path="/MyBookingsPage" element={<MyBookingsPage/>}/>

        </Routes>
      </Router>

    
  
    //  <Router>
    //   <Routes>
    //     <Route exact path="/" component={HomePage}/>
    //     <Route path="/events" component={EventsPage}/>
    //     </Routes>
    //  </Router>
  );
}

export default App;