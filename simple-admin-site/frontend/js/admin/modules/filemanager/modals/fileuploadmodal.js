import React from 'react';

import {closePopboxModal} from 'utils/modalUtils';
 
class FileUploadModal extends React.Component {
    constructor(props) {

        super(props);      

        this.state = {
            modal_id : 'FileUploadModal'           
        };     

    }

    render() {         

        return (            
        
            <div data-popbox-id={this.state.modal_id} className="popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>

                    <div className="text">

                        <label className="fm-upload-bg"
                                onClick={this.props.onClick_ShowModalChooseFile}>
                        </label>

                    </div>

                    <div className="footer">

                        <button className="btn btn-default"
                                onClick={() => closePopboxModal(this.state.modal_id)}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>              
           
        );
    }
}

export default FileUploadModal;