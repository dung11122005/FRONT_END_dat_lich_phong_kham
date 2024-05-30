import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';


import Slider from "react-slick";
// Import css files





class HomeFooter extends Component {

    render() {
        return (

            <div className='home-footer'>
                <p>&copy; 2024 HOANG TAN DUNG, More information, please visit my youtobe channel.
                    <a target='_blank' href='https://www.youtube.com/channel/UC0nXI6o5oM9yFGLd_JP_r9A'>
                        &#8594; Click here &#8592;
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
