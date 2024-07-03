import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor'
import ProFileDoctor from '../Doctor/ProFileDoctor';
import { getAllDetailSpecialtyById, getAllcodeservice } from '../../../services/userservive'
import { isEmpty } from 'lodash';
import { LANGUAGES } from '../../../utils';



class DetailSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [30, 31, 32],
            dataDitailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllcodeservice('PROVINCE')

            console.log('hoi dan it check res:', res)
            if (res && res.errcode === 0 && resProvince && resProvince.errcode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    dataDitailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : ''
                })
            }
            //console.log('hoi dan IT channel res:', res)
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value
            this.setState({
                currentDoctorId: id
            })

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            })



            console.log('hoi dan it check res:', res)
            if (res && res.errcode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !isEmpty(res.data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDitailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }
        console.log('hoi dan it check onchange event:', event.target.value)
    }

    render() {
        let { arrDoctorId, dataDitailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDitailSpecialty && !isEmpty(dataDitailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDitailSpecialty.descriptionHTML }} ></div>
                        }
                    </div>
                    <div className='search-sp-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div >
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <div>
                                                <ProFileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
                                                //dataTime={dataTime}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorIdFromParent={item}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
