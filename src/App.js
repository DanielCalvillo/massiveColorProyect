import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import { generatePalette } from './ColorHelpers'
import seedColors from './seedColors';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import SingleColorPalette from './Components/SingleColorPalette';
import NewPaletteForm from './Components/NewPaletteForm';
import { TransitionGroup, CSSTransition } from "react-transition-group"

import './Assets/App.css';

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = { palettes: savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this)
    this.syncLocalStorage = this.syncLocalStorage.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }

  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id
    });
  }

  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  savePalette(newPalette) {
    this.setState( 
      { palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage
    );
  }

  syncLocalStorage(){
    window.localStorage.setItem(
      "palettes", 
      JSON.stringify(this.state.palettes)
    )
  }

  render() {
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
                <Route 
                  exact 
                  path="/palette/new" 
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm 
                        savePalette={this.savePalette}
                        palettes={this.state.palettes} 
                        {...routeProps}
                      />
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path='/' 
                  render={(routeProps) => 
                    <div className="page">
                      <PaletteList 
                        palettes={this.state.palettes} 
                        deletePalette={this.deletePalette} 
                        {...routeProps}
                      />
                    </div>
                  }
                />
                <Route 
                  exact 
                  path="/palette/:id" 
                  render={routeProps => (
                    <div className="page">
                      <Palette 
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route 
                  exact path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <div className="page">
                      <SingleColorPalette 
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>

      // <div className="Palette">
      //   <Palette palette={generatePalette(seedColors[4])}/>
      //   {/* footer eventually */}
      // </div>
    );
  }
}

export default App;
