import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userservive'
import { withRouter } from 'react-router';
// Import css files



class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('hoi dan it check res:', res)
        if (res && res.errcode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    componentDidUpdate() {

    }



    handleViewDetailSpecialty = (item) => {
        //console.log('hoidan it channel view infor:', item)
        //console.log('doctorid', doctor.id)
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }

    }
    render() {
        let { dataSpecialty } = this.state
        return (

            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.Popular-specialtiesr' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.more-infor' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='outter-bg'>
                                                <div className='bg-image section-specialty'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                ></div>
                                            </div>
                                            <div className='position text-center specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
