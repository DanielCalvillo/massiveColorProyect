import React, { Component } from 'react';
import ColorBox from './ColorBox';
import '../Assets/Palette.css';

class Palette extends Component {

    render(){

        let colorBoxes = this.props.palette.colors[400].map( color => (
            <ColorBox background={color.hex} name={color.name} />
        ))

        return(
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer eventually */}
            </div>
        )
    }
}

export default Palette