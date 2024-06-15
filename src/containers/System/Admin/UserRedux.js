import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeservice } from '../../../services/userservive'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';
import './UserRedux.scss'
import { add, flatMap } from 'lodash';


class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            useredtiId: ''
        }
    }

    async componentDidMount() {
        await this.props.getGenderStart()
        await this.props.getPositionStart()
        await this.props.getRoleStart()

        // try {
        //     let res = await getAllcodeservice('gender')
        //     if (res && res.errcode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('hoidan it check res: ', res)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        //render => didupdate
        //hiện tại (this) và quá khứ (previous)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrgenders = this.props.genderRedux
            this.setState({
                genderArr: arrgenders,
                gender: arrgenders && arrgenders.length > 0 ? arrgenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrpositions = this.props.positionRedux
            this.setState({
                positionArr: arrpositions,
                position: arrpositions && arrpositions.length > 0 ? arrpositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrroles = this.props.roleRedux
            this.setState({
                roleArr: arrroles,
                role: arrroles && arrroles.length > 0 ? arrroles[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrgenders = this.props.genderRedux
            let arrpositions = this.props.positionRedux
            let arrroles = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrgenders && arrgenders.length > 0 ? arrgenders[0].keyMap : '',
                position: arrpositions && arrpositions.length > 0 ? arrpositions[0].keyMap : '',
                role: arrroles && arrroles.length > 0 ? arrroles[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }


    handleonChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            //console.log('hoi dan it base64 image: ', base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
        //console.log('hoidan it check file 0: ', objectUrl)
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return
        this.setState({
            isOpen: true
        })
    }


    handelSaveUser = () => {
        //console.log('hoi dan it before submit check state:', this.state)
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewuser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.EditAUserRedux({
                id: this.state.useredtiId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }


    checkValidateInput = () => {
        let isValid = true
        let arrcheck = ['email',
            'password', 'firstName', 'lastName', 'phoneNumber',
            'address']

        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false
                alert('this input is required ' + arrcheck[i])
                break
            }
        }
        return isValid
    }


    onChangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value
        this.setState({
            ...copystate
        })

    }

    handleEditUserFromParent = (user) => {
        //console.log('hoidan it check handle edit user from parent: ', user)
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            useredtiId: user.id
        })
    }

    render() {
        //console.log('hoidan it check:', this.state)
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isGetGender = this.props.isLoadingGender
        let { email,
            password, firstName, lastName, phoneNumber,
            address, gender, position, role
        } = this.state
        //console.log('hoidan it check state component: ', this.state)
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    learn react-redux voi hoidan IT
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id='manage-user.add' /></div>
                            <div className='col-12'>{isGetGender === true ? 'Loading gender' : ''}</div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.email' /></lable>
                                <input className='form-control' type='text'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.password' /></lable>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.first-name' /></lable>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.last-name' /></lable>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.phone-number' /></lable>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className='col-9'>
                                <lable><FormattedMessage id='manage-user.address' /></lable>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.gender' /></lable>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.position' /></lable>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.role' /></lable>
                                <select className="form-control"
                                    value={role}
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <lable><FormattedMessage id='manage-user.image' /></lable>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleonChangeImage(event)} />
                                    <label className='lable-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image' type='text'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handelSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit' />
                                        :
                                        <FormattedMessage id='manage-user.save' />}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParentkey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewuser: (data) => dispatch(actions.createNewuser(data)),
        EditAUserRedux: (data) => dispatch(actions.EditAUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changelanguaheAppredux: (language) => dispatch(actions.changelanguaheApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
