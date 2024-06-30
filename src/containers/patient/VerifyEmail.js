import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userservive'
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'
class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errcode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errcode === 0) {
                this.setState({
                    statusVerify: true,
                    errcode: res.errcode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errcode: res && res.errcode ? res.errcode : -1
                })
            }
            //console.log('hoi dan it channel >>>:', token, doctorId)
        }

        if (this.props.match && this.props.match.params) {
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }




    render() {
        let { statusVerify, errcode } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loanding data....
                        </div>
                        :
                        <div>
                            {errcode === 0 ?
                                <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
                    }
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
