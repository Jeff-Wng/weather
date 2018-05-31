import React from 'react';
import classes from './Results.css'

const results = (props) => {
    const iconURL = 'https://openweathermap.org/img/w/';

    return (
        <div className={classes.Results}>
            <div className={classes.Weather}>
                <img src={iconURL + props.icon + '.png'} alt='weather icon' />
                <p>{props.description}</p>
                <h2>{Math.round(props.temperature)}°</h2>
            </div>
            <ul className={classes.Info}>
                <li><p>High: {Math.round(props.max)}°</p></li>
                <li><p>Low: {Math.round(props.low)}°</p></li>
                <li><p>Humidity: {props.humidity}%</p></li>
                <li><p>Wind Speeds: {Math.round(props.windSpeeds)} mph</p></li>
            </ul>
        </div>
    )
}

export default results;