import React from 'react';
import classes from './notification.css';
import {NavLink} from 'react-router-dom';

const notification = () => {
    return (
        <div className={classes.Notification}>
            <p>You need to sign in to save weather</p>
            <NavLink exact to='/auth' className={classes.NavLink}>Sign-Up / Log-In</NavLink>
        </div>        
    )
}

export default notification;