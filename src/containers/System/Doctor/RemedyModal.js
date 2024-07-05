import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import Lightbox from 'react-image-lightbox';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: '',
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }


    openPreviewImage = () => {
        if (!this.state.previewImgURL) return
        this.setState({
            isOpen: true
        })
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
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
                imgBase64: base64
            })
        }
        //console.log('hoidan it check file 0: ', objectUrl)
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
        //console.log('hoi dan it check state:', this.state)
    }

    render() {
        let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props

        return (

            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
                    <button type="button" className="close" aria-label="Close"
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden='true'>
                            x
                        </span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleonChangeImage(event)}
                            />
                            <div className='preview-image' type='text'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                        </div>
                    </div>
                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
