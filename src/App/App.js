import React from 'react';
import { useStore } from "../store";
import './App.css';
import { NavBar } from '../NavBar/NavBar'

function App() {
  const { state, dispatch } = useStore();

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
