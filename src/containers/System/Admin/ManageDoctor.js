import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import "./ManageDoctor.scss"
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
import { getDetailInforDoctor } from '../../../services/userservive'
const mdParser = new MarkdownIt(/* Markdown-it options */);




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to infor doctor table
            listPrice: [],
            listProvince: [],
            listPayment: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllrequiredDoctorInfor()
    }

    buildDataInputSelect = (inputdata, type) => {
        let result = []
        //console.log('check input data:', inputdata)
        let { language } = this.props
        if (inputdata && inputdata.length > 0) {
            if (type === 'USERS') {
                inputdata.map((item, index) => {
                    let object = {}
                    let labelEn = `${item.lastName} ${item.firstName}`
                    let labelVi = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    result.push(object)
                })
            } else if (type === 'PRICE') {
                inputdata.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
                //console.log('hoi dan it check input price:', inputdata)
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputdata.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
                //console.log('hoi dan it check input price:', inputdata)
            }
            if (type === 'SPECIALTY') {
                inputdata.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputdata.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allrequiredDoctorInfor !== this.props.allrequiredDoctorInfor) {
            let { resPrice, resProvince, resPayment, resSpecialty, resClinic } = this.props.allrequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectedClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            //console.log('data new:', dataSelectedPrice, dataSelectedProvince, dataSelectedPayment)
            this.setState({
                listPrice: dataSelectedPrice,
                listProvince: dataSelectedProvince,
                listPayment: dataSelectedPayment,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectedClinic
            })
            //console.log('hoi dan it get data form redux:', this.props.allrequiredDoctorInfor)
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPrice, resProvince, resPayment, resSpecialty, resClinic } = this.props.allrequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectedClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectedPrice,
                listProvince: dataSelectedProvince,
                listPayment: dataSelectedPayment,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectedClinic
            })
        }
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
        //console.log('hoi dan it check state: ', this.state)
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        //console.log('handleEditorChange', html, text);
    }


    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state
        //console.log('selectedOption.value', selectedOption.value)
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errcode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                specialtyId = '', selectedSpecialty = '', selectedClinic = ''
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note
                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId
                specialtyId = res.data.Doctor_Infor.specialtyId
                clinicId = res.data.Doctor_Infor.clinicId
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
                //console.log('hoi dan it check find arr:',selectedPayment, selectedPrice, selectedProvince, listPayment)
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
        console.log('hoi dan it channel ', res)
    };


    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let statename = name.name
        let statecopy = { ...this.state }
        //console.log("statecopy", statecopy)
        statecopy[statename] = selectedOption
        this.setState({
            ...statecopy
        })
        //console.log('hoi dan it channel check new select on change:', selectedOption, statename)
    }

    handleOnChangeText = (event, id) => {
        let statecopy = { ...this.state }
        statecopy[id] = event.target.value
        this.setState({
            ...statecopy
        })
    }


    render() {
        let { hasOldData, listSpecialty } = this.state
        //console.log('hoi dan it channel check state:', this.state)
        return (

            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <div><FormattedMessage id='admin.manage-doctor.title' /></div>
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                            name={'selectedProvince'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.nameclinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.addressclinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.specialty' /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                            name={'selectedSpecialty'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.clinic' /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id='admin.manage-doctor.clinic' />}
                            name={'selectedClinic'}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editer'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ?
                        <span><FormattedMessage id='admin.manage-doctor.save' /></span>
                        :
                        <span><FormattedMessage id='admin.manage-doctor.add' /></span>
                    }
                </button>
            </div>

        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allrequiredDoctorInfor: state.admin.allrequiredDoctorInfor
    };
};



const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllrequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);