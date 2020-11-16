import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {onChange_handleProfileText,
        onChange_handleProfileNumber,
        onClick_showChooseAvatarDialog,
        onClick_ProfileEditMode,
        onClick_CloseEditUserModal,
        onClick_ProfileEditSave,
        onClick_showChangePassModal} from 'handleEvents/usersListHandleEvents';

import ProfileLayout from "../components/layout/profileLayout";

class EditUserModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            modal_id : "editUserModal"

        };

    }

    render() {

        //const { editUserModalProps } = this.props;

        const events = {

            showChooseAvatarModal : onClick_showChooseAvatarDialog,
            editProfile : onClick_ProfileEditMode,
            saveProfile : onClick_ProfileEditSave,
            handleTextChanged : onChange_handleProfileText,
            handleNumberChanged : onChange_handleProfileNumber,
            handleShowChangePassModal : onClick_showChangePassModal

        };

        return (

            <div data-popbox-id={this.state.modal_id}
                 className="modalEditUser popbox"
                 style={{ zoom : this.props.zoom }}>

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    <div className="text">

                        <ProfileLayout
                            formid = "frmEditUserForm"
                            events = {events}
                            allowedChangePassword = {true} />

                    </div>

                    <div className="footer">

                        <button className="btn btn-default"
                                onClick={onClick_CloseEditUserModal.bind(this)}
                                data-popbox-close={this.state.modal_id}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);