import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllusers } from "../../services/userservive"
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        let response = await getAllusers('ALL')
        if (response && response.errcode === 0) {
            this.setState({
                arrusers: response.users
            })
        }
        console.log('get user from node js: ', response)
    }

    /**  life cycle
     * run component
     * 1 run construct -> init state
     * 2 Did mount (set state)
     * 3 render
     * 
    */

    render() {
        console.log('check render', this.state)
        let arrusers = this.state.arrusers
        return (
            <div className="users-container">
                <div className='title text-center'>
                    Manege users with Dung
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrusers && arrusers.map((item, index) => {
                            console.log('eric check map', item, index)
                            return (<tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                    <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>)
                        })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
