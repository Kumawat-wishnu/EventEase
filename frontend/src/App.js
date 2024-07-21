import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes,useNavigate} from 'react-router-dom';
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
  //testing------->
  const [searchQuery, setSearchQuery]=useState('');
  // const navigate = useNavigate();

  // const handleSearch=(query)=>{
  //   console.log('you are in app.js');
  //   setSearchQuery(query);
  //   navigate('/events');
  // };

  return (
    
      <Router>
           {/* <Header onSearch={handleSearch}/> */}
           <HeaderWithSearch setSearchQuery={setSearchQuery} />
          
         <Routes>
         {/* <Route exact path="/" element={<HomePage/>}/> */}
         <Route exact path="/" element={<HomePage />} /> 
         <Route path="/events" element={<EventPage searchQuery={searchQuery}/>} />
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

const HeaderWithSearch = ({ setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    console.log('you are in app.js',query);
    setSearchQuery(query);
    console.log('searchQuery',query);
    navigate('/events');
  };

  return <Header onSearch={handleSearch} />;
};

export default App;