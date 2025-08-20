import { useState } from 'react';
import Prabhas from './assets/Prabhas.jpg';
import VijayDevarakonda from './assets/VijayDevarakonda.jpg';
import Nani from './assets/Nani.jpg';
import Ntr from './assets/Ntr.jpg';
import NitishKumarReddy from './assets/NitishKumarReddy.jpg';
import ShivaReddy from './assets/Cropped.jpg';
import './Project1/BirthdayNotify.scss';

export default function BirthdayNotifications() {
  const [birthdays, setBirthdays] = useState([
    {
      id: 1,
      name: "Vijay Devarakonda",
      age: 36,
      avatar:VijayDevarakonda
    },
    {
      id: 2,
      name: "Rebel Star Prabhas",
      age: 42,
      avatar: Prabhas
    },
    {
      id: 3,
      name: "Natural Star Nani",
      age: 39,
      avatar: Nani
    },
    {
      id: 4,
      name: "Jr. Ntr",
      age: 41,
      avatar: Ntr
    },
    {
      id: 5,
      name: "Nitish Kumar Reddy",
      age: 27,
      avatar: NitishKumarReddy
    },
    {
      id: 6,
      name: "Shiva Shankar Reddy",
      age: 21,
      avatar: ShivaReddy
    }
  ]);

  const clearAll = () => {
    setBirthdays([]);
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <h1 className="title">
            {birthdays.length} birthdays today
          </h1>
          
          {birthdays.length > 0 ? (
            <div className="birthday-list">
              {birthdays.map((person) => (
                <div key={person.id} className="birthday-item">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="avatar"
                  />
                  <div className="person-info">
                    <h2 className="person-name">
                      {person.name}
                    </h2>
                    <p className="person-age">
                      {person.age} years
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state"></div>
          )}
          
          <button
            onClick={clearAll}
            className="clear-button">Clear All
          </button>
        </div>
      </div>
    </>
  );
}