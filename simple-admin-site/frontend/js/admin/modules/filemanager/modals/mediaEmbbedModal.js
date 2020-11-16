import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";

import * as modalUtils from 'utils/modalUtils';
import * as fileUtils from 'utils/filemanager/fileUtils';

import FileManager from '../filemanager';
import { getComponentInst } from 'utils/componentUtils';
import { getURLUploadPath } from 'utils/filemanager/fileUtils';

var t = null;

class MediaEmbbedModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : 'mediaEmbbedModal'
        }

    }

    componentDidMount() {

        t = setInterval(() => {

            const modal = document.querySelector('.mediaEmbbedModal.opened.visible .popbox_container'), 
                heading =   modal ? modal.querySelector('.mediaHeading') : null,           
                footer =   modal ? modal.querySelector('.mediaFooter') : null,           
                container = modal ? modal.querySelector('.mediaBody') : null;

            if ( container ) {

                const h = window.innerHeight - heading.clientHeight - footer.clientHeight;

                if ( parseInt( container.style.getPropertyValue('height') ) !== h ) {

                    container.style.setProperty('height', h + 'px', 'important');
                    container.style.setProperty('max-height', h + 'px', 'important');

                }

            }

        }, 200);

    }

    componentWillUnmount() {

        clearInterval(t);

    }

    onClick_chooseObject(e) {

        e.preventDefault();

        const inst = getComponentInst('FileManagerRef'),
              selected_files = fileUtils.getSelectedFiles.call(inst),              
              imageLists = [];
              
        let command = 'insertInToTinyMce';

        //console.log( selected_files );

        if ( document.mediaEmbbedModalCommand ) {

            command = document.mediaEmbbedModalCommand;
        }        

        if ( command === 'insertInToTinyMce' ) {

            selected_files.forEach(img => {

                //console.log(img);

                const src = getURLUploadPath().concat( img.thumbnail ),
                    width = img.sizes.full[0],
                    height = img.sizes.full[1],
                    alt = img.info.alt,
                    imgTag = <p>
                                <img src={src} width={width} height={height} alt={alt} />
                            </p>;

                imageLists.push(imgTag);

            });    
            
            tinymce.activeEditor.insertContent(ReactDOMServer.renderToString(imageLists));

        }

        else if ( command === 'attachFeaturedImage' ) {

            const img = selected_files[0],
                  src = getURLUploadPath().concat( img.thumbnail ),                
                  alt = img.info.alt;

            document.mediaEmbbedModalPointer.setState({
                featuredImage : {

                    src,
                    alt

                }
            });

        }

        modalUtils.closePopboxModal(this.state.modal_id);

        
    }

    handleCloseModal(e) {

        e.preventDefault();

        if ( document.mediaEmbbedModalCommand ) {
            delete document.mediaEmbbedModalCommand; 
        }

        if ( document.fileManagerCExtraSettings ) {
            delete document.fileManagerCExtraSettings;
        }

        modalUtils.closePopboxModal(this.state.modal_id);

    }

    
    render() {

        return (
            <div data-popbox-id={this.state.modal_id}
                className="popbox mediaEmbbedModal">

                <div className="popbox_container">

                    <div className="heading mediaHeading">{this.props.heading}</div>

                    <div className="text mediaBody">

                        <FileManager />

                    </div>

                    <div className="footer mediaFooter">

                        <button className="btn btn-primary"
                                onClick={this.onClick_chooseObject.bind(this)}>{this.props.chooseText}</button>

                        <button className="btn btn-default"
                                onClick={this.handleCloseModal.bind(this)}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>

        );
    }
}

export default MediaEmbbedModal;