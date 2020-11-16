import React, { PureComponent } from "react";

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { onClick_CropAvatar } from 'handleEvents/newUserHandleEvents';
import CropAvatarLayout from '../../components/layout/cropAvatarLayout';

class CropAvatarModal extends PureComponent {

    constructor(props) {

        super(props);   

        this.state = {
            modal_id : "cropModal"           
        }      

    }

    componentDidMount() {}
    
    render() {  

        const events = {

            handleCropAvatar : onClick_CropAvatar

        };
    
        return (

            <div data-popbox-id={this.state.modal_id} 
                 className="modalCropAvatar popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    <div className="text">

                        <CropAvatarLayout modal_id = {this.state.modal_id} 
                                          chooseText = {this.props.chooseText}
                                          closeText = {this.props.closeText} 
                                          events = {events}
                                          />

                    </div>                    

                </div>

            </div>            
              
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CropAvatarModal);