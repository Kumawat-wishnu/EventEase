import React from 'react';
import './RegisterEvent.css';
import axios from 'axios';
import Modal from 'react-modal';
import './Modal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import {useState} from 'react';

function RegistrationForm() {
    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    const [date, setDate]= useState('');
    const [location, setLocation]= useState('');
    const [image, setImage]= useState(null);
    const [IsSubmitted,setIsSubmitted ]=useState(false);

    const handleFileChange=(e)=>{
      setImage(e.target.files[0]);
    };

    const handleSubmit=(e)=> {
        e.preventDefault();
       const formData={
        title,
        description,
        date,
        location,
        image
       };

       axios.post('http://localhost:3009/event/createEvent',formData,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
       })
       .then(response=>{
        console.log('Form submitted successfully',response.data);
        setIsSubmitted(true);
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setImage(null);
       })
       .catch(error=>{
        console.error("Error submitting form",error);
       });
    };

    return (
        <div>
        <div>
         <h2 className="heading">Register Event</h2>   
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
            required
          />
      </div>
      <button type="submit">Submit</button>
    </form>
    <SuccessModal isOpen={IsSubmitted} onClose={()=>setIsSubmitted(false)} />
    </div>
    );
}

function SuccessModal ({isOpen, onClose}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
            <div className="modal-header">
                <h2>Success!</h2>
                <button onClick={onClose} className="close-button">×</button>
            </div>
            <div className="modal-body">
            <i className="fas fa-check-circle"></i> Page submitted successfully!

                {/* <p>Page submitted successfully!</p> */}
            </div>
        </Modal>
  )
}

export default RegistrationForm;