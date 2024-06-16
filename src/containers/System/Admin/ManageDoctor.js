import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import "./ManageDoctor.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);





class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleSaveContentMarkdown = () => {
        console.log('hoi dan it check state: ', this.state)
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        //console.log('handleEditorChange', html, text);
    }


    handleChange = selectedOption => {
        this.setState({ selectedOption })
    };


    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <div>Tọa thêm thông tin bác sĩ</div>
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Thông tin giới thiệu:</label>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            >
                                sjsdfjsklkasklaskldaklalk
                            </textarea>
                        </div>

                    </div>
                    <div className='manage-doctor-editer'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className='save-content-doctor'>
                        Lưu thông tin
                    </button>
                </div>


            </React.Fragment>
        );
    }
}



const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};



const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);