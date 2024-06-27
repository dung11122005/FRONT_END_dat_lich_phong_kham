import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';
import ProFileDoctor from '../ProFileDoctor';
import { isEmpty } from 'lodash';

class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }




    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props
        let doctorId = dataTime && !isEmpty(dataTime) ? dataTime.doctorId : ''
        console.log('data props from modal:', this.props)
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right'
                            onClick={closeBookingClose}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProFileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label >Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label >Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label >Địa chỉ email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label >Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label >Lí do khám</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label >Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label >Giới tính</label>
                                <input className='form-control' />
                            </div>
                        </div>

                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                        <button className='btn-booking-cancel'>Hủy bỏ</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
