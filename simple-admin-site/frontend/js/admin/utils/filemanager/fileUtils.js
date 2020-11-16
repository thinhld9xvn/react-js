import axios from 'axios';

import {getSelectedFolderObject} from './folderUtils';

import { JSON_CONFIG_URL } from 'constants/urlConstants';

export function convertFileSize(size) {

    var KB = 1024,
        MB = KB * 1024,
        GB = MB * 1024;

    size = parseFloat(size);

    if (size >= KB && size < MB) {

        return { 'size': Math.round(size / KB), 'unit': 'KB' };
    }

    if (size >= MB && size < GB) {

        return { 'size': Math.round(size / MB), 'unit': 'MB' };
    }

    return { 'size': size, 'unit': 'B' };
}

export function getURLUploadPath() {

    return window.location.origin + '/uploads';
}

// tạo một tên file không trùng lặp dựa trên một tên file đã tồn tại
function createUniqFNameExist(name) {

    let getUniqFnObject = function(fn) {

        let fn_splices = fn.toLowerCase().split('.'),
            fn_length = fn_splices.length,
            fn_object = { name: '', extension: '' };

        for (let i = 0; i < fn_length; i++) {

            if (i < fn_length - 1) {

                if (i > 0) {

                    fn_object['name'] += '.';
                }

                fn_object['name'] += fn_splices[i];
            } else {

                fn_object['extension'] = fn_splices[i];
            }
        }

        return fn_object;
    },

    fn = getUniqFnObject(name),
    uniq_name = fn['name'],
    ext = fn['extension'],
    id = 0,
    list_files = this.state.temp_files_list.filter(f => f['name'].startsWith(uniq_name) !== -1);

    list_files.map( (f, i) => {

        var _fn_obj = getUniqFnObject(f['name']),
            fname = _fn_obj['name'],
            fname_splices = fname.split('-'),
            fid = parseInt(fname_splices.pop());

        if (isNaN(fid)) {

            fid = 0;
        }

        if (fid > id) {

            id = fid;
        }
    });

    id += 1;

    return uniq_name + '-' + id.toString() + '.' + ext;
}

export async function displayFListInFolder(ajax_url, path) {    

    let fd = new FormData();
    
    fd.append('path', path);

    const files_list = await axios({

        method : "POST",
        url : ajax_url,
        responseType : 'json',
        data : fd

    });

    return files_list.data;

}

export function LoadingFilesList(files_list, num_per_page, paged) {

    let temp_filemanager_files = [],
        length = files_list.length,
        start = num_per_page * paged - num_per_page,

        count = 0;

    files_list.map( (e,i) => {

        if (i >= start && start < length && count < num_per_page) {

            temp_filemanager_files.push(e);

            count++;
        }
    });

    return temp_filemanager_files;
}

export function initLoadingFilesList() {

    let files_scroll_paged = this.state.files_scroll_paged,
        temp_files_list = [];

    document.querySelector('#file-manager .fm-right').scrollTop = 0;

    temp_files_list = LoadingFilesList(this.state.files_list, this.state.files_per_page, files_scroll_paged);

    this.setState({

        temp_files_list: temp_files_list,
        files_scroll_paged: files_scroll_paged + 1

    });
}

export function getSelectedFiles() {

    var f_ids = [];

    this.state.temp_files_list.map(e => {

        if (e.active) {

            f_ids.push(e);
        }
    });

    return f_ids;
}

function checkFileExist(name) {

    return this.state.temp_files_list.filter(o => o['name'].toLowerCase() === name.toLowerCase())
                                     .length > 0;    
}

function changeToAnsiName(name) {
    var str = name;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|{|}|\||\\/g, "");
    str = str.replace(/ + /g, "");
    str = str.trim();
    return str;
}

function getNewDataFile(name) {

    return {
        name: name,
        thumbnail: name,
        active: false,
        upload: {
            stat: true,
            percentage: 0,
            error: {
                stat: false,
                message: ""
            }

        },
        info: {
            id: -1,
            title: "",
            alt: "",
            description: ""
        },
        type: {
            label: "Hình ảnh",
            code: "image"
        },
        length: 0,
        datecreated: "",
        sizes: {
            thumbnail: [],
            full: []
        }
    };
}

function getFileType(ext) {

    if (ext === 'png' || ext === 'bmp' || ext === 'gif' || ext === 'jpg' || ext === 'jpeg' || ext === 'svg') return 'image';

    if (ext === 'exe') return 'executable';
    if (ext === 'doc' || ext === 'docx') return 'word';
    if (ext === 'xls' || ext === 'xlsx') return 'excel';
    if (ext === 'php') return 'php source';
    if (ext === 'pdf') return 'portable document';

    return 'other';
}

// lấy thông tin cấu hình cho việc upload
async function getUploadConfig() {

    var d = await axios({
        url: JSON_CONFIG_URL.concat('upload.config.json'),
        method: 'GET',
        responseType: 'json'
    });

    return d.data;
}

// thông báo lỗi khi upload file
function addUploadErrorNotify(data, msg) {

    let temp_files_list = this.state.temp_files_list,
        file = temp_files_list.filter(e => e['name'] === data['name'])[0];

    file.upload.error.stat = true;
    file.upload.error.message = msg;

    this.setState({ temp_files_list: temp_files_list });
}

// @param json file_obj
// @return ( thumbnail path ) || ( thumbnail base64 )
function getThumbnailAttachment(ext) {

    let type = getFileType(ext);

    if ( type === 'image' ) {

        let selectedDir = getSelectedFolderObject.call(this);

        return getURLUploadPath().concat( selectedDir.path, '/', file_obj.thumbnail );

    }
        //return getURLUploadPath().concat(, '/', file_obj.name);

    if (type === 'executable') return this.state.FICON_STAT.exe;
    if (type === 'word') return this.state.FICON_STAT.word;
    if (type === 'excel') return this.state.FICON_STAT.excel;
    if (type === 'php source') return this.state.FICON_STAT.php;
    if (type === 'portable document') return this.state.FICON_STAT.pdf;

    return this.state.FICON_STAT.other;
}

export function uploadFiles(ufs) {

    let self = this,
        upload_files = ufs,
        length = ufs.length,

    // autoRename: tự động đổi tên file nếu file đã tồn tại
    add_upload_queue = async function(i, upload_files, autoRename) {

        let file = upload_files[i],
            file_name = changeToAnsiName(file['name'].toLowerCase()),
            file_ext = file['name'].split('.').pop().toLowerCase(),
            file_exist = checkFileExist.call(self, file_name),
            file_size = file['size'],
            fileData = getNewDataFile(file_name),
            temp_files_list = self.state.temp_files_list,

            config = await getUploadConfig(),

            import_data_upload = function(f1, f2) {

                f1.name = f2.name;
                f1.thumbnail = f2.thumbnail;
                f1.info = f2.info;
                f1.sizes = f2.sizes;
                f1.datecreated = f2.datecreated;
                f1.length = f2.length;
                f1.upload = f2.upload;
                f1.active = f2.active;
                f1.type = f2.type;

            },

            progress_upload = function(e) {

                if (e.lengthComputable && self.state.upload_stat !== false) {

                    let ufile = temp_files_list.filter(e => e['name'] === fileData['name'])[0],
                        max = e.total,
                        current = e.loaded,
                        percentage = current * 100 / max;

                    //console.log( percentage );        				        

                    if (percentage <= 100) {

                        ufile.upload.percentage = percentage;
                        
                        ufile.thumbnail = ''; // wait ajax complete and update lists
                        ufile.upload.stat = false;

                        self.setState({ temp_files_list: temp_files_list });
                    }
                }

            },

            do_upload = async function() {

                var selectedDir = getSelectedFolderObject.call(self),
                    reader = null,
                    options = {},
                    fd = new FormData();

                if (window.FileReader) {

                    reader = new FileReader();
                    reader.readAsDataURL(file);

                    fd.append("upload_file", file);

                    fd.append('alias', 'media');
                    fd.append('command', 'upload');
                    fd.append('selected_dir_path', selectedDir.path);

                    if (autoRename || file['name'].toLowerCase() !== file_name) {

                        options['newFileName'] = file_name;
                    }

                    if (Object.keys(options).length > 0) {

                        fd.append('options', JSON.stringify(options));
                    }

                    let result = await axios({

                        method: "POST",
                        url: self.state.ajax_url.upload,
                        data: fd,
                        onUploadProgress: progress_upload

                    });

                    return result.data;
                }
            },

            main_upload_queue = async function() {

                let index = -1,
                    exts = config.AllowUploadFileExtensions;

                index = exts.findIndex(function (e) {
                    return e === file_ext;
                });

                if (index !== -1) {

                    let m_size = config.AllowUploadMaxFileSizeMB,
                        m_size_bytes = m_size * (1024 * 1024);

                    if (file_size <= m_size_bytes) {

                        let r_data = await do_upload();

                        //console.log(r_data);

                        // tra ve ket qua upload
                        if (typeof( r_data.error ) === 'undefined') {                          

                            let ufile = r_data,
                                tmp = temp_files_list.filter(f => f.name === fileData.name )[0];                           

                            import_data_upload(tmp, ufile);

                            /*if (ufile.type.code !== 'image') {

                                ufile.thumbnail = getThumbnailAttachment.call(self, file_ext);
                            }*/                            

                            self.setState({ temp_files_list: temp_files_list });

                        } else {

                            alert('Có lỗi xảy ra khi upload, xin hãy kiểm tra lại !');
                        }
                    } else {

                        addUploadErrorNotify.call(self, fileData, self.state.UPLOAD_ERROR_MESSAGE.exceed_limit_upload_size);
                    }
                } else {

                    addUploadErrorNotify.call(self, fileData, self.state.UPLOAD_ERROR_MESSAGE.not_support_file_type);
                }
            };

        if ( ! file_exist || file_exist && autoRename ) {

            if (file_exist && autoRename) {

                file_name = createUniqFNameExist.call(self, file_name);

                fileData.name = file_name;
                //fileData.thumbnail = self.state.FICON_STAT.uploading;

            }

            //console.log(fileData);

            // chen file vao dau danh sach
            temp_files_list.splice(0, 0, fileData);            

            self.setState({ temp_files_list: temp_files_list });

            //console.log( self.state.temp_files_list );

            if (i > 0) {

                if (self.state.upload_stat) {

                    main_upload_queue();

                } else {

                    alert('Phát sinh lỗi khi upload file, xin hãy kiểm tra lại.');
                }
            } else {

               main_upload_queue();
            }
        } else {

            // upload cùng đổi tên file
            add_upload_queue(i, upload_files, true);

        }
    };

    if (length > 0) {

        for (let i = length - 1; i >= 0; i--) {

            add_upload_queue(i, upload_files);
        }
    }
}

export function onRemoveFile() {

    var self = this,
        temp_files_list = self.state.temp_files_list,
        selected_files = getSelectedFiles.call(self),
        selected_dir = getSelectedFolderObject.call(self),
        url = self.state.ajax_url.remove_files,
        rm_files = [],
        length = 0;

    selected_files.map(f => {

        var sf = temp_files_list.filter(function (o) {
            return o['name'] === f['name'];
        });

        if (sf.length > 0) rm_files.push(sf[0]);
    });

    length = rm_files.length;

    if (length > 0) {

        if (confirm("Bạn có chắc muốn xóa những tập tin đã chọn không ?")) {

            let fd = new FormData();

            fd.append('data', JSON.stringify( rm_files ) );
            fd.append('dir_path', selected_dir.path);

            axios({
                method : "POST",
                responseType : "json",
                url : url,
                data : fd
            }).then(response => {

                let msg = response.data;

                if ( msg.response === 'success' ) {

                    temp_files_list = temp_files_list.filter(f => {

                        let isFound = false;

                        for ( let i = 0; i < length; i++ ) {

                            // loại file ra khỏi danh sách
                            if ( rm_files[i]['name'] === f['name'] ) {

                                isFound = true;

                                break;

                            }

                        }

                        if ( ! isFound ) return true; // để lại file này trong danh sach

                        return false;

                    });

                    // reload lại danh sách files
                    self.setState({ temp_files_list : temp_files_list });

                }

                else {

                    alert('Có lỗi xảy ra trong quá trình xóa tập tin !');

                }

            });
            
        }
    }
}