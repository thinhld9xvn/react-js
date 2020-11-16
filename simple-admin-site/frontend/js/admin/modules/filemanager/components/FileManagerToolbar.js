import React from "react";

import {onClick_CreateDir, onClick_RenameDir, onClick_RemoveDir,
        onDblClick_InfoFile, onClick_UploadFile} from 'handleEvents/fileManagerHandleEvents';
import { onRemoveFile } from 'utils/filemanager/fileUtils';

class FileManagerToolbar extends React.Component {  

    constructor(props) {

        super(props);

    }  

    render() {        

      const temp_filemanager_toolbar = [],        
            toolbar = this.props.data,
            parent = this.props.parent,      
            group_keys = Object.keys( toolbar ),
            length = group_keys.length;

        for ( let i = 0; i < length; i++ ) {

            let group_name = group_keys[i],
                toolitems = toolbar[group_name];

            temp_filemanager_toolbar.push(
                <div key={"fm-toolbar-".concat(group_name)} 
                     className="fm-toolbar-group" data-group={group_name}>

                    {
                        
                        toolitems.map(e => {

                            let eventClick = null;

                            switch (e.command) {

                                case 'new_dir' :

                                    eventClick = onClick_CreateDir.bind(parent);
                                    break;

                                case 'ren_dir' :

                                    eventClick = onClick_RenameDir.bind(parent);

                                    break;

                                case 'trash_dir' :

                                    eventClick = onClick_RemoveDir.bind(parent);

                                    break;

                                case 'info_file':

                                    eventClick = onDblClick_InfoFile.bind(parent);
                                    
                                    break;

                                case 'trash_file':

                                    eventClick = onRemoveFile.bind(parent);

                                    break;     

                                case 'upload_file':

                                    eventClick = onClick_UploadFile.bind(parent);

                                    break;                           
                            
                                default:
                                    break;
                            };                           

                            return (
                                <div key={"fm-toolbar-item-".concat(group_name,'-',e.className)} 
                                     className={"fm-toolbar-item ".concat(e.command)}>	

                                    <button className={e.className.concat(e.disabled ? " disabled" : "")}
                                            arial-control="jfilemanager" 
                                            arial-command={e.command}
                                            onClick={eventClick}>
                                            {e.text}
                                    </button>

                                </div>    

                            )

                        })

                    }             
                    

                </div>
            )

        };        

        return( <div id="jfm-toolbar" className="fm-toolbar">{temp_filemanager_toolbar}</div> )

    }

}

export default FileManagerToolbar;