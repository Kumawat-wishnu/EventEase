import React from 'react';
import UserDetails from '../components/Admin/userDetails';

function UserDetailsPage(){
    console.log("we r in userDetails page");
  return (
    
    <div className="userDetailsPage">
    <UserDetails/>
    </div>
  );
}

export default UserDetailsPage;