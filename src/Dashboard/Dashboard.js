import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'; 
import './Dashboard.css';
import Home from '../Home/Home';
import Actor from '../Actor/Actor';
import Genre from '../Genre/Genre';
import Director from '../Director/Director';
import Movie from '../Movie/Movie';


const Dashboard = () => {

  const [route, setRoute] = useState('home');

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  
  let content;
  switch (route) {
    case 'home':
      content = <Home />;
      break;
    case 'movie':
      content = <Movie />;
      break;
    case 'director':
      content = <Director />;
      break;
    case 'actor':
      content = <Actor />;
      break;
    case 'genre':
      content = <Genre />;
      break;

  

    default:
      content = <Home />;
  }
    
    return (
      <div className='dashboard-content'>
         <Navbar  handleRouteChange={handleRouteChange} />
         {content}
        
      </div>
    );
  };
  
  export default Dashboard;