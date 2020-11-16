import { onRemoveFile, LoadingFilesList, 
         getSelectedFiles, uploadFiles } from 'utils/filemanager/fileUtils';

import { selectFolder, createFolderAction, 
         renameFolderAction, handleClick_RenameFolder,
         removeFolderAction,
         getSelectedFolderObject} from 'utils/filemanager/folderUtils';

import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';

//#region Files Events

export function onScroll_LoadingFilesList(e) {

    const element = e.currentTarget;        

    if ( element.scrollTop + element.clientHeight >= element.scrollHeight ) {

        let files_scroll_paged = this.state.files_scroll_paged,
            temp_files_list = this.state.temp_files_list,
            _temp_files_list = LoadingFilesList(this.state.files_list, 
                                                   this.state.files_per_page, 
                                                   files_scroll_paged);           

        if ( _temp_files_list.length > 0 ) {

            temp_files_list = temp_files_list.concat( _temp_files_list );

            this.setState({
                temp_files_list : temp_files_list,
                files_scroll_paged : files_scroll_paged + 1
            });

            //console.log( temp_files_list.length );
            
        }

    }

}

export function onChange_InfoFileChanged(e) {

    let files_list = this.state.files_list,
        fileItem = files_list.filter(e => e.name == this.state.fileInfoInModal.name)[0],
        property = e.target.dataset.property;    

    fileItem.info[property] = e.target.value.toString().trim();

   this.setState({
    files_list : files_list
   });

}

export function onMouseDown_ChooseFile(evt) {        

    const MOUSE_BUTTON_LEFT = 0;
    const MOUSE_BUTTON_RIGHT = 2;

    let isCtrlPressed = evt.ctrlKey,
        button = evt.button,
        keyitem = evt.currentTarget.dataset.keyItem,
        temp_files_list = this.state.temp_files_list,
        toolbar = this.state.toolbar,

        items_other = [],
        item_choosed = null,

        items_selected = [],

        parseItemChoosed = () => {

            // chưa chọn
            if ( ! item_choosed.active ) {

                item_choosed.active = true;                

            }

            // đã chọn từ trước rồi
            else {               

                if ( isCtrlPressed ) {

                    item_choosed.active = false;

                }

            }

            if ( item_choosed.active ) {

                items_selected.push( item_choosed );

            }

        },

        parseItemsOther = () => {

            items_other.map(e => {               

                // giữ nguyên trạng thái
                if (  item_choosed.active && button == MOUSE_BUTTON_RIGHT ) {}

                else {

                    // giữ nguyên trạng thái
                    if ( isCtrlPressed ) {}
 
                    // hủy chọn nếu ko giữ phím ctrl
                    else {

                        e.active = false;

                    }

                }

                if ( e.active ) {

                    items_selected.push( e );

                }

                return e;          

            });

        };

        if ( document.fileManagerCExtraSettings && 
                document.fileManagerCExtraSettings.chooseSingleFile ) {

            temp_files_list.map(e => {

                if ( keyitem == e.name && ! e.uploading ) {

                    e.active = true;
                    items_selected.push(e);

                }

                else {

                    if ( e.active ) e.active = false;

                }

            });

        }

        else {
        
            temp_files_list.map(e => {

                if ( keyitem == e.name && ! e.uploading ) {

                    item_choosed = e;

                }

                else {

                    items_other.push( e );

                }

            });

            parseItemsOther();
            parseItemChoosed();   

        }       
         

    let selected_length = items_selected.length,
        tb_infoFile = toolbar.file.filter(e => e['navigation'] == 'info file')[0],
        tb_removeFile = toolbar.file.filter(e => e['navigation'] === 'trash file')[0];

    if ( selected_length > 0 ) { 

        if ( selected_length == 1 ) {

            // enable toolbar
            if ( tb_infoFile.disabled ) {

                tb_infoFile.disabled = false;

            }

        }
        
        // disable toolbar
        else tb_infoFile.disabled = true;

        if ( tb_removeFile.disabled ) tb_removeFile.disabled = false;

    }

    else {

        if ( ! tb_infoFile.disabled ) tb_infoFile.disabled = true;
        if ( ! tb_removeFile.disabled ) tb_removeFile.disabled = true;

    }

    this.setState({      
        temp_files_list : temp_files_list,  
        toolbar : toolbar
    });

}

export function onDragOver_DropFile(evt) {

    evt.preventDefault();        

}

export function onDrop_DropFile(evt) {

    evt.preventDefault();

    //console.log(evt.dataTransfer.files);

    uploadFiles.call(this, evt.dataTransfer.files);     

}

export function onClick_ShowModalChooseFile(evt) {

    evt.preventDefault();

    let el = document.createElement('input'),
        self = this;
    
    el.type = "file";
    el.multiple = "true";

    el.onchange = event => { 

        modalUtils.closePopboxModal('FileUploadModal');

        uploadFiles.call(self, event.target.files);

    }

    el.click();

}

export function onClick_UploadFile(evt) {
    
    evt.preventDefault();

    modalUtils.openPopboxModal('FileUploadModal');    

}

export function onDblClick_InfoFile(evt) {

    evt.preventDefault();

    let items = getSelectedFiles.call(this),
        item = null;       

    if ( items.length === 1 ) {
        
        item = items[0];           

        this.setState({
            fileInfoInModal : item
        });         
        
        modalUtils.openPopboxModal('FileInfoModal');

    }

}


export function onKeyDown_RemoveFile(evt) {

    const DELETE_KEY = 46;

    if ( this.state.keyPreview ) {

        if ( evt !== undefined && evt.keyCode === DELETE_KEY ) {

            onRemoveFile.call(this);

        }

    }
}
//#endregion Files Events

//#region Folders Events
export function onClick_ChooseFolder(e) { 

    e.preventDefault();         

    let data = JSON.parse( e.currentTarget.dataset.item );

    if ( typeof( e.data ) === 'undefined' ) {             

        e.data = data;

    }

    //console.log( data );       

    selectFolder.call(this, data.path);

}

export function onClick_CreateDir(e) {

    e.preventDefault();   

    createFolderAction.call(this);

}

export function onBlur_RenameDirName(e) {
    
    renameFolderAction.call(this);

}

export function onClick_RenameDir(e) {

    handleClick_RenameFolder.call(this);

}

export function onKeyPress_RenameDirName(e) {

    const ENTER_KEY = 13,  
          DASHED_KEY = 45,
          UNDERSCORE_KEY = 95,
          SPECIAL_KEYS_ALLOWED = [DASHED_KEY, UNDERSCORE_KEY];          

    let charCode = e.which,
        boolCheck = false;

    if ( charCode === ENTER_KEY ) {

        document.querySelector('.tree-node-editing').blur();

        return;

    }

    if ( SPECIAL_KEYS_ALLOWED.includes( charCode ) ) {

        return;

    }

    boolCheck = (charCode > 32) && (charCode < 48); // special keys
    boolCheck = boolCheck || (charCode > 57) && (charCode < 65); // special keys
    boolCheck = boolCheck || (charCode > 90) && (charCode < 97); // special keys
    boolCheck = boolCheck || (charCode > 122) && (charCode < 127); // special keys

    if ( boolCheck ) {

        e.preventDefault();

    }    

}

export function onClick_RemoveDir(e) {

    e.preventDefault();

    if ( confirm("Bạn có chắc muốn thực hiện thao tác này ? Toàn bộ thư mục con và các tập tin sẽ bị xóa !!!") ) {

        removeFolderAction.call(this);

    }

}

//#endregion Folders Events

//#region Context Menu Events
export function onContextMenu_ShowContextMenu(e) {

    e.preventDefault();

    const offset = 5,
          contextMenuWidth = 250;   

    let context_menu = this.state.FCONTEXT_MENU_STAT,
        element = e.currentTarget,
        context = element.dataset.contextmenu,
        X = 0,
        item = ! _.isUndefined( element.dataset.item ) ? JSON.parse( element.dataset.item ) : null;

    //console.log( element );

    if ( ! context_menu[context].show ) {

        context_menu[context].show = true;

    }

    if ( context == 'folder' ) {        

        X = e.pageX - element.clientWidth - contextMenuWidth;

    }

    else {       
        

        X = e.pageX - element.clientWidth - contextMenuWidth;

    }
    
    context_menu[context].X = X;
    context_menu[context].Y = e.pageY;

    //console.log(context_menu.folder);

    // file context menu
    if ( item === null ) {

        this.folder_node = getSelectedFolderObject.call(this, false);

    }

    // folder context menu
    else {

        this.folder_node = item;

    }

    this.setState({ FCONTEXT_MENU_STAT : context_menu });
    
}

export function onClick_PerformContextMenuAction(e) {

    e.preventDefault();

    //console.log('abc');         

    let target = e.currentTarget,
        folder_nodes = this.state.folder_nodes,
        context_menu = this.state.FCONTEXT_MENU_STAT,
        folder_node = this.folder_node,

        mapChooseFolder = fld => {

            if ( fld.path == folder_node.path ) fld.active = true;
            else {

                if ( fld.active ) {
                    fld.active = false;
                }

            }

            if ( fld.children.length > 0 ) {

                fld.children.map(mapChooseFolder);
            }

        };    

    let command = target.attributes["arial-command"].value.toString().trim();    

    folder_nodes.map( mapChooseFolder );

    this.setState({ folder_nodes : folder_nodes });

    onMouseUp_DisableContextMenu.call(this, e);

    switch (command) {

        case 'new_dir' :

            onClick_CreateDir.call(this, e);

            break;

        case 'ren_dir' :

            onClick_RenameDir.call(this, e);

            break;

        case 'trash_dir' :

            onClick_RemoveDir.call(this, e);

            break;

        case 'info_file' :

            onDblClick_InfoFile.call(this, e);

            break;

        case 'trash_file' :

            onRemoveFile.call(this);

            break;

        default :

            break;

    }

}

export function onMouseUp_DisableContextMenu(e) {

    let context_menu = this.state.FCONTEXT_MENU_STAT;

    // hide context menu
    _.mapObject(context_menu, (item, i) => {

        if ( item.show ) item.show = false;

    });   

    this.setState({ FCONTEXT_MENU_STAT : context_menu });         
}
//#endregion Context Menu Events
