import React, {Component} from 'react';
import Search from '../../components/Search/Search';
import Results from '../../components/Search/Results/Results';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Weather.css';
import Popup from '../../components/UI/Popup/Popup';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Weather extends Component {

    enterPressHandler = (event) => {
        if(event.key === 'Enter') {
            this.props.onSearch();
        }
    }
    
    render() {
        let results = null;
        if(this.props.loading) {
            results = <Spinner />
        } else if (!this.props.loading) {
            results = this.props.results.map(result => {
                return <Results 
                    key={result.dt}
                    temperature={result.main.temp}
                    humidity={result.main.humidity}
                    max={result.main.temp_max}
                    low={result.main.temp_min}
                    description={result.weather[0].main}
                    icon={result.weather[0].icon}
                    windSpeeds={result.wind.speed} />
            });
        }

        let error = null;
        if (this.props.hasError) {
            error = <h1 className={classes.Error}>{this.props.error}</h1>
        }

        let button = null;
        if(this.props.showWeather) {
            button = <button 
                className={classes.saveBtn}
                onClick={this.props.onSave}>Save</button>
        }

        return (
            <div className={classes.Weather}>
                <Popup saved={this.props.savedWeather} />
                <Search
                    clicked={this.props.onSearch}
                    selectClicked={this.selectHandler}
                    getCityName={(event) => this.props.onGetInput(event.target.value)}
                    enter={this.enterPressHandler} />
                {error}
                <h1>{this.props.city} {this.props.country}</h1>
                <div className={classes.Results}>
                    {results}
                </div>
                {button}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        input: state.weather.input,
        results: state.weather.results,
        city: state.weather.city,
        country: state.weather.country,
        loading: state.weather.loading,
        showWeather: state.weather.showWeather,
        savedWeather: state.weather.savedWeather,
        error: state.weather.error,
        hasError: state.weather.hasError
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInput: (e) => dispatch(actions.getInput(e)),
        onSearch: () => dispatch(actions.search()),
        onSave: () => dispatch(actions.save()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);