import React from 'react';

import './css/style.min.css';
import './css/layout.min.css';

import {onDragOver_DropFile, onDrop_DropFile, 
        onScroll_LoadingFilesList, onClick_ShowModalChooseFile,
        onChange_InfoFileChanged, onMouseUp_DisableContextMenu, onClick_PerformContextMenuAction} from '../../handleEvents/fileManagerHandleEvents';

//import Modal from 'react-modal';

import FileInfoModal from './modals/fileinfomodal';
import FileUploadModal from './modals/fileuploadmodal';

import AjaxLoading from './components/AjaxLoading';
import FileManagerToolbar from './components/FileManagerToolbar';
import FolderTree from './components/FolderTree';
import FileTree from './components/FileTree';
import FileContextMenu from './components/FileContextMenu';
import FolderContextMenu from './components/FolderContextMenu';

import { initLoadTrees } from 'utils/filemanager/folderUtils';

import { addComponentInst } from 'utils/componentUtils';

class FileManager extends React.Component {

    constructor(props) {

        super(props);        

        const filemanager_toolbar = {

            folder : [

                {
                    navigation : 'new directory',
                    className : 'btn btn-danger root new_dir',
                    command : 'new_dir',
                    text : 'Tạo thư mục',
                    disabled : false
                },
                {
                    navigation : 'rename directory',
                    className : 'btn btn-danger root ren_dir',
                    command : 'ren_dir',
                    text : 'Đổi tên thư mục	',
                    disabled : true
                },
                {
                    navigation : 'trash directory',
                    className : 'btn btn-danger root trash_dir',
                    command : 'trash_dir',
                    text : 'Xoá thư mục',
                    disabled : true
                }

            ],

            upload : [
                {
                    navigation : 'upload',
                    className : 'btn btn-primary file upload_file',
                    command : 'upload_file',
                    text : 'Upload tập tin',
                    disabled : false
                }
            ],

            file : [
                {
                    navigation : 'info file',
                    className : 'btn btn-primary file info_file',
                    command : 'info_file',
                    text : 'Thông tin tập tin',
                    disabled : true
                },
                {
                    navigation : 'trash file',
                    className : 'btn btn-primary file trash_file',
                    command : 'trash_file',
                    text : 'Xoá tập tin',
                    disabled : true
                }
            ]

        };    

        const ajax_url = {
            upload : window.location.origin + '/admin/media/upload',
            get_files_list : window.location.origin + '/admin/media/get_files_list',
            remove_files : window.location.origin + '/admin/media/remove_files',
            get_folders : window.location.origin + '/admin/media/get_folders',
            remove_folder : window.location.origin + '/admin/media/remove_folder',
            update_dir_structures : window.location.origin + '/admin/media/update_dir_structures'
        };      

        const FIMAGEURL = window.location.origin + '/frontend/js/admin/modules/filemanager/images/';

        const default_folder_name = 'New Folder';       

        this.state = {
            FIMAGEURL : FIMAGEURL,
            FICON_STAT : {
                uploading : FIMAGEURL + 'uploading.png',
                error : FIMAGEURL + 'error.png',  
                loading : FIMAGEURL + 'loading-image.webp',  
                exe : FIMAGEURL + 'exe.png',
                pdf : FIMAGEURL + 'pdf.png',
                php : FIMAGEURL + 'php.png',
                word : FIMAGEURL + 'word.png',
                excel : FIMAGEURL + 'excel.png',
                other : FIMAGEURL + 'other.png'            
            },
            UPLOAD_ERROR_MESSAGE : {
                name_not_validate : "Tên file không hợp lệ, xin hãy đổi tên và upload lại.",
                not_support_file_type : "Loại file này không được phép upload lên server.",
                exceed_limit_upload_size : "Kích thước file vượt quá giới hạn cho phép."                
            },
            FACTION_STAT : {

                CREATE_DIR : 0,
                RENAME_DIR : 1,

            },

            FOLDER_ERROR_MESSAGE : {

                set_name_default_error : 'Thư mục không được bỏ trống hoặc đặt tên là ' + default_folder_name,
                set_name_exists_error : 'Thư mục này đã tồn tại, xin mời đặt tên khác !!!'

            },

            FCONTEXT_MENU_STAT : {

                file : {

                    show : false,
                    X : 0, 
                    Y : 0

                },

                folder : {

                    show : false,
                    X : 0, 
                    Y : 0

                }

            },

            toolbar : filemanager_toolbar,
            folder_nodes : [],
            files_list : [],

            temp_files_list : [],

            files_per_page : 30,
            files_scroll_paged : 1,

            is_ajax_loading : false,

            keyPreview : true,

            upload_stat : true,          

            ajax_url :ajax_url,

            root_dir_path : '/',       
            default_folder_name : default_folder_name,

            action : '',

            fileInfoInModal : null
        };           

    }

    componentDidMount() {

        initLoadTrees.call(this);        

        document.addEventListener('mouseup', onMouseUp_DisableContextMenu.bind(this));        

    }

    componentDidUpdate() {

        addComponentInst({
            name : 'FileManagerRef',
            instance : this
        });

    }    

    render() {

        return (

            <div className="w100p">

                <div className="filemanager-content w100p fm-row-height">

                    <div id="file-manager" className="file-manager overflow-hidden w100p h100p-ms">                        

                        <FileManagerToolbar data={this.state.toolbar}
                                            parent={this} />

                        <div className={"fm-left col-sm-2 col-xs-12 ".concat(this.state.is_ajax_loading ? 'disabled' : '')}>

                            <FolderTree data={this.state.folder_nodes}
                                        parent={this} />

                        </div>

                        <div className="fm-right col-sm-10 col-xs-12" 
                            onDragOver={onDragOver_DropFile.bind(this)}
                            onDrop={onDrop_DropFile.bind(this)}
                            onScroll={onScroll_LoadingFilesList.bind(this)}>

                            <div id="jfmListFile" className="jpanel_content h100p-ms">
                                <div id="listFile-columns-layout" className="listFile-columns-layout">
                                    {
                                        this.state.is_ajax_loading ? <AjaxLoading /> : 
                                                                     <FileTree  data={this.state.temp_files_list}
                                                                                FICON_STAT={this.state.FICON_STAT}                                                                                
                                                                                parent={this} />
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <FileInfoModal heading="Thông tin tập tin"
                               file_item={this.state.fileInfoInModal}
                               onChange_InfoFileChanged={onChange_InfoFileChanged.bind(this)}                             
                               closeText="Đóng lại"  />

                <FileUploadModal heading="Upload tập tin"
                                 onClick_ShowModalChooseFile={onClick_ShowModalChooseFile.bind(this)}
                                closeText="Đóng lại" />

                <FileContextMenu data={this.state.toolbar.file} 
                                 context_menu={this.state.FCONTEXT_MENU_STAT.file} 
                                 onClick_PerformContextMenuAction={onClick_PerformContextMenuAction.bind(this)} />

                <FolderContextMenu data={this.state.toolbar.folder}
                                   context_menu={this.state.FCONTEXT_MENU_STAT.folder} 
                                    onClick_PerformContextMenuAction={onClick_PerformContextMenuAction.bind(this)} />

            </div>

        )
    }
}

export default FileManager;
