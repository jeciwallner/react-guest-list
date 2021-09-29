import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from './images/pumpkin.png';

// const newGuest = [
//   { firstName: 'Johanna', lastName: 'Hume', coming: true },
//   { firstName: 'Verena', lastName: 'Jungk', coming: true },
//   { firstName: 'Michael', lastName: 'Wallner', coming: true },
// ];

// export default App;

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // create a state with a hook:
  const [guestList, setGuestList] = useState([]);

  const handleChangeFirst = (event) => {
    const updatedFirstName = event.target.value;
    setFirstName(updatedFirstName);
  };
  // const [lastName, setLastName] = useState('');
  const handleChangeLast = (e) => {
    const updatedLastName = e.target.value;
    setLastName(updatedLastName);
  };
  // const [coming, setComing] = useState(false);

  const fetchGuests = async () => {
    const response = await fetch('https://pumpkinpieshalloween.herokuapp.com');
    const allGuests = await response.json();
    setGuestList(allGuests);
    console.log(allGuests);
  };
  // use Effect makes sure that anything that's inside gets reloaded when the page reloads
  useEffect(() => {
    fetchGuests();
  }, []);
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
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="App-form">
        <label>
          First Name: <input value={firstName} onChange={handleChangeFirst} />
          {/* <p>Is that right? {firstName}</p> */}
        </label>
        <label>
          Last Name: <input value={lastName} onChange={handleChangeLast} />
          {/* <p>Is that right? {lastName}</p> */}
        </label>
        <br></br>
        {/* question with checkbox, checking attendance: */}
        {/* <label>
          Are you coming?
          <input
            type="checkbox"
            // 2. Connect the state variable to the controlled component
            value="checked"
            // 3. Change the state variable when the user interacts
            onChange={(event) => setComing(event.currentTarget.checked)}
          />
        </label> */}
        {/* Answers to whether the person is attending: */}
        {/* <div>
          Your answer:{' '}
          {coming ? 'See you there!' : 'Sorry, I`m hanging someplace else.'}
        </div> */}

        <br />

        <button
          onClick={() => {
            async function postGuest() {
              // language is json
              const response = await fetch(
                `https://pumpkinpieshalloween.herokuapp.com`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                  }),
                },
              );
              const createdGuest = await response.json();
              console.log(createdGuest);
              fetchGuests();
            }
            postGuest();
            setFirstName('');
            setLastName('');
          }}
        >
          Hit it!
        </button>
      </div>
      <p>Folks attending:</p>
      <ul>
        {guestList.map((newGuest) => {
          return (
            <li key={newGuest.id}>
              {newGuest.firstName} {newGuest.lastName}
              {newGuest.attending
                ? ' is going to bring the house down!'
                : ' is hanging someplace else.'}
              <button
                onClick={() => {
                  async function deleteGuest() {
                    const response = await fetch(
                      `https://pumpkinpieshalloween.herokuapp.com/${newGuest.id}`,
                      {
                        method: 'DELETE',
                      },
                    );
                    const deletedGuest = await response.json();
                    console.log(
                      `https://pumpkinpieshalloween.herokuapp.com/${newGuest.id}`,
                      deletedGuest,
                    );
                    fetchGuests();
                  }
                  deleteGuest();
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  async function updateGuest() {
                    const response = await fetch(
                      `https://pumpkinpieshalloween.herokuapp.com/${newGuest.id}`,
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        // in this case ! means : do the opposite with booleans / do not what's in the variable
                        body: JSON.stringify({
                          attending: !newGuest.attending,
                        }),
                      },
                    );
                    const updatedGuest = await response.json();
                    fetchGuests();
                  }
                  updateGuest();
                }}
              >
                Are You Coming?
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
