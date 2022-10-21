import React, {useEffect, useState} from 'react'
import { Container } from '@mui/system';
import Navbar from './components/Navbar';
import Comments from './components/Comments';



function App() {
  return (
    <Container maxWidth="xl">
    <div className="App">
    <Navbar></Navbar>
      
      <Comments currentUserId ="1" />
    </div>
    </Container>
  );
}

export default App;


