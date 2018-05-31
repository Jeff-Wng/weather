import React, {Component} from 'react';
import classes from './backdrop.css';
import Notification from '../Notification/notification';
import {connect} from 'react-redux';
import * as actions from '../../../store/Actions/index';

class Backdrop extends Component {
    render() {
        return (
            <div style={!this.props.showNotification ? {display: 'none'} : null}>
                <div className={classes.Backdrop} onClick={() => this.props.onShowNotification(false)}></div>
                <Notification />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showNotification: state.weather.showNotification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowNotification: (value) => dispatch(actions.showNotification(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);