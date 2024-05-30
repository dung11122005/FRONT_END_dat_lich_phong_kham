import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';


import Slider from "react-slick";
// Import css files





class About extends Component {

    render() {
        return (

            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền Thông Nói Gì Về Hoàng Tấn Dũng
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/dYvb8_F_oFA"
                            title="Cách lấy ảnh crush khi họ đăng ở chế độ chỉ mình tôi__HOÀNG TẤN DŨNG." frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

                        </iframe>
                    </div>
                    <div className='content-rigth'>
                        <p> Hoàng Tấn Dũng học node js và react js của hoidan IT để trở thành một kĩ sư phần mềm trong tương lai,
                            lúc mới học ở trên trường mình vẫn chưa mường tượng được một kĩ sư phần mềm là làm gì và giờ đây mình cũng vậy...
                        </p>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
