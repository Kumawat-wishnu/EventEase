import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../RegisterEvent/RegisterEvent.css';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../RegisterEvent/Modal.css';

function UpdateEventForm() {
  const { eventId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate= useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Fetch the event details to prepopulate the form

    axios.get(`http://localhost:3009/event/getEventById/${eventId}`)
      .then(response => {
        const event = response.data.event[0];
        console.log('indevent',event);
        console.log('TTItle',event.title);
        setTitle(event.title);
        setDescription(event.description);
        setDate(formatDate(event.date));
        setLocation(event.location);
        // Note: You may handle the existing image URL differently based on your requirements
      })
      .catch(error => console.error('Error fetching event details:', error));
  }, [eventId]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    if (image) {
      formData.append('image', image);
    }

    axios.put(`http://localhost:3009/event/updateEvent/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        <SuccessModal isOpen={isSubmitted} onClose={() => setIsSubmitted(false)} />
        console.log('Event updated successfully', response.data);
        setIsSubmitted(true);
        // Navigate back to events list or any other page
        navigate('/Admin/eventDetails');
      })
      .catch(error => console.error('Error updating event', error));
  };

  return (
    <div>
      <div>
        <h2 className="heading">Update Event</h2>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {/* <SuccessModal isOpen={isSubmitted} onClose={() => setIsSubmitted(false)} /> */}
    </div>
  );
}

function SuccessModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
      <div className="modal-header">
        <h2>Success!</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="modal-body">
        <i className="fas fa-check-circle">hello</i> Event updated successfully!
      </div>
    </Modal>
  );
}

export default UpdateEventForm;




// import React, { useState } from 'react';

// const UpdateEventForm = ({ event, onUpdate }) => {
   
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//       };
      
//     console.log("IN UpdateEventForm");
//   const [title, setTitle] = useState(event.title);
//   const [description, setDescription]= useState(event.description);
//   const [date, setDate] = useState(formatDate(event.date));
//   const [location, setLocation] = useState(event.location);
//   const [image, setImage] = useState(null);

//   const handleFileChange=(e)=>{
//     setImage(e.target.files[0]);
//   };

 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = { title, description, date, location };
//     onUpdate(event.id, updatedData, image);
//   };

//   return (
//     <div>
//     <div>
//      <h2 className="heading">Register Event</h2>   
//     </div>    
//    <form className="registration-form" onSubmit={handleSubmit}>
//     <div>
//     <label htmlFor="title">Title:</label>
//     <input 
//       type="text" 
//       id="title" 
//       value={title} 
//       onChange={(e) => setTitle(e.target.value)} 
//       required 
//     />
//   </div>
//   <div>
//     <label htmlFor="description">Description:</label>
//     <textarea 
//       id="description" 
//       value={description} 
//       onChange={(e) => setDescription(e.target.value)} 
//       required 
//     />
//   </div>
//   <div>
//     <label htmlFor="date">Date:</label>
//     <input 
//       type="date" 
//       id="date" 
//       value={date} 
//       onChange={(e) => setDate(e.target.value)} 
//       required 
//     />
//   </div>
//   <div>
//     <label htmlFor="location">Location:</label>
//     <input 
//       type="text" 
//       id="location" 
//       value={location} 
//       onChange={(e) => setLocation(e.target.value)} 
//       required 
//     />
//   </div>
//   <div>
//   <label htmlFor="image">Image:</label>
//       <input
//         type="file"
//         id="image"
//         onChange={handleFileChange}
//         required
//       />
//   </div>
//   <button type="submit">Submit</button>
// </form>
// {/* <SuccessModal isOpen={IsSubmitted} onClose={()=>setIsSubmitted(false)} /> */}
// </div>
//   );
// };

// export default UpdateEventForm;













// // import React from 'react';
// // import './RegisterEvent.css';
// // import axios from 'axios';
// // import Modal from 'react-modal';
// // import './Modal.css';

// // import {useState} from 'react';

// // function RegistrationForm() {
// //     const [title, setTitle]= useState('');
// //     const [description, setDescription]= useState('');
// //     const [date, setDate]= useState('');
// //     const [location, setLocation]= useState('');
// //     const [image, setImage]= useState(null);
// //     const [IsSubmitted,setIsSubmitted ]=useState(false);

// //     const handleFileChange=(e)=>{
// //       setImage(e.target.files[0]);
// //     };

// //     const handleSubmit=(e)=> {
// //         e.preventDefault();
// //        const formData={
// //         title,
// //         description,
// //         date,
// //         location,
// //         image
// //        };

// //        axios.post('http://localhost:3009/event/createEvent',formData,{
// //         headers:{
// //           'Content-Type':'multipart/form-data',
// //         },
// //        })
// //        .then(response=>{
// //         console.log('Form submitted successfully',response.data);
// //         setIsSubmitted(true);
// //         setTitle('');
// //         setDescription('');
// //         setDate('');
// //         setLocation('');
// //         setImage(null);
// //        })
// //        .catch(error=>{
// //         console.error("Error submitting form",error);
// //        });
// //     };

// //     return (
// //         <div>
// //         <div>
// //          <h2 className="heading">Register Event</h2>   
// //         </div>    
// //        <form className="registration-form" onSubmit={handleSubmit}>
// //         <div>
// //         <label htmlFor="title">Title:</label>
// //         <input 
// //           type="text" 
// //           id="title" 
// //           value={title} 
// //           onChange={(e) => setTitle(e.target.value)} 
// //           required 
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="description">Description:</label>
// //         <textarea 
// //           id="description" 
// //           value={description} 
// //           onChange={(e) => setDescription(e.target.value)} 
// //           required 
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="date">Date:</label>
// //         <input 
// //           type="date" 
// //           id="date" 
// //           value={date} 
// //           onChange={(e) => setDate(e.target.value)} 
// //           required 
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="location">Location:</label>
// //         <input 
// //           type="text" 
// //           id="location" 
// //           value={location} 
// //           onChange={(e) => setLocation(e.target.value)} 
// //           required 
// //         />
// //       </div>
// //       <div>
// //       <label htmlFor="image">Image:</label>
// //           <input
// //             type="file"
// //             id="image"
// //             onChange={handleFileChange}
// //             required
// //           />
// //       </div>
// //       <button type="submit">Submit</button>
// //     </form>
// //     <SuccessModal isOpen={IsSubmitted} onClose={()=>setIsSubmitted(false)} />
// //     </div>
// //     );
// // }

// // function SuccessModal ({isOpen, onClose}) {
// //   return (
// //     <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
// //             <div className="modal-header">
// //                 <h2>Success!</h2>
// //                 <button onClick={onClose} className="close-button">×</button>
// //             </div>
// //             <div className="modal-body">
// //             <i className="fas fa-check-circle">hello</i> Page submitted successfully!

// //                 {/* <p>Page submitted successfully!</p> */}
// //             </div>
// //         </Modal>
// //   )
// // }

// // // export default RegistrationForm;