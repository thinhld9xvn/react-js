import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';

import { OnClick_handleComponentUI, OnClick_closeModal } from 'handleEvents/CImageEvents';

import ImageComponent from 'components/ImageComponent';
import {MODALIDS, COMPONENTREFS} from 'constants/constants';

class NewImageModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : MODALIDS.NEW_IMAGE_MODAL_ID,
            instName : COMPONENTREFS.NEW_IMAGE_COMPONENT_REF
        }

    }  

    render() {

        return (

            <div data-popbox-id={this.state.modal_id} 
                 className="popbox componentModal">

                <div className="popbox_container">

                    <div className="heading">
                        {this.props.heading}
                    </div>

                    <div className="text">

                        <ImageComponent instName={this.state.instName} />

                    </div>

                    <div className="footer">

                        <PrimaryButton
                            text={this.props.chooseText}
                            onClick={OnClick_handleComponentUI.bind(this)} />

                        <DefaultButton 
                            text={this.props.closeText}
                            onClick={OnClick_closeModal.bind(this)}
                            checked={true} />
                    </div>

                </div>

            </div>
        );

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewImageModal);