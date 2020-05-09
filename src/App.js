import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import './Assets/App.css';
import seedColors from './seedColors';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import { generatePalette } from './ColorHelpers'

class App extends Component {
  findPalette(id){
    return seedColors.find(function(palette){
      return palette.id === id
    });
  }
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path='/' 
          render={() => <PaletteList palettes={seedColors}/>}
        />
        <Route 
          exact 
          path="/palette/:id" 
          render={routeProps => (
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
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
