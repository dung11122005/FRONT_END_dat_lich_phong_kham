import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userservive'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currenDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowloading: false
        }
    }

    async componentDidMount() {
        let { user } = this.props
        let { currenDate } = this.state
        //console.log('hoi dan it check state:', this.state)
        let formatedDate = new Date(currenDate).getTime()
        //console.log('formatedDate', formatedDate)
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errcode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
        this.getDataPatient()
        //console.log('hoi dan it check res:', res)
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currenDate } = this.state
        let formatedDate = new Date(currenDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.errcode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    handleOnchangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }


    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientidData.email,
            timeType: item.timeType,
            patientidName: item.patientidData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        console.log('hoi dan it check data:', data)
        //console.log('hoi dan it check click item:', item)
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        this.setState({
            isShowloading: true
        })
        let { dataModal } = this.state
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timetype: dataModal.timeType,
            language: this.props.language
        })
        if (res && res.errcode === 0) {
            toast.success('send remedy success!')
            this.closeRemedyModal()
            this.setState({
                isShowloading: false
            })
            await this.getDataPatient()
        } else {
            toast.error('something wrongs...')
            console.log('data from modal res:', res)
        }
    }


    render() {
        //console.log('hoi dan it check props:', this.props)
        console.log('hoi dan it check state:', this.state)
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <LoadingOverlay
                active={this.state.isShowloading}
                spinner
                text='Loading ...'
            >
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currenDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientidData.genderData.valueVi : item.patientidData.genderData.valueEn
                                            return (
                                                <tr className="active-row" key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientidData.firstName}</td>
                                                    <td>{item.patientidData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >Xác nhận</button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', fontWeight: '600' }}>NO DATA</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
