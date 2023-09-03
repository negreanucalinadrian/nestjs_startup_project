import React from 'react';
import {Route, Routes} from 'react-router-dom';
import UserPage from '@/pages/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserPage/>}/>
    </Routes>
);
}

export default App;
