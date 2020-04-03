import React, { Component } from 'react';
import './Assets/App.css';
import seedColors from './seedColors';
import Palette from './Components/Palette';
import { generatePalette } from './ColorHelpers'

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div className="Palette">
        <Palette {...seedColors[4]}/>
        {/* footer eventually */}
      </div>
    );
  }
}

export default App;
