import './App.css';
import React, { useState } from 'react';
import logo from './images/pumpkin.png';

function App() {
  const [formInput, setFormInput] = useState('');

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };

  const initialList = [];
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pumpkin Pie's Halloween Blowout</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <form className="App-form">
        <label>
          First Name:{' '}
          <input type="text" value={formInput} onChange={handleChange} />
        </label>
        <label>
          Last Name:{' '}
          <input type="text" value={formInput} onChange={handleChange} />
        </label>
        <label>
          I'm coming: <input />
        </label>
        <label>
          I'm bringing someone: <input />
        </label>
        <label>
          I'm bringing something: <input />
        </label>
      </form>
      <h5>First Name: {formInput}</h5>
      <h5>Last Name: {formInput}</h5>
    </div>
  );
}

export default App;
