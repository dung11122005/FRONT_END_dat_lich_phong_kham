import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from "react-toastify";
import { isEmpty } from 'lodash';




class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currenDate: new Date(),
            rangeTime: []
        }
    }



    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            //console.log('hoi dan it channel check range time:', this.props.allScheduleTime)
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            //console.log('hoi dan it channel check range time data:', data)
            this.setState({
                rangeTime: data
            })
        }
    }


    buildDataInputSelect = (inputdata) => {
        let result = []
        //console.log('check input data:', inputdata)
        let { language } = this.props
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelEn : labelVi
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0]
        })
        //console.log('hoi dan it check state:', date)
    }


    handleClickBtnTime = (time) => {
        //console.log('hoi dan it check item click:', time)
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
            //console.log('hoi dan it channel', rangeTime)
        }
    }

    handleSaveSchedule = () => {
        let { rangeTime, currenDate, selectedDoctor } = this.state
        let result = []
        if (!currenDate) {
            toast.error("invalid date!");
            return
        }
        if (selectedDoctor && isEmpty(selectedDoctor)) {
            toast.error("invalid selected doctor!");
            return
        }
        let formatDate = moment(currenDate).format('DD/MM/YYYY')
        console.log('hoi dan it check state currenDate:', moment(currenDate).format(dateFormat.SEND_TO_SERVER))
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    //console.log('check schedule:', schedule, index)
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatDate
                    object.time = schedule.keyMap
                    result.push(object)
                })

            } else {
                toast.error("invalid selected time!");
                return
            }
            //console.log('hoi dan it channel : selectedTime', selectedTime)
        }
        console.log(this.state)
        console.log('hoi dan it channel check result:', result)
    }


    render() {
        //console.log('hoi dan it check state:', this.state)
        //console.log('hoi dan it check props:', this.props)

        let { rangeTime } = this.state
        let { language } = this.props
        //console.log('hoi dan it check state', rangeTime)
        return (
            <div className='menage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                //value={this.state.currenDate}
                                value={this.state.currenDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
