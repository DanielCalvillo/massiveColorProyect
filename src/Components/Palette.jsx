import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles"; 
import '../Assets/Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors: {
        height: "90%"
    }
}

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 500, format: "hex"}
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(level) {
        this.setState({ level })
    }

    changeFormat(val){
        this.setState({ format: val});
    }

    render(){

        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level , format} = this.state;
        let colorBoxes = colors[level].map( color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true}
            />
        ))

        return(
            <div className={classes.Palette}>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors={true}
                />
                <div className={classes.PaletteColors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette)