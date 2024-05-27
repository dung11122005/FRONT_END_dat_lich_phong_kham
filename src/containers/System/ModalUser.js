import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class modaluser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.togglefromperent()
    }


    handleonchangeinput = (event, id) => {
        let copystate = { ...this.state }
        //console.log('copy', copystate)
        copystate[id] = event.target.value
        this.setState({
            ...copystate
        })
    }

    checkvalidate = () => {
        let idValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address',]
        for (let i = 0; i < arrInput.length; i++) {
            //console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                alert('missing parameter ' + arrInput[i])
                idValid = false
                break
            }
        }
        return idValid
    }

    handleaddnewuser = () => {
        let isvalid = this.checkvalidate();
        if (isvalid === true) {
            this.props.createnewuser(this.state)
        }
        //console.log('data modal: ', this.state)
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <lable>Email</lable>
                            <input type='text'
                                onChange={(event) => { this.handleonchangeinput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <lable>Password</lable>
                            <input type='Password'
                                onChange={(event) => { this.handleonchangeinput(event, 'password') }}
                                value={this.state.pasword}
                            />
                        </div>
                        <div className='input-container'>
                            <lable>firstName</lable>
                            <input type='text'
                                onChange={(event) => { this.handleonchangeinput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <lable>lastName</lable>
                            <input type='text'
                                onChange={(event) => { this.handleonchangeinput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <lable>address</lable>
                            <input type='text'
                                onChange={(event) => { this.handleonchangeinput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => { this.handleaddnewuser() }}>
                        Add new
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(modaluser);





