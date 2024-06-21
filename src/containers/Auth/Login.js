import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleloginapi } from '../../services/userservive'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isshowpassword: false,
            errmessage: ''
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
    handlelogin = async () => {
        //console.log('all user: ', this.state)
        this.setState({
            errmessage: ''
        })
        try {
            let data = await handleloginapi(this.state.username, this.state.password)
            if (data && data.errcode !== 0) {
                this.setState({
                    errmessage: data.message
                })
            }
            if (data && data.errcode === 0) {
                console.log('login sucsess')
                console.log(data)
                //const { userloginsuccess } = this.props;
                this.props.userloginsuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errmessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleshowhidepassword = () => {
        this.setState({
            isshowpassword: !this.state.isshowpassword
        })
    }


    handleKeyDown = (event) => {
        console.log('hoi dan it channel check keydown', event)
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handlelogin()
        }
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
                                <input
                                    type={this.state.isshowpassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    onChange={(event) => { this.handleonchagepassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleshowhidepassword() }}>
                                    <i className={this.state.isshowpassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errmessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handlelogin() }}>Login</button>
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
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userloginsuccess: (userInfo) => dispatch(actions.userloginsuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);