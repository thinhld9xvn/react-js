import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import AvatarsListLayout from '../../components/layout/avatarsListLayout';

import {onClick_closeChooseAvatarDialog} from 'handleEvents/usersListHandleEvents';
import {onClick_setUserAvatar, onClick_chooseAvatarInModal} from 'handleEvents/newUserHandleEvents'; 

import {onClick_uploadOtherAvatar} from 'handleEvents/userProfileHandleEvents';        

class AvatarsListModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : 'chooseAvatarModal'
        }

    }

    componentDidMount() {}

    render() {      

        const events = {

            handleUploadOtherAvatar : onClick_uploadOtherAvatar,
            handleChooseAvatar : onClick_chooseAvatarInModal

        };
      
        return (
            <div data-popbox-id={this.state.modal_id} 
                className="modalChooseAvatar popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    
                    <div className={"text ".concat(this.props.userAvatarIsAjaxLoading ? "disabled" : "")}>

                        <AvatarsListLayout events = {events} />

                    </div>

                    <div className={"footer ".concat(this.props.userAvatarIsAjaxLoading ? "disabled" : "")}>

                        <button className="btn btn-primary"
                                onClick={onClick_setUserAvatar.bind(this)}>
                                {this.props.chooseText}
                        </button>

                        <button className="btn btn-default"
                                onClick={onClick_closeChooseAvatarDialog.bind(this)}>
                                {this.props.closeText}
                        </button>

                    </div>
                
                </div>
            
            </div>
            
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarsListModal);