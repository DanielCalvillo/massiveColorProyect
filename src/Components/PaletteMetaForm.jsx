import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css';

const styles = {

}

class PaletteMetaForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleClickOpen = () => {
      this.setState({
          open: !this.state.open
      })
    };

    handleChange(evt) {
        this.setState({ 
            [evt.target.name]: evt.target.value
        })
    }

    render(){
        const { open, newPaletteName } = this.state
        const {hideForm, handleSubmit} = this.props
        return (
            <Dialog 
                open={open} 
                aria-labelledby="form-dialog-title"
                onClose={hideForm}
            >
                <DialogTitle id="form-dialog-title">
                    se a Palette Name
                </DialogTitle>
                <ValidatorForm 
                    onSubmit={() => handleSubmit(newPaletteName)}
                >
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette. Make sure itś unique!
                        </DialogContentText>
                        <Picker />
                                <TextValidator 
                                    label="Palette Name" 
                                    name='newPaletteName'
                                    value={newPaletteName} 
                                    onChange={this.handleChange}
                                    fullWidth
                                    margin='normal'
                                    validators={["required", "isPaletteNameUnique"]}
                                    errorMessages={["Enter Palette Name", "Name already used"]}
                                />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={hideForm} 
                            color="primary"
                        >
                        Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary"
                            type='submit'
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
  }

export default withStyles(styles)(PaletteMetaForm);