
import React from 'react';
import './Navbar.css'; 



const Navbar = ({handleRouteChange}) => {

  
  return (

    <nav className="navbar">
      
      <button onClick={() => handleRouteChange('home')}>Home</button>
      <button onClick={() => handleRouteChange('movie')}>Movie</button>
      <button onClick={() => handleRouteChange('director')}>Director</button>
      <button onClick={() => handleRouteChange('genre')}>Genre</button>
      <button onClick={() => handleRouteChange('actor')}>Actor</button>
      
    </nav>
    
  );
};

export default Navbar;
