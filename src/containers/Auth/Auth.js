import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/Actions/index';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        isSignup: true,
        name: '',
        email: '',
        password: '',
    }

    componentDidMount() {
        this.props.resetState();
    }

    signUpHandler = () => {
        this.setState({isSignup: true})
    }

    logInHandler = () => {
        this.setState({isSignup: false})
    }

    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    submitHandler = () => {
        this.props.onAuth(this.state.name, this.state.email, this.state.password, this.state.isSignup);
    }

    render() {

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let form = null;
        if(!this.props.loading) {
            form = 
            <React.Fragment> 
                <div className={classes.Buttons}>
                    <h2 onClick={this.signUpHandler}>Sign-Up</h2>
                    <h2 onClick={this.logInHandler}>Log-In</h2>
                </div>
                <div className={classes.Info}>
                    {errorMessage}
                    <h3>{this.state.isSignup ? 'Sign-Up' : 'Log-In'}</h3>
                    {this.state.isSignup ? <input type='text' placeholder='Name' name='name' onChange={this.onChangeHandler} /> : null}
                    <input type='email' placeholder='E-mail' name='email' onChange={this.onChangeHandler} />
                    <input type='password' placeholder="Password" name='password' onChange={this.onChangeHandler} />
                    <button onClick={this.submitHandler}>Submit</button>
                </div>
            </React.Fragment>
        } else if (this.props.loading) {
            form = <Spinner />
        }
    
        let redirect = null;
        if(this.props.loggedIn) {
            redirect = <Redirect to='/' />
        }

        return (
            <div className={classes.Auth}>
                {redirect}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        onAuth: (displayName, email, password, isSignup) => dispatch(actions.auth(displayName, email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);