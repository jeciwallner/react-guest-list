import './App.css';
import { Puff, useLoading } from '@agney/react-loading';
import React, { useEffect, useState } from 'react';
import logo from './images/pumpkin.png';

function Content() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="50" />,
  });
  return <section {...containerProps}>{indicatorEl}</section>;
}

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // useState for spinny thing:
  const [pageIsLoading, setPageIsLoading] = useState(true);

  // useState with a hook:
  const [guestList, setGuestList] = useState([]);

  const handleChangeFirst = (event) => {
    const updatedFirstName = event.target.value;
    setFirstName(updatedFirstName);
  };

  const handleChangeLast = (e) => {
    const updatedLastName = e.target.value;
    setLastName(updatedLastName);
  };

  const fetchGuests = async () => {
    const response = await fetch('https://pumpkinpieshalloween.herokuapp.com');
    const allGuests = await response.json();
    setGuestList(allGuests);
    setPageIsLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // Spinning Pumpkin Image
  return (
    <div className="App">
      <header
        className="
      App-header"
      >
        <h1>Pumpkin Pie's Halloween Blowout</h1>
        <br />
        <br />
        <br />
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      {/* conditional rendering: input fields only displayed when page has finished loading! */}
      {pageIsLoading ? (
        <div>Page is Loading...</div>
      ) : (
        <div className="App-form">
          <label>
            First Name:{' '}
            <input
              className="App-input"
              value={firstName}
              onChange={handleChangeFirst}
            />
          </label>
          <label>
            Last Name:{' '}
            <input
              className="App-input"
              value={lastName}
              onChange={handleChangeLast}
            />
          </label>
          <br />
          <button
            className="App-button"
            onClick={() => {
              async function postGuest() {
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
                fetchGuests(response);
              }
              postGuest();
              setFirstName('');
              setLastName('');
            }}
          >
            Hit it!
          </button>
        </div>
      )}
      <div className="App-box">
        <p>Folks attending:</p>

        {/* conditional rendering: shows bloopy thing while loading and guests are only displayed when page has finished loading! */}
        {pageIsLoading ? (
          <Content />
        ) : (
          <ul>
            {guestList.map((newGuest) => {
              return (
                <li key={newGuest.id}>
                  {newGuest.firstName} {newGuest.lastName}
                  {newGuest.attending
                    ? ' is going to bring the house down!'
                    : ' is hanging someplace else.'}
                  <br />
                  <button
                    className="App-toggle"
                    onClick={() => {
                      async function deleteGuest() {
                        const response = await fetch(
                          `https://pumpkinpieshalloween.herokuapp.com/${newGuest.id}`,
                          {
                            method: 'DELETE',
                          },
                        );
                        fetchGuests(response);
                      }
                      deleteGuest();
                    }}
                  >
                    Remove Guest
                  </button>
                  <button
                    className="App-toggle"
                    onClick={() => {
                      async function updateGuest() {
                        const response = await fetch(
                          `https://pumpkinpieshalloween.herokuapp.com/${newGuest.id}`,
                          {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              attending: !newGuest.attending,
                            }),
                          },
                        );
                        fetchGuests(response);
                      }

                      updateGuest();
                    }}
                  >
                    Are You Coming?{' '}
                    <span
                      role="img"
                      aria-label="Please come!!!"
                      alt="party emoji"
                    >
                      🥳
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
