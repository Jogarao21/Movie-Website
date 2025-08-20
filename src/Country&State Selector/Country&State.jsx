import React, { useState } from 'react';

// Sample Data
const countryStateData = {
  India: ['Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra'],
  USA: ['California', 'Texas', 'Florida', 'New York'],
  Canada: ['Ontario', 'Quebec', 'Alberta', 'British Columbia'],
  Australia: ['New South Wales', 'Victoria', 'Queensland'],
};

const CountryStateSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStates(countryStateData[country] || []);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Country and State</h2>

      <label>
        Country:
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">--Select Country--</option>
          {Object.keys(countryStateData).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </label>

      <br /><br />

      {states.length > 0 && (
        <label>
          State:
          <select>
            <option value="">--Select State--</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default CountryStateSelector;
