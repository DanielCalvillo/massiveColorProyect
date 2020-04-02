import React from 'react';
import './Assets/App.css';
import seedColors from './seedColors';
import Palette from './Components/Palette';

function App() {
  return (
    <div className="Palette">
      <h1>Palette</h1>
      <Palette {...seedColors[4]}/>
      {/* footer eventually */}
    </div>
  );
}

export default App;
