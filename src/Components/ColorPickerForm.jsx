import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from '../Assets/styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            newColorName: "",
            currentColor: "teal"
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.handleAddNewColor = this.handleAddNewColor.bind(this)
    }

    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !==  value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value => 
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    handleChange(evt) {
        this.setState({ 
            [evt.target.name]: evt.target.value
        })
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex})
    }

    handleAddNewColor() {
        const newColor = { 
            color: this.state.currentColor, 
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.state({
            newColorName: ""
        })
    }

    render() {
        const { paletteIsFull, classes } = this.props
        const { currentColor, newColorName } = this.state
        return(
            <div>
                <ChromePicker 
                    color={currentColor} 
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleAddNewColor}>
                    <TextValidator 
                        value={newColorName} 
                        className={classes.colorNameInput}
                        placeholder="Color Name"
                        name='newColorName'
                        variant= "filled"
                        margin= "normal"
                        onChange={this.handleChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={[
                            "Enter a color name",
                            "Color name must be unique",
                            "Color already used"
                        ]}
                    />
                    <Button 
                        variant="contained" 
                        type="submit"
                        color="primary" 
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{
                            backgroundColor: paletteIsFull
                            ? "gray" 
                            : this.state.currentColor 
                        }}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }  
}

export default withStyles(styles)(ColorPickerForm)