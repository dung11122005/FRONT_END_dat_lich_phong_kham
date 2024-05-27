import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllusers, createnewUserService } from "../../services/userservive"
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrusers: [],
            isOpenModaluser: false
        }
    }

    async componentDidMount() {
        await this.getAllUserformreact()
    }

    getAllUserformreact = async () => {
        let response = await getAllusers('ALL')
        if (response && response.errcode === 0) {
            this.setState({
                arrusers: response.users
            })
        }
        console.log('get user from node js: ', response)
    }
    handleaddnewuser = () => {
        this.setState({
            isOpenModaluser: true
        })
    }
    toggleusermodel = () => {
        this.setState({
            isOpenModaluser: !this.state.isOpenModaluser
        })
    }

    createnewuser = async (data) => {
        try {
            let response = await createnewUserService(data)
            if (response && response.errcode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUserformreact();
                this.setState({
                    isOpenModaluser: false
                })
            }
            console.log('check response create new user: ', response)
        } catch (e) {
            console.log(e)
        }
        console.log('data', data)
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
                <ModalUser
                    isOpen={this.state.isOpenModaluser}
                    togglefromperent={this.toggleusermodel}
                    createnewuser={this.createnewuser}
                />
                <div className='title text-center'>
                    Manege users with Dung
                </div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleaddnewuser()}
                    ><i className="fas fa-plus"></i> add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrusers && arrusers.map((item, index) => {
                                //console.log('eric check map', item, index)
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
                        </tbody>
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
