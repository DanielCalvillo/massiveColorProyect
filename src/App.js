import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import './Assets/App.css';
import seedColors from './seedColors';
import Palette from './Components/Palette';
import { generatePalette } from './ColorHelpers'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path='/' 
          render={() => <h1>PALETTE LIST GOES HERE</h1>}
        />
        <Route 
          exact 
          path="/palette/:id" 
          render={() => <h1>INDIVIDUAL PALETTE GOES HERE</h1>}
        />
      </Switch>

      // <div className="Palette">
      //   <Palette palette={generatePalette(seedColors[4])}/>
      //   {/* footer eventually */}
      // </div>
    );
  }
}

export default App;
