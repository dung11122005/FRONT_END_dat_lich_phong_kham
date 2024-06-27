import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userservive'
import './ProFileDoctor.scss'
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';

class ProFileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id)
            //console.log('res', res)
            if (res && res.errcode === 0) {
                result = res.data
            }
        }
        //console.log('result', result)
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {

        }

    }




    render() {
        let { language } = this.props
        let { dataProfile } = this.state
        let nameVi = ''
        let nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`
        }
        console.log('hoi dan it channel check state:', this.state)

        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className='content-rigth'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                && <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                        <NumericFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypedata.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                        <NumericFormat
                            className='currency'
                            value={dataProfile.Doctor_Infor.priceTypedata.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProFileDoctor);
