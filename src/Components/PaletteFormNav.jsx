import React, {Component} from 'react'
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from './PaletteMetaForm';
import {Link } from 'react-router-dom'
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import styles from '../Assets/styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            formShowing: false
        }
        this.showForm = this.showForm.bind(this)
        this.hideForm = this.hideForm.bind(this)

    }

    showForm() {
        this.setState({
            formShowing: true
        })
    }

    hideForm(){
        this.setState({
            formShowing: false
        })
    }
    
    render(){
        const {classes, open, palettes} = this.props
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position="fixed"
                color="default"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button 
                                variant='contained' 
                                color='secondary'
                                className={classes.button}
                            >
                                Go Back
                            </Button>
                        </Link>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.showForm}
                            className={classes.button}
                        >
                            SAVE
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing &&(
                    <PaletteMetaForm 
                        handleSubmit={this.props.handleSubmit}
                        palettes={palettes}
                        hideForm={this.hideForm}
                    />
                    )
                }
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true})(PaletteFormNav)