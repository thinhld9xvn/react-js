import React, { Component } from 'react';

import {onClick_CloseEditPostModal} from 'handleEvents/postTypesHandleEvents';

import PostLayout from '../layout/postLayout';

class EditPostModal  extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : 'editPostModal'
        }

    }

    componentDidMount() {}

    render() {

        return (
            <div data-popbox-id={this.state.modal_id}
                className="popbox editPostModal">

                <div className="popbox_container" style={{ maxWidth : '100%' }}>

                    <div className="heading">{this.props.heading}</div>

                    <div className="text">

                        <PostLayout name = "editPostLayout" />

                    </div>

                    <div className="footer">

                        <button className="btn btn-default"
                                onClick={onClick_CloseEditPostModal.bind(this)}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>

        );
    }

}

export default EditPostModal;