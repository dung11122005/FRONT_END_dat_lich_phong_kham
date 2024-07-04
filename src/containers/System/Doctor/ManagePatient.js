import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'


class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currenDate: new Date()
        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }


    handleOnchangeDatePicker = (date) => {
        this.setState({
            currenDate: date[0]
        })
        //console.log('hoi dan it check state:', date)
    }

    render() {

        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className='form-control'
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currenDate}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table class="styled-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dom</td>
                                    <td>6000</td>
                                </tr>
                                <tr class="active-row">
                                    <td>Melissa</td>
                                    <td>5150</td>
                                </tr>
                            </tbody>
                        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
