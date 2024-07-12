// import React, { useState } from 'react';
// import axios from 'axios';
// import Spinner from './spinner'; // Import Spinner component if needed

// function EventRegistration({ userId, eventId }) {
//     const [loading, setLoading] = useState(false);
//     const [registrationSuccess, setRegistrationSuccess] = useState(false);
//     const [ticketCode, setTicketCode] = useState('');

//     const handlePayment = async () => {
//         setLoading(true);
//         try {
//             // Create order in backend
//             const orderResponse = await axios.post('http://localhost:3009/payment/createOrder', { userId, eventId });
//             const { orderId, amount, currency } = orderResponse.data;

//             // Initialize Razorpay
//             const options = {
//                 key: 'YOUR_KEY_ID',
//                 amount: amount,
//                 currency: currency,
//                 name: 'EventEase',
//                 description: 'Event Registration',
//                 order_id: orderId,
//                 handler: async function (response) {
//                     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

//                     // Verify payment in backend
//                     const verifyResponse = await axios.post('http://localhost:3009/payment/verifyPayment', {
//                         userId,
//                         eventId,
//                         razorpayPaymentId: razorpay_payment_id,
//                         razorpayOrderId: razorpay_order_id,
//                         razorpaySignature: razorpay_signature,
//                     });

//                     setTicketCode(verifyResponse.data.ticketCode);
//                     setRegistrationSuccess(true);
//                 },
//                 prefill: {
//                     name: '',
//                     email: '',
//                     contact: ''
//                 },
//                 notes: {
//                     address: ''
//                 },
//                 theme: {
//                     color: '#F37254'
//                 }
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             // Handle payment error
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             {loading ? (
//                 <Spinner /> // Show spinner while processing payment
//             ) : registrationSuccess ? (
//                 <div>
//                     <p>Payment successful!</p>
//                     <p>Your ticket code: {ticketCode}</p>
//                 </div>
//             ) : (
//                 <button onClick={handlePayment}>Proceed to Payment</button> // Button to initiate payment
//             )}
//         </div>
//     );
// }

// export default EventRegistration;