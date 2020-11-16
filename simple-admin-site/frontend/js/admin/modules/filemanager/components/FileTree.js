import React from 'react';

import {onMouseDown_ChooseFile, onDblClick_InfoFile, onContextMenu_ShowContextMenu} from 'handleEvents/fileManagerHandleEvents';

import { getURLUploadPath } from 'utils/filemanager/fileUtils';

class FileTree extends React.Component {

    constructor(props) {

        super(props);                    

    }   

    render() {

        const temp_files_list = [],   
              parent = this.props.parent;         

        if ( this.props.data.length > 0 ) {
            
            this.props.data.map( data => {

                let img_src = this.props.FICON_STAT.loading;

                if ( data.upload.stat ) {

                    img_src = this.props.FICON_STAT.uploading;

                }

                else {

                    if ( data.thumbnail !== '' ) {

                        img_src = getURLUploadPath().concat(data.thumbnail);

                    }

                }               
                

                temp_files_list.push(
                    <div key={data.name} data-key-item={data.name} 
                        className={"item item-layout pull-left center".concat(data.active ? ' active' : '')
                                                                    .concat(data.upload.stat ? ' uploading' : '')}
                        data-contextmenu="file"
                        onMouseDown={onMouseDown_ChooseFile.bind(parent)}
                        onDoubleClick={onDblClick_InfoFile.bind(parent)}
                        onContextMenu={onContextMenu_ShowContextMenu.bind(parent)}>
                        <div className="item-thumbnail">                            
                                                   
                            <img src={img_src} alt={data.info.alt} />

                        </div>
                        <div className="item-title mtop5">
                            {data.name}
                        </div>     
                        <div className="item-upload">
                            <div className="upload-progressbar" style={{ width : data.upload.stat ? data.upload.percentage.toString().concat("%") : 0 }}></div>
                            {
                                typeof(data.upload.error) !== 'undefined' && data.upload.error.stat ? (
                                    <div className="upload-error">
                                        <img width="32" height="32" src={this.props.FICON_STAT.error} />
                                        <div className="fm-jtooltip">{data.upload.error.message}</div>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                    </div>
                );

            });

        }

       
        return ( temp_files_list )
    }
}

export default FileTree;