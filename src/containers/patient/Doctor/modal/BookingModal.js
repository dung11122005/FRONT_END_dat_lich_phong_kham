import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import { classNames } from 'react-select/dist/index-ea9e225d.cjs.prod';
import ProFileDoctor from '../ProFileDoctor';
import { isEmpty } from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userservive'
import { toast } from "react-toastify";
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
            isShowloading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let opject = {}
                opject.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                opject.value = item.keyMap
                result.push(opject)
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                //console.log('hoi dan it check dataTime:', this.props.dataTime)
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value
        let statecopy = { ...this.state }
        statecopy[id] = valueInput
        this.setState({
            ...statecopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })

    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let data = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - MM/DD/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return `${time} - ${data}`
        } else {
            return ''
        }
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                :
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

            return name
        } else {
            return ''
        }
    }

    handleConfirmBooking = async () => {
        this.setState({
            isShowloading: true
        })
        //let date = new Date(this.props.dataTime.date).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        //console.log('check datatime:', this.props.dataTime)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            selectedGender: this.state.selectedGender.value,
            genders: this.state.genders,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errcode === 0) {
            this.props.closeBookingClose()
            this.setState({
                isShowloading: false
            })
            toast.success('booking a new appointment seccess!')
        } else {
            toast.error('booking a new appointment error!')
        }
        console.log('hoi dan it check confirm state:', this.state)
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props
        let doctorId = dataTime && !isEmpty(dataTime) ? dataTime.doctorId : ''
        //console.log('hoi dan it check state:', this.state)
        //console.log('data props from modal:', this.props)
        return (
            <LoadingOverlay
                active={this.state.isShowloading}
                spinner
                text='Loading ...'
            >
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='booking-modal.title' /></span>
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
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.fullName' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.phoneNumber' /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.email' /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.address' /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label ><FormattedMessage id='booking-modal.reason' /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.birthday' /></label>
                                    <DatePicker
                                        className='form-control'
                                        onChange={this.handleOnchangeDatePicker}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label ><FormattedMessage id='booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            ><FormattedMessage id='booking-modal.confirm' /></button>
                            <button className='btn-booking-cancel'
                                onClick={closeBookingClose}
                            ><FormattedMessage id='booking-modal.btncancel' /></button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
