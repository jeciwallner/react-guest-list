import './App.css';
import React, { useState } from 'react';
import logo from './images/pumpkin.png';

function App() {
  const [formInput, setFormInput] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleChange = (e) => {
    setFormInput(e.target.value);
  };
  const [coming, setComing] = useState(false);
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
          Are you coming?
          <input
            type="checkbox"
            // 2. Connect the state variable to the controlled component
            checked={coming}
            // 3. Change the state variable when the user interacts
            onChange={(event) => setComing(event.currentTarget.checked)}
          />
        </label>
        {buttonClicked && (
          <div>
            Your answer:{' '}
            {coming ? 'Yes, of course!' : 'Sorry, I am hanging somewhere else.'}
          </div>
        )}
        {/* event listener to trigger onCLick  */}
        {/* <label>
          I'm bringing someone: <input />
        </label>
        <label>
          I'm bringing something: <input />
        </label> */}
      </form>
      <h5>First Name: {formInput}</h5>
      <h5>Last Name: {formInput}</h5>
    </div>
  );
}

export default App;
