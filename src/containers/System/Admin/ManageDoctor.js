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
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
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
            let { resPrice, resProvince, resPayment, } = this.props.allrequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            //console.log('data new:', dataSelectedPrice, dataSelectedProvince, dataSelectedPayment)
            this.setState({
                listPrice: dataSelectedPrice,
                listProvince: dataSelectedProvince,
                listPayment: dataSelectedPayment,
            })
            //console.log('hoi dan it get data form redux:', this.props.allrequiredDoctorInfor)
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPrice, resProvince, resPayment, } = this.props.allrequiredDoctorInfor
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectedPrice,
                listProvince: dataSelectedProvince,
                listPayment: dataSelectedPayment,
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

        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errcode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        //console.log('hoi dan it channel ', res)
    };


    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let statename = name.name
        let statecopy = { ...this.state }
        //console.log("statecopy", statecopy)
        statecopy[statename] = selectedOption
        this.setState({
            ...statecopy
        })
        console.log('hoi dan it channel check new select on change:', selectedOption, statename)
    }

    handleOnChangeText = (event, id) => {
        let statecopy = { ...this.state }
        statecopy[id] = event.target.value
        this.setState({
            ...statecopy
        })
    }


    render() {
        //console.log('hoi dan it channer:', this.state)
        let { hasOldData } = this.state
        console.log('hoi dan it this.state:', this.state)
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