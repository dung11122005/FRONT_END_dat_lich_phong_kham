import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userservive'
import { FormattedMessage } from 'react-intl';


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
        //console.log('moment vi:', moment(new Date()).format('dddd - DD/MM'))
        //console.log('moment en:', moment(new Date()).locale('en').format('ddd - DD/MM'))
        let allDays = this.getArrdays(language)
        this.setState({
            allDays: allDays,
        })
        console.log('allDays:', allDays)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrdays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }


            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        //console.log('allDays1:', allDays)
        return allDays
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrdays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getArrdays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
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

            //console.log('check res schedule from react: ', res)
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
                        <i class="fas fa-calendar-alt">
                            <span>
                                <FormattedMessage id='patient.detail-dcotor.schedule' />
                            </span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvalableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}>
                                                {timeDisplay}
                                            </button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id='patient.detail-dcotor.choose' /> <i class="far fa-hand-point-up"></i> <FormattedMessage id='patient.detail-dcotor.book-free' />
                                    </span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'><FormattedMessage id='patient.detail-dcotor.no-schedule' /></div>
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
