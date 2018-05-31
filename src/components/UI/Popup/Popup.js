import React from 'react';
import classes from './Popup.css';

const popup = (props) => {
    
    let inputClasses = [];
    if (!props.saved) {
        inputClasses = [classes.PopupSaved];
    } else if (props.saved) {
        inputClasses = [classes.PopupSaved, classes.Animation];
    } else if (!props.delete) {
        inputClasses = [classes.PopupDelete];
    } else if (props.delete) {
        inputClasses = [classes.PopupDelete, classes.Animation];
    }

    return (
        <div className={inputClasses.join(' ')}>Weather Saved!</div>
    )
}

export default popup;