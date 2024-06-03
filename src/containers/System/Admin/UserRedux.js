import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeservice } from '../../../services/userservive'
import { LANGUAGES } from '../../../utils'


class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllcodeservice('gender')
            if (res && res.errcode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
            console.log('hoidan it check res: ', res)
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        console.log('hoidan it check:', this.state)
        let genders = this.state.genderArr
        let language = this.props.language
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    learn react-redux voi hoidan IT
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'> <FormattedMessage id='manage-user.add' /></div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.email' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.password' /></lable>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.first-name' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.last-name' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.phone-number' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <lable><FormattedMessage id='manage-user.address' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.gender' /></lable>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.position' /></lable>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.role' /></lable>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.image' /></lable>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save' /></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
