import React from 'react';
import {useEffect, useState} from 'react';
import Spinnerr from './spinner';
import './Events.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Image1 from '../../images/event1.jpeg';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
// import jwt from 'jsonwebtoken';
// const jwt= require('jsonwebtoken');

// const getCookie = (name) => {
//     const cookieString = document.cookie; // Get all cookies as a single string
//     const cookies = cookieString.split('; '); // Split into individual cookies

//     // Find the cookie with the given name
//     const cookie = cookies.find((cookie) => cookie.startsWith(name + '='));

//     if (cookie) {
//         // Extract and return the cookie value
//         return cookie.split('=')[1];
//     } else {
//         return null; // Return null if cookie with the given name is not found
//     }
// };

function Events({searchQuery}) {
    console.log('Events component mounted with searchQuery:', searchQuery);
    console.log('you are in starting of events')
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // Assuming you get the user ID from somewhere, like authentication context
    const navigate = useNavigate(); // Initialize useNavigate
    console.log("before useEffect of events");

  
    useEffect(() => {
        console.log("in the useEffect of events");
        // // Fetch user ID from localStorage or context
        // const token = getCookie('token');
        
        // if (token) {
        //     try {
        //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //         const storedUserId = decoded.id;
                
        //         if (storedUserId) {
        //             setUserId(storedUserId);
        //         }
        //     } catch (error) {
        //         console.error('Error decoding token:', error);
        //         // Handle token verification error (e.g., token expired, invalid token)
        //         // Optionally, you may redirect to login or handle this case based on your application flow.
        //     }
        // } else {
        //     console.error('Token not found.');
        //     // Handle case where token is not found (e.g., redirect to login)
        //     // Optionally, you may redirect to login or handle this case based on your application flow.
        // }
       
        console.log('you are now in events');
        const fetchEvents = async (query = '') => {
            console.log('you are now in fetchevents');
            setLoading(true);
            try {
                const response = query
                    ? await axios.get(`http://localhost:3009/event/search?q=${query}`)
                    : await axios.get('http://localhost:3009/event/getAllEvents');
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents(searchQuery);
    }, [searchQuery]);

    //     fetch('http://localhost:3009/event/getAllEvents')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setEvents(data.events);
    //             setLoading(false);
    //         })
    //         .catch(error => console.error('Error fetching events', error));
    // }, []);

    const loadRazorpay = async (eventId) => {
        if (!window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => handlePayment(eventId);
            script.onerror = () => alert('Razorpay SDK failed to load. Are you online?');
            document.body.appendChild(script);
        } else {
            handlePayment(eventId);
        }
    };

    const getCookieValue = (name) => {
        // document.cookie = "testCookie=testValue; path=/";
        console.log('All cookies:', document.cookie);
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        console.log('match',match);
        if (match) {
          return match[2];
        }
        return null;
      };

    const handlePayment = async (eventId) => {
       
        const token = getCookieValue('token'); // Replace 'token' with the name of your cookie
        if (!token) {
           throw new Error('No token found');
       }

       const decoded=jwtDecode(token);
       console.log('decoded',decoded);
       const userId=decoded.id;

    //    console.log('userId',userId);
        
        if (!userId) {
            alert('Please log in to register for an event.');
            return;
        }

        try {
            // Create order in backend
            const orderResponse = await axios.post('http://localhost:3009/payment/createOrder', { userId, eventId });
            const { orderId, amount, currency } = orderResponse.data;
            var razorpay_payment_id=null;
            var razorpay_order_id=null;
            var razorpay_signature=null;


            // Initialize Razorpay
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: 'EventEase',
                description: 'Event Registration',
                order_id: orderId,
                handler: async function (response) {
                    razorpay_payment_id=response.razorpay_payment_id;
                    razorpay_order_id=response.razorpay_order_id;
                    razorpay_signature=response.razorpay_signature;

                     //   Verify payment in backend
                     const verifyResponse = await axios.post('http://localhost:3009/payment/verifyPayment', {
                        userId,
                        eventId,
                        razorpayPaymentId: razorpay_payment_id,
                        razorpayOrderId: razorpay_order_id,
                        razorpaySignature: razorpay_signature,
                    });

                    alert(`Payment successful! Your ticket code: ${verifyResponse.data.ticketCode}`);
                    navigate('/'); // Navigate to the main page or a success page
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: ''
                },
                notes: {
                    address: ''
                },
                theme: {
                    color: '#F37254'
                }
            };
           console.log('iamhere');
           if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
           
        } else {
            alert('Razorpay SDK is not loaded. Please try again later.');
        }
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('There was an issue processing your payment. Please try again.');
        }
    };

    return (
        <div className="eventsPage">
            {loading ? (
                <Spinnerr />
            ) : (
                <div>
                    <h2 className="S-heading">Upcoming Events</h2>
                    <div className="events-list">
                        {events.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-details">
                                    <div className="event-image">
                                        <img src={event.image_url} alt={event.title} />
                                    </div>
                                    <div className="event-text">
                                        <h3 className="events-heading">{event.title}</h3>
                                        <p className="event-date">Date: {event.date}</p>
                                        <p className="event-location">Location: {event.location}</p>
                                        <p className="event-description">{event.description}</p>
                                        <Button
                                            style={{ backgroundColor: '#6b42ff' }}
                                            className="custom-button"
                                            onClick={() => handlePayment(event.id)}
                                        >
                                            Register
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Events;





// function Events(){
//     const [events, setEvents]= useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(()=>{
//         fetch('http://localhost:3009/event/getAllEvents')
//         .then(response=> {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         // .then(json=>console.log(json))
//         .then(data => {
//             setEvents(data.events)
//             setLoading(false)})
//         .catch(error =>console.error('Error fetching events',error));
        
//     },[]);
   

//     return(

//         <div className="eventsPage">
//     {loading ? (
//         <Spinnerr/>
//     ) : (
//         <div>
//             <h2 className="S-heading">Upcoming Events</h2>
//             <div className="events-list">
//                 {events.map(event => (
//                     <div key={event.id} className="event-card">
//                         <div className="event-details">
//                             <div className="event-image">
//                                 <img src={Image1} alt={event.title} />
//                             </div>
//                             <div className="event-text" >
//                                 <h3 className="events-heading">{event.title}</h3>
//                                 <p className="event-date">Date: {event.date}</p>
//                                 <p className="event-location">Location: {event.location}</p>
//                                 <p className="event-description">{event.description}</p>
//                                 <Button style={{ backgroundColor: '#6b42ff', marginLeft:'260px' }} className="custom-button">Register</Button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )}
// </div>
        
//         // <div className="eventsPage">
//         //     {loading ? (
//         //         <Spinnerr/>
//         //     ):(
//         //        <div>
//         //         <h2>Upcoming Events</h2>
//         //         <div className="events-list">
//         //             {events.map(event=>(
//         //                <div key={event.id} className="event-card">
//         //                 {/* <img src={event.image} alt={event.title} className="event-image"/> */}
//         //                 <div className="event-details">
//         //                    <h3 className="events-heading">{event.title}</h3>
//         //                    <p className="event-date">Date: {event.date}</p>
//         //                    <p className="event-location">Location: {event.location}</p>
//         //                    <p className="event-description">{event.description}</p>
//         //                    <Button style={{backgroundColor:'#6b42ff'}} className="custom-button">Register</Button>
//         //                 </div>
    
//         //                </div>
//         //             ))}
//         //         </div>
//         //         </div>
//         //     )};
            
//         // </div>
//     );
// }

// export default Events;


