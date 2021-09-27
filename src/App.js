import './App.css';
import React, { useState } from 'react';
import logo from './images/pumpkin.png';

const fakeGuest = [
  { firstName: 'Johanna', lastName: 'Hume', coming: true },
  { firstName: 'José', lastName: 'Hower', coming: false },
  { firstName: 'Michael', lastName: 'Wallner', coming: true },
];

// export default App;

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // create a state with a hook:
  const [guestList, setGuestList] = useState(fakeGuest);

  const handleChangeFirst = (event) => {
    const updatedFirstName = event.target.value;
    setFirstName(updatedFirstName);
  };
  // const [lastName, setLastName] = useState('');
  const handleChangeLast = (e) => {
    const updatedLastName = e.target.value;
    setLastName(updatedLastName);
  };
  const [coming, setComing] = useState('');
  const initialList = [];
  return (
    <div className="App">
      <header
        className="
      App-header"
      >
        <h1>Pumpkin Pie's Halloween Blowout</h1>
        <br></br>
        <br></br>
        <br></br>
        <img
          src={logo}
          className="
        App-logo"
          alt="logo"
        />
      </header>

      <div className="App-form">
        <label>
          First Name: <input value={firstName} onChange={handleChangeFirst} />
          <p>Is that right? {firstName}</p>
        </label>
        <label>
          Last Name: <input value={lastName} onChange={handleChangeLast} />
          <p>Is that right? {lastName}</p>
        </label>
        <br></br>
        {/* question with checkbox, checking attendance: */}
        <label>
          Are you coming?
          <input
            type="checkbox"
            // 2. Connect the state variable to the controlled component
            value="checked"
            // 3. Change the state variable when the user interacts
            onChange={(event) => setComing(event.currentTarget.checked)}
          />
        </label>
        {/* Answers to whether the person is attending: */}
        <div>
          Your answer:{' '}
          {coming ? 'See you there!' : 'Sorry, I`m hanging someplace else.'}
        </div>

        <br></br>

        <button
          onClick={() => {
            guestList.push({});
            setGuestList([fakeGuest[(0, 2)]]);
          }}
        >
          Hit it!
        </button>
      </div>
      <p>Folks attending:</p>
      <ul>
        {guestList.map((fakeGuest) => {
          return (
            <li
              key={fakeGuest.firstName}
              key={fakeGuest.lastName}
              key={fakeGuest.coming}
            >
              {fakeGuest.firstName} {fakeGuest.lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
