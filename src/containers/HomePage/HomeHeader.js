import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.png'

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img src={logo} />
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên Khoa</b></div>
                                <div className='subs-title'>Tìm Bác Sĩ theo Chuyên Khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ Sở Y tế</b></div>
                                <div className='subs-title'>Chọn Bệnh Viện Phòng Khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác Sĩ</b></div>
                                <div className='subs-title'>Chọn Bác Sĩ Giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói Khám</b></div>
                                <div className='subs-title'>Khám Sức Khỏe Tổng Quát</div>
                            </div>
                        </div>
                        <div className='rigth-content'>
                            <div className='support'><i className="far fa-question-circle"> Hỗ Trợ </i></div>
                            <div className='flag'> VN </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-bander'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm Chuyên Khoa Khám Bệnh' /></div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Khám Chuyên Khoa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'>Khám Từ xa</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-procedures"></i></div>
                                <div className='text-child'>Khám Tổng Quát</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-vial"></i></div>
                                <div className='text-child'>Xét Nghiệm Y học</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'>Sức Khỏe Tinh Thần</div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-briefcase-medical"></i></div>
                                <div className='text-child'>Khám Nha Khoa</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
