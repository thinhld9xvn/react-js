import React, { Component } from 'react';    

import ChangeUserPasswordLayout from "../../components/layout/changeUserPasswordLayout";

import {onSubmit_handleUserPasswordForm} from 'handleEvents/usersListHandleEvents';

import {closePopboxModal} from 'utils/modalUtils';

class ChangePasswordModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : 'changePasswordModal'
        }

    }

    componentDidMount() {}

    render() {      

        const events = {

            handleSubmitForm : onSubmit_handleUserPasswordForm
        };
      
        return (
            <div data-popbox-id={this.state.modal_id} 
                className="modalChangeUserPassword popbox"
                style={{ zoom : this.props.zoom }}>

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    
                    <div className="text">

                        <ChangeUserPasswordLayout events = {events} />

                    </div>

                    <div className="footer">                       

                        <button className="btn btn-default"
                                onClick={() => closePopboxModal(this.state.modal_id)}>
                                {this.props.closeText}
                        </button>

                    </div>
                
                </div>
            
            </div>
            
        );
    }

}

export default ChangePasswordModal;