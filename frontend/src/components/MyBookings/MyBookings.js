import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Events/spinner';
import './MyBookings.css';

const getCookie = (name) => {
    const cookieString = document.cookie; // Get all cookies as a single string
    const cookies = cookieString.split('; '); // Split into individual cookies

    // Find the cookie with the given name
    const cookie = cookies.find((cookie) => cookie.startsWith(name + '='));

    if (cookie) {
        // Extract and return the cookie value
        return cookie.split('=')[1];
    } else {
        return null; // Return null if cookie with the given name is not found
    }
};

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // const token = getCookie('token');
                // if (!token) {
                //     throw new Error('No token found');
                // }

                // const decoded = jwt.decode(token); // You need to decode the token to get the userId
                // const userId = decoded.id;
                const userId=1;

                const response = await axios.get(`http://localhost:3009/event/getBookingsDetails/${userId}`
                //     , {
                //     headers: { Authorization: `Bearer ${token}` }
                // }
            );
                console.log("fetchingBookings",response);
                setBookings(response.data.bookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="my-bookings-page">
            <h2>My Bookings</h2>
            {loading ? (
                <Spinner />
            ) : (
                <div className="bookings-list">
                    {bookings.length > 0 ? (
                        bookings.map(booking => (
                            <div key={booking.event_id} className="booking-card">
                                <h3>{booking.title}</h3>
                                <p className='event-date'>Date: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className='event-location'>Location: {booking.location}</p>
                                <p className='ticket-code'>Ticket Code: {booking.ticket_code}</p>
                                {/* Add more booking details as needed */}
                            </div>
                        ))
                    ) : (
                        <p>You have no bookings yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyBookings;