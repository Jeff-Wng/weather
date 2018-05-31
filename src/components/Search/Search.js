import React from 'react';
import classes from './Search.css'

const search = (props) => {
    return (
        <div className={classes.Search}>
            <div className={classes.Searchbar}>
                <input type='text' placeholder='Search City or Zip Code' onChange={props.getCityName} onKeyPress={props.enter} />
                <button onClick={props.clicked}>SEARCH</button>
            </div>
        </div>
    )
}

export default search;