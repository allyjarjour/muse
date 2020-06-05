import React from 'react';
import { useStore } from "./store";
import './App.css';

function App() {
  const { state, dispatch } = useStore();

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
