import React, { Component } from 'react';

import PostTypeModalLayout from '../layout/postTypeModalLayout';

import {
    onClick_closeNewPostTypeModal,
    onSubmit_performCreateNewPostType
} from 'handleEvents/postTypesHandleEvents';

class NewPostTypeModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            modal_id: "newPostTypeModal",
            is_ajax_saving: false

        };

    }

    render() {

        return (            

            <div data-popbox-id={this.state.modal_id}
                className="modalConfiguration modalNewPostType popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    <div className={"text ".concat(this.state.is_ajax_saving ? 'disabled' : '')}>

                        <PostTypeModalLayout  formid = "frmNewPostType" />

                    </div>

                    <div className={"footer ".concat(this.state.is_ajax_saving ? 'disabled' : '')}>

                        <button className="btn btn-primary"
                            onClick={onSubmit_performCreateNewPostType.bind(this)}>

                            {this.props.chooseText}

                        </button>

                        <button className="btn btn-default"
                            onClick={onClick_closeNewPostTypeModal.bind(this)}>

                            {this.props.closeText}

                        </button>

                    </div>

                </div>

            </div>

        );

    }
}

export default NewPostTypeModal;