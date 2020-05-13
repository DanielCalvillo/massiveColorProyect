import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import { generatePalette } from './ColorHelpers'
import seedColors from './seedColors';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import SingleColorPalette from './Components/SingleColorPalette';
import NewPaletteForm from './Components/NewPaletteForm';

import './Assets/App.css';

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
          path="/palette/new" 
          render={() => <NewPaletteForm />} 
        />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => 
            <PaletteList palettes={seedColors} {...routeProps}/>}
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
        <Route 
          exact path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
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
