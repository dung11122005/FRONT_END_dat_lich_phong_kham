import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isshowpassword: false
        }
    }
    handleonchageusername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleonchagepassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    hanldelogin = () => {
        console.log('all user: ', this.state)
    }
    handleshowhidepassword = () => {
        this.setState({
            isshowpassword: !this.state.isshowpassword
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => { this.handleonchageusername(event) }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isshowpassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    onChange={(event) => { this.handleonchagepassword(event) }}
                                />
                                <span onClick={() => { this.handleshowhidepassword() }}>
                                    <i class={this.state.isshowpassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.hanldelogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className=''>Or login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
