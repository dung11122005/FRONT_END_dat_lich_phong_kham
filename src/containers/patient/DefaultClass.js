import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';



class DefaultClass extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }




    render() {
        let { language } = this.props
        let { isShowDetailInfor, extraInfor } = this.state
        console.log('hoi dan it check state:', this.state)
        return (
            <div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
