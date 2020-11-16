import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { onClick_closeEditPostTypeModal, onSubmit_performEditPostType } from 'handleEvents/postTypesHandleEvents';

import PostTypeModalLayout from '../layout/postTypeModalLayout';

class EditPostTypeModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            modal_id: 'editPostTypeModal'            

        }

    }

    componentDidMount() {}

    render() {       

        return (
            <div data-popbox-id={this.state.modal_id}
                className="modalConfiguration editPostTypeModal popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>

                    <div className="text">

                        <PostTypeModalLayout formid="frmEditPostType" />

                    </div>

                    <div className="footer">

                        <button className="btn btn-primary"
                            onClick={onSubmit_performEditPostType.bind(this)}>{this.props.chooseText}</button>

                        <button className="btn btn-default"
                            onClick={onClick_closeEditPostTypeModal.bind(this)}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostTypeModal);