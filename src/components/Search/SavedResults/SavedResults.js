import React, {Component} from 'react';
import classes from './SavedResults.css'
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import Results from '../Results/Results';
import Popup from '../../UI/Popup/Popup';

const cityUrl =  'https://api.openweathermap.org/data/2.5/forecast?q=';
const apiKey = '&mode=json&cnt=5&units=imperial&APPID='+process.env.REACT_APP_API_KEY;

class SavedResults extends Component {
    state = {
        results: [],
        city: [],
        country: [],
        loading: null,
        showWeather: false,
        deleteWeather: false
    }

    getWeatherHandler = () => {
        if(!this.state.showWeather) {
            this.setState({loading: true});
            axios.get(cityUrl + this.props.city + apiKey)
                .then(response => {
                    this.setState({
                        results: response.data.list,
                        city: response.data.city.name,
                        country: response.data.city.country,
                        loading: false,
                        showWeather: true,
                        deleteWeather: false
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (this.state.showWeather) {
            this.setState({
                results: [],
                showWeather: false
            });
        }
    }

    render() {
        let results = null;
        if(this.state.loading) {
            results = <Spinner />
        } else if (!this.state.loading) {
            results = this.state.results.map(result => {
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
    

        return (
            <div className={classes.SavedResults}>
                <Popup delete={this.state.deleteWeather}/>
                <div className={classes.Header}>
                    <h1>{this.props.city}</h1>
                    <div className={!this.state.showWeather ? classes.arrowDown : classes.arrowUp} onClick={this.getWeatherHandler}></div>
                </div>
                <div className={classes.Info}>
                    {results}
                </div>
            </div>
        )
    }
}

export default SavedResults;