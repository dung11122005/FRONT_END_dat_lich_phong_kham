import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllusers, createnewUserService, deleteUserService, editUserService } from "../../services/userservive"
import ModalUser from './ModalUser';
import Modaledituser from './Modaledituser';
import { emitter } from "../../utils/emitter"


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrusers: [],
            isOpenModaluser: false,
            isOpenModalEdituser: false,
            userEdit: {}
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
    toggleuserEditmodel = () => {
        this.setState({
            isOpenModalEdituser: !this.state.isOpenModalEdituser
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
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
            console.log('check response create new user: ', response)
        } catch (e) {
            console.log(e)
        }
        //console.log('data', data)
    }


    handledeleteuser = async (user) => {
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errcode === 0) {
                await this.getAllUserformreact()
            }
        } catch (e) {
            console.log(e);
        }
    }

    handlEdituser = (user) => {
        this.setState({
            isOpenModalEdituser: true,
            userEdit: user
        })
    }


    doEdituser = async (user) => {
        let res = await editUserService(user)
        try {
            if (res && res.errcode === 0) {
                this.setState({
                    isOpenModalEdituser: false
                })
                await this.getAllUserformreact()
            } else {
                alert(res.errcode)
            }
        } catch (error) {
            console.log(error)
        }
        //console.log('click save user', user)
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
                {this.state.isOpenModalEdituser &&
                    <Modaledituser
                        isOpen={this.state.isOpenModalEdituser}
                        togglefromperent={this.toggleuserEditmodel}
                        currenedituser={this.state.userEdit}
                        Edituser={this.doEdituser}
                    />
                }

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
                                        <button className='btn-edit' onClick={() => { this.handlEdituser(item) }}><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => { this.handledeleteuser(item) }}><i className="fas fa-trash"></i></button>
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
