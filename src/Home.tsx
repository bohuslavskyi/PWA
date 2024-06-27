import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the Home page!</p>
      <button onClick={() => navigate('/')}>Log Out</button>
    </div>
  );
}

export default Home;