import React, {Component} from 'react';
import classes from './Saved.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import SavedResults from '../../components/Search/SavedResults/SavedResults';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Saved extends Component {

    componentDidMount() {
        this.props.resetState();
        this.props.fetchSaves();
    }        

    render() {

        let tabs = null;
        if(this.props.loading) {
            tabs = <Spinner />
        } else if (!this.props.loading) {
            tabs = this.props.city.map(city => {
                return <SavedResults 
                    key={Math.random(1000)}
                    city={city}
                    keys={this.props.keys} />
            })
        }

        return (
            <div className={classes.Saved}>
                {tabs}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.saved.loading,
        city: state.saved.city,
        keys: state.saved.keys
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        fetchSaves: () => dispatch(actions.fetchSaves())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Saved);