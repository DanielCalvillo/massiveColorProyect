import React, { Component } from 'react';
import '../Assets/ColorBox.css'

class ColorBox extends Component {
    render(){
        return (
            <div style={{backgroundColor: this.props.background}} className="ColorBox">
                <span>{this.props.name}</span>
                <span>MORE</span>
            </div>
        )
    }
}

export default ColorBox;