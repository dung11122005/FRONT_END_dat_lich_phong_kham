import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changelanguaheApp } from "../../store/actions"



class HomeHeader extends Component {

    changelanguahe = (language) => {
        this.props.changelanguaheAppredux(language)
    }


    render() {

        let language = this.props.language
        //console.log('check language', language)
        console.log('check userinfo: ', this.props.userInfo)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div ><b><FormattedMessage id='homehader.speciality' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homehader.SearchDoctors' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homehader.Health_facilities' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homehader.Choose_Hospital' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homehader.Doctor' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homehader.Good_Doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homehader.Examination_Package' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homehader.health_check' /></div>
                            </div>
                        </div>
                        <div className='rigth-content'>
                            <div className='support'><i className="far fa-question-circle"></i> <FormattedMessage id='homehader.Support' /> </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => { this.changelanguahe(LANGUAGES.VI) }}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changelanguahe(LANGUAGES.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-bander'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id='homehader.Medical_Background' /></div>
                        <div className='title2'><FormattedMessage id='homehader.Health_Care' /></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm Chuyên Khoa Khám Bệnh' /></div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.Specialist_Examination' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.remote_examination' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-procedures"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.General_Examination' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-vial"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.Medical_Tests' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.Mental_health' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-briefcase-medical"></i></div>
                                <div className='text-child'><FormattedMessage id='homehader.Dental Examination' /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changelanguaheAppredux: (language) => dispatch(changelanguaheApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
