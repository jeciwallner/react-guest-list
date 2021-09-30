import './App.css';
import { Puff, useLoading } from '@agney/react-loading';
import React, { useEffect, useState } from 'react';
import logo from './images/pumpkin.png';

// conditional rendering for spinning thingy?

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

  // useState for spinny thing
  const [pageIsLoading, setPageIsLoading] = useState(true);

  // create a state with a hook:
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
    console.log(allGuests);
  };
  // use Effect makes sure that anything that's inside gets reloaded when the page reloads
  useEffect(() => {
    fetchGuests();
    // {
    //   <input className="App-input" disabled />;
    // }
    setTimeout(() => setPageIsLoading(false), 5000);
  }, []);

  return (
    <div className="App">
      {}
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
      <div className="App-form">
        <label>
          First Name:{' '}
          <input
            className="App-input"
            value={firstName}
            // onClick, onChange etc need a function, this one is NOT calling another function, but passing the reference of one!
            onChange={handleChangeFirst}
            // type="text" disabled? (setPageIsLoading === 'true' : null}
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
          // onCLick needs a function, this one is calling another one
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

      <div className="App-box">
        <p>Folks attending:</p>

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
                            // in this case ! means : do the opposite with booleans / do not what's in the variable
                            body: JSON.stringify({
                              attending: !newGuest.attending,
                            }),
                          },
                        );
                        const updatedGuest = await response.json();
                        // Show the above variable in console.log to see what it does!
                        // console.log('this is an identifier', updatedGuest);
                        fetchGuests();
                      }
                      updateGuest();
                    }}
                  >
                    Are You Coming?{' '}
                    <span role="img" aria-label="Do come!!!" alt="party emoji">
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

{
  /* question with checkbox, checking attendance: */
}
{
  /* <label>
          Are you coming?
          <input
            type="checkbox"
            // 2. Connect the state variable to the controlled component
            value="checked"
            // 3. Change the state variable when the user interacts
            onChange={(event) => setComing(event.currentTarget.checked)}
          />
        </label> */
}
{
  /* Answers to whether the person is attending: */
}
{
  /* <div>
          Your answer:{' '}
          {coming ? 'See you there!' : 'Sorry, I`m hanging someplace else.'}
        </div> */
}
