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
            allDays: []
        }
    }

    async componentDidMount() {
        let { language } = this.props
        console.log('moment vi:', moment(new Date()).format('dddd - DD/MM'))
        console.log('moment en:', moment(new Date()).locale('en').format('ddd - DD/MM'))

        this.setArrdays(language)
        // console.log('arrDate:', allDays)

    }

    setArrdays = async (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
            console.log('check res schedule from react: ', res)
        }
        //console.log('event onchange date value:', event.target.value)
    }

    render() {
        let { allDays } = this.state

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
