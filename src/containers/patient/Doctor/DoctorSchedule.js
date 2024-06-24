import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userservive'



class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalableTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props
        console.log('moment vi:', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en:', moment(new Date()).locale('en').format('ddd - DD/MM'))

        this.setArrdays(language)
        // console.log('arrDate:', allDays)

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrdays = async (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        let res = await getScheduleDoctorByDate(32, 1719162000000)
        console.log('check res from schedule react:', res)
        this.setState({
            allDays: allDays
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrdays(this.props.language)
        }
    }


    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)

            if (res && res.errcode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }

            console.log('check res schedule from react: ', res)
        }
        //console.log('event onchange date value:', event.target.value)
    }

    render() {
        let { allDays, allAvalableTime } = this.state
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calandar'>
                        <i class="fas fa-calendar-alt"><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            allAvalableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })
                            :
                            <div>Bác sĩ không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
