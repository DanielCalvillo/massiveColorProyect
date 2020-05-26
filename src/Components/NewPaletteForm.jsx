import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm';
import classNames from "classnames";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import styles from '../Assets/styles/NewPaletteFormStyles'
import seedColors from '../seedColors';
  
class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props)
        this.state = {
            open: true,
            colors: seedColors[0].colors
        }
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
  
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    addNewColor(newColor){
        this.setState({
                colors: [...this.state.colors, newColor], 
                newColorName: ""
            })
    }

    handleChange(evt) {
        this.setState({ 
            [evt.target.name]: evt.target.value
        })
    }

    clearColors() {
        this.setState({
            colors: []
        })
    }

    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand]
        this.setState({
            colors: [...this.state.colors, randomColor]
        })
    }

    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
        newPalette.colors = this.state.colors

        this.props.savePalette(newPalette);
        //redirect to de main page using history
        this.props.history.push("/");       
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter( color => color.name  !== colorName)
        })
    }


    // onSortEnd = ({oldIndex, newIndex}) => {
    //     const arrayMoveMutate = (array, from, to) => {
    //         const startIndex = to < 0 ? array.length + to : to;
    //         const item = array.splice(from, 1)[0];
    //         return array.splice(startIndex, 0, item);
    //     };
    //     const arrayMove = (array, from, to) => {
    //         array = array.slice();
    //         arrayMoveMutate(array, from, to);
    //         return array;
    //     };
    //     this.setState(colors => ({
    //         colors: arrayMove((colors, oldIndex, newIndex))
    //     }))
    // }

    render() {
        const { classes, maxColors, palettes } = this.props
        const { open , colors} = this.state
        const paletteIsFull = colors.length >= maxColors 

        return (
        <div className={classes.root}>
            <PaletteFormNav 
                open={open} 
                palettes={palettes} 
                handleSubmit={this.handleSubmit} 
                handleDrawerOpen={this.handleDrawerOpen}
                />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                    <Typography variant="h4">
                        Design Your Palette
                    </Typography>
                    <div className={classes.buttons}>
                        <Button 
                            variant="contained" 
                            className={classes.button}
                            color='secondary'
                            onClick={this.clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button 
                            variant="contained"
                            className={classes.button} 
                            color='primary' 
                            onClick={this.addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm 
                        paletteIsFull={paletteIsFull}
                        colors={this.state.colors}
                        addNewColor={this.addNewColor}
                    />
                </div>
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList 
                    colors={colors} 
                    removeColor={this.removeColor}
                    axis="xy"
                    distance={20}
                    // onSortEnd={this.onSortEnd}
                />
            </main>
        </div>
        );
    }
}

export default withStyles(styles, { withTheme: true})(NewPaletteForm)