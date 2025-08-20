import React, { createContext } from 'react';
import Child1 from './Child1';

const Storage1 = createContext();
const Storage2 = createContext();

const App = () => {
  const name = "shiva";
  const age = 25;

  return (
    <div>
      <Storage1.Provider value={name}>
      <Storage2.Provider value={age}>
        <Child1 />
      </Storage2.Provider>
      </Storage1.Provider>
    </div>

  );
};

export { Storage1, Storage2 };
export default App;
