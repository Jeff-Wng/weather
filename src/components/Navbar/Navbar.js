import React, {Component} from 'react';
import classes from './Navbar.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class navbar extends Component {
    
    render() {
        return (
            <div className={classes.Navbar}>
                <ul>
                    <li><NavLink className={classes.NavLink} exact to='/'>Home</NavLink></li>
                    {this.props.loggedIn ? <li><NavLink className={classes.NavLink} exact to='/saved'>Saved</NavLink></li> : null}
                    {!this.props.loggedIn
                        ? <li><NavLink className={classes.NavLink} exact to='/auth'>Sign-Up / Log-In</NavLink></li>
                        : <li><NavLink className={classes.NavLink} exact to='/' onClick={this.props.logOut}>Log-Out</NavLink></li> }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        displayName: state.auth.displayName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(actions.logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);