import axios from 'axios';

import { displayFListInFolder, initLoadingFilesList } from './fileUtils';

import {onKeyDown_RemoveFile } from 'handleEvents/fileManagerHandleEvents';

import * as _ from '../libUtils.js';

function getNewFolderInfo(name, parent) {

    let path = this.state.root_dir_path.concat(name);

    if ( parent.path != this.state.root_dir_path ) {

        path = parent.path.concat('/', name);

    }

    if ( ! path.startsWith('/') ) {

        path = '/'.concat(path);

    }

    return {

        name : name,
        path : path,
        old_path : '',
        new_path : '',
        alias : name,
        active : false,
        disabled : false,
        edit_mode : true,
        children : []

    };

}

function getParentFolder(folder, isRef = false) {

    let self = this,
        folder_nodes = self.state.folder_nodes,
        path = folder.path,
        parent_path = '',        

        s = path.split('/');

    s.pop();

    parent_path = s.join('/').trim();
    parent_path = parent_path == '' ? self.state.root_dir_path : parent_path;

    if ( ! _.isUndefined( self.folder_node ) ) delete self.folder_node;
    
    folder_nodes.map((fld, i) => mapSearchFolderNode.call(self, fld, i, parent_path, isRef));   

    return isRef ? self.folder_node : _.getCopiedJsonObject( self.folder_node );

}

export function initLoadTrees( path ) {

    let self = this;

    path = typeof( path ) === 'undefined' ? self.state.root_dir_path : path;

    document.removeEventListener('keydown', onKeyDown_RemoveFile.bind(self));

    getFolderTreeNodes(self.state.ajax_url.get_folders).then(nodes => {

        self.setState({ folder_nodes : nodes });

        //initFoldersTree.call(self);
        selectFolder.call(self, path);

        //document.body.style.overflow = "hidden";

        document.addEventListener('keydown', onKeyDown_RemoveFile.bind(self));

    });       

}

function updateFolderStructures(folderinfo) {

    let fd = new FormData();

    fd.append('old_path', folderinfo.old_path);
    fd.append('new_path', folderinfo.new_path);

    axios({

        url : this.state.ajax_url.update_dir_structures,
        method : "POST",
        data : fd,
        responseType : "json"

    }).then(response => {

        console.log(response.data);

    });

}

export function mapSearchFolderNode(fld, i, path, isRef = false) {    

    if ( ! _.isUndefined( this.folder_node ) ) return;

    if ( fld.path === path ) this.folder_node = isRef ? fld : _.getCopiedJsonObject( fld );

    else {

        if ( fld.children.length > 0 ) fld.children.map((f, k) => mapSearchFolderNode.call(this, f, k, path, isRef));

    }

}

// kiem tra trong {parent} co chua {fld} khong ?
// kiem tra o level thu nhat
function checkFolderExists( parent, fld_name ) {    

    if ( parent.children.length > 0 ) {

        return parent.children.filter( f => f['name'].toLowerCase() === fld_name.toLowerCase() ).length > 0;

    }

    return false;

}

function setEditFolderMode() {

    let t = setInterval(function() {

        let element = document.querySelector('.tree-node-editing');

        if ( element !== null ) {

            clearInterval(t);

            //console.log(element);

            element.focus();
            document.execCommand('selectAll', false, null);

        }

    }, 200);

}

export function selectFolder(path) {

    let self = this,
        folder_nodes = self.state.folder_nodes,
        toolbar = self.state.toolbar,

        mapFoldersDisabled = node => {

            if (node.path == path) {

                node.active = true;                             
               
            }

            else {
    
                if ( node.active ) node.active = false;                    

            }

            if ( ! node.disabled ) node.disabled = true;

            if ( node.children.length > 0 ) node.children.map(mapFoldersDisabled);

        },

        mapFoldersEnabled = node => {

            if (node.disabled) node.disabled = false;

            if ( node.children.length > 0 ) node.children.map(mapFoldersEnabled);

        };

    // disable all toolbar
    toolbar.folder.map(tb => tb.disabled = true);
    toolbar.upload.map(tb => tb.disabled = true);
    toolbar.file.map(tb => tb.disabled = true);

    // enable folder selection and disable mouse selection
    folder_nodes.map( mapFoldersDisabled );

    self.setState({
        is_ajax_loading: true,
        files_scroll_paged: 1,
        toolbar : toolbar,
        folder_nodes: folder_nodes
    });

    displayFListInFolder(self.state.ajax_url.get_files_list, 
                         path).then(data => {

        self.setState({ files_list : data });

        initLoadingFilesList.call(self);
        
        // enable some toolbar item
        toolbar.folder.map(tb => {

            switch (tb.navigation) {
    
                case 'trash directory' :
                case 'rename directory' :
    
                    tb.disabled = path == self.state.root_dir_path ? true : false;
    
                    break;
    
                default :

                    tb.disabled = false;
                
                    break;
    
            }
    
        });

        toolbar.upload.map(tb => tb.disabled = false);
        
        // enable folder mouse selection 
        folder_nodes.map(mapFoldersEnabled);

        self.setState({

            is_ajax_loading: false,
            toolbar : toolbar,
            folder_nodes : folder_nodes

        });        

    });

}

export async function getFolderTreeNodes(ajax_url) {   

    const nodes = await axios({

        method : "POST",
        url : ajax_url,
        responseType : 'json'    

    });

    return nodes.data;

}

export function getSelectedFolderObject( isRef = false ) {

    let folder = null,
        mapSearchFolder = e => {

        if ( e['active'] ) folder = isRef ? e : _.getCopiedJsonObject( e );
        
        if ( e.children.length > 0 && folder === null ) e.children.map(mapSearchFolder);

    };

    this.state.folder_nodes.map(mapSearchFolder);

    return folder;
}

export function createFolderAction() {

    let folder_nodes = this.state.folder_nodes,
        selected_folder_node = getSelectedFolderObject.call(this, true), 

        create_dir_action = this.state.FACTION_STAT.CREATE_DIR,

        folder_info = getNewFolderInfo.call(this, this.state.default_folder_name, selected_folder_node);    

    // reference object in folder_nodes
    selected_folder_node.children.push( folder_info );

    this.setState({ folder_nodes : folder_nodes });   

    setEditFolderMode();

    this.folder_node = folder_info; // folder se thao tac  

    this.setState({ action : create_dir_action });

}

export function renameFolderAction() {

    let element = document.querySelector('.tree-node-editing'),        

        folder_nodes = this.state.folder_nodes,

        selectedDirObj = getSelectedFolderObject.call(this),

        default_folder_name = this.state.default_folder_name,
        folder_name_edited = element.innerText.trim(),

        names = ['', default_folder_name],
        
        path = this.folder_node.path,

        exitEditMode = () => {

            this.folder_node.edit_mode = false;

        },

        updateStateAction = () => {

            exitEditMode.call(this);        

            this.setState({ folder_nodes : folder_nodes,
                            keyPreview : true });    

        };   

    delete this.folder_node; // reset result

    // result return [this.folder_node] object
    folder_nodes.map((fld, i) => mapSearchFolderNode.call(this, fld, i, path, true));
    
    // disable shortcut keyboard
    this.setState({ keyPreview : false });

    let boolIsExists = checkFolderExists(selectedDirObj, folder_name_edited),
        boolIsValidate = names.includes( folder_name_edited );
    
    // exclude all names equal folder_name_editing
    if ( boolIsValidate || boolIsExists ) {

        if ( boolIsValidate ) {

            alert(this.state.FOLDER_ERROR_MESSAGE.set_name_default_error);

        }

        else {

            alert(this.state.FOLDER_ERROR_MESSAGE.set_name_exists_error);

        }

        setTimeout( () => {

            element.focus();
            document.execCommand('selectAll', false, null);

        }, 0);

        return false;

    }

    // old name equal new name
    if ( folder_name_edited.toLowerCase() === this.folder_node.name.toLowerCase() ) {        

        updateStateAction.call(this); 

        //delete this.folder_node; // reset     

        return false;

    }    

    //folder_nodes.map(searchDefaultFolder);

    //console.log(this.folder_node);    

    let origin_folder_path = this.folder_node.path;

    this.folder_node.name = folder_name_edited;
    this.folder_node.alias = folder_name_edited;

    let s = this.folder_node.path.split('/');

        s.pop();
        s.push(folder_name_edited);

    this.folder_node.path = s.join('/');

    this.folder_node.old_path = this.state.action === this.state.FACTION_STAT.CREATE_DIR ? '' : 
                                                                                           origin_folder_path;
    this.folder_node.new_path = this.folder_node.path;

    updateStateAction.call(this);

    //console.log(this.folder_node); 

    updateFolderStructures.call(this, this.folder_node);

    //delete this.folder_node; // reset

    let self = this;

    if ( self.state.action === self.state.FACTION_STAT.CREATE_DIR ) {

        setTimeout(() => {

            selectFolder.call(self, self.folder_node.path);

        });

    }

    // reload all trees
    else {

        let selectedDirPathObj = getSelectedFolderObject.call(self);           

        setTimeout(() => {

            initLoadTrees.call(self, selectedDirPathObj.path);

        }, 200);

    }

}

export function handleClick_RenameFolder(e) {

    let folder_nodes = this.state.folder_nodes,

        rename_dir_action = this.state.FACTION_STAT.RENAME_DIR,

        selectedFolderObj = getSelectedFolderObject.call(this, true);
        //selectedDirPath = selectedFolderObj.path;

    // disable rename root dir
    if ( selectedFolderObj.path === this.state.root_dir_path ) return;

    //if ( ! _.isUndefined( this.folder_node ) ) delete this.folder_node; // reset

    //folder_nodes.map((fld, i) => mapSearchFolderNode.call(this, fld, i, selectedDirPath));    

    // set rename mode

    // reference object in folder_nodes
    selectedFolderObj.edit_mode = true; 

    this.setState({ folder_nodes : folder_nodes });

    setEditFolderMode();

    this.setState({ action : rename_dir_action });

    this.folder_node = selectedFolderObj;

    //delete this.folder_node; // reset

}

export function removeFolderAction(e) {

    let fd = new FormData(),
        self = this,
        selectedDirObj = getSelectedFolderObject.call(self),
        path = selectedDirObj.path,

        parentFolder = getParentFolder.call(self, selectedDirObj); 

    // disable remove root dir
    if ( path === self.state.root_dir_path ) return;       

    fd.append("path", path);

    axios({
        method : "POST",
        url : self.state.ajax_url.remove_folder,
        data : fd
    }).then(response => {

        if ( response.data.response === 'success' ) {

            setTimeout(() => {

                //console.log( parentFolder );

                initLoadTrees.call(self, parentFolder.path);

            }, 200);

        }

    });

}