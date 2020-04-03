import React, { Component } from 'react';
import './Assets/App.css';
import seedColors from './seedColors';
import Palette from './Components/Palette';
import { generatePalette } from './ColorHelpers'

class App extends Component {
  render() {
    return (
      <div className="Palette">
        <Palette palette={generatePalette(seedColors[4])}/>
        {/* footer eventually */}
      </div>
    );
  }
}

export default App;
