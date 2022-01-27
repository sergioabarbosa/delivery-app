import React from 'react';
import Routes from './routes';
import { UserProvider } from './context';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
