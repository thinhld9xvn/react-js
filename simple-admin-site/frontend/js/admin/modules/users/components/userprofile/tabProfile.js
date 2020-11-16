import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {onClick_ProfileEditMode,          
        onClick_ProfileEditSave,
        onChange_handleProfileNumber,
        onChange_handleProfileText,       
        onClick_showChooseAvatarDialog} from 'handleEvents/userProfileHandleEvents';

import ProfileLayout from '../layout/profileLayout';

class TabProfile extends Component {

    constructor(props) {

        super(props);        

    }     

    componentDidMount() {        

        const { userProfile } = this.props;

        this.props.updateUser_Profile( userProfile );

    }  

    render() {

        const events = {

            showChooseAvatarModal : onClick_showChooseAvatarDialog,            
            handleTextChanged : onChange_handleProfileText,
            handleNumberChanged : onChange_handleProfileNumber,
            editProfile : onClick_ProfileEditMode,
            saveProfile : onClick_ProfileEditSave
        };

        return (            

            <ProfileLayout formid = "frmUserProfile"                           
                           events = {events} />          
        );        

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TabProfile);