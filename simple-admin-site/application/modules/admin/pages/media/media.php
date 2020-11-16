<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MediaPage {

    private $mediaFileSystemUtils, $imageUtils, $fileUtils;
	
	public function __construct() {

       require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

       require_once CONSTANTS_DIR_PATH . 'constFileSystem.php';
       require_once LIBRARIES_DIR_PATH . 'libMediaFileSystemUtils.php';
       require_once LIBRARIES_DIR_PATH . 'libImageUtils.php';
       require_once LIBRARIES_DIR_PATH . 'libFileUtils.php';

        $this->mediaFileSystemUtils = new libMediaFileSystemUtils();
        $this->imageUtils = new libImageUtils();
        $this->fileUtils = new libFileUtils();        

    }   

    private function _getThumbnailObjectSnippet( $target_path, $is_image_type, 
                                               $fileinfo,
                                               $dir_path,
                                               $ext,
                                               $is_get_lists = true ) {

        //$tmp_d_path = false === strpos($dir_path, UPLOAD_DIR_PATH) ? UPLOAD_DIR_PATH . $dir_path : $dir_path;         

        if ( $is_image_type ) :

            if ( 'svg' !== $ext ) :                 

                $thumbnail_sizes = $this->imageUtils->get_image_thumbnail_array_sizes();   

                if ( ! $is_get_lists ) :

                    // resize & crop thumbnail sizes

                    if ( is_array( $thumbnail_sizes ) && ! empty( $thumbnail_sizes ) ) :

                        $this->imageUtils->resize_image_multiple_sizes( $target_path, $thumbnail_sizes );

                    endif;

                endif;

                // crop horizontal center attachment sizes
                /*$attachment_sizes = $this->imageUtils->get_attachment_array_sizes();

                if ( is_array( $attachment_sizes ) && ! empty( $attachment_sizes ) ) :

                    $this->imageUtils->crop_image_multiple_sizes( $target_path, $attachment_sizes );

                endif;*/

                // lấy thông tin các thumbnail sizes tồn tại
                // tương đương với các file thumbnail trên hệ thống
                $_thumbnail_sizes = $this->imageUtils->get_exist_thumbnail_sizes( $fileinfo, $thumbnail_sizes );

                list( $t_width, $t_height ) = getimagesize( $target_path );

                $_thumbnail_sizes['full'] = array( $t_width, $t_height );

                // lấy đường dẫn file thumbnail ảnh
                if ( array_key_exists('medium', $_thumbnail_sizes ) ) :

                    $medium_size = $_thumbnail_sizes['medium'];

                    $thumbnail = "{$fileinfo['filename']}-{$medium_size[0]}x{$medium_size[1]}.{$ext}";

                    $path_thumbnail = $this->mediaFileSystemUtils->concatDFPath( UPLOAD_DIR_PATH . $dir_path, 
                                                                            $thumbnail );

                    //echo $path_thumbnail;

                    //echo $path_thumbnail . PHP_EOL;

                    if ( ! file_exists( $path_thumbnail) ) :

                        $thumbnail = $this->mediaFileSystemUtils->concatDFPath( $dir_path, 
                                                                          $fileinfo['filename'] . '.' . $ext );

                    else :

                        $thumbnail = $this->mediaFileSystemUtils->concatDFPath( $dir_path, $thumbnail );

                    endif;

                else :
                   
                    $thumbnail = $this->mediaFileSystemUtils->concatDFPath( $dir_path, 
                                                                      $fileinfo['filename'] . '.' . $ext );

                endif;							

            else :

                $thumbnail = $this->mediaFileSystemUtils->concatDFPath( $dir_path, 
                                                                      $fileinfo['filename'] . '.svg' );

            endif;

        else :

            //$thumbnail = $this->imageUtils->getFileThumbnailSrc( $target_path );
            $thumbnail = '';

        endif;        

        return array(
            'thumbnail_sizes' => $_thumbnail_sizes,
            'thumbnail' => $thumbnail
        );

    }   

    public function get_files_list() {

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed');        

        $CI =& get_instance();       
        $_dir_path = $_POST['path'];
        $dir_path = UPLOAD_DIR_PATH . $_POST['path'];       	

        $filesList = $this->mediaFileSystemUtils->getFileListInFolder( $dir_path );

        $j_filesList = array();

        if ( count( $filesList ) > 0 ) :

            foreach ( $filesList as $file ) : 

                $j_file = array();

                $dirname = $file['dirname'];

                $extension = strtolower( $file['extension'] );				    

                $name = $file['basename'];

                // $path co dang {FCPATH}/uploads/path/to/name
                $path = "{$dirname}/{$name}";
                
                // /path/to/name
                $dir_path = str_replace( UPLOAD_DIR_PATH, '', $dirname );
                //echo $dir_path; die();

                //$dir_path = str_replace( FCPATH . "uploads", "/uploads", $dirname );
                
                //$file_dir_path = str_replace( UPLOAD_DIR_PATH, '', $path );        

                //echo $file_dir_path; die();             

                $CI->db->select('id, title, alt, description');

                /*echo $name . '<br/>';
                echo $dir_path;*/
               
                $data = $CI->db->get_where(DB_PREFIX . 'upload_attachments', 
                                                        array('attachment' => $name,
                                                              'dir' => $_dir_path ))->result();

                $attachment_attributes = $data[0];

                //print_r( $attachment_attributes );                
              
                $file_type = $this->fileUtils->getFileType( $extension ); 

                $thumbnail_object = $this->_getThumbnailObjectSnippet($path, 
                                                             $file_type['code'] === 'image', 
                                                             $file,
                                                             $dir_path,
                                                             $extension,
                                                             true ); 

                $thumbnail = $thumbnail_object['thumbnail'];
                $_thumbnail_sizes = $thumbnail_object['thumbnail_sizes'];
            
                $j_file['name'] = $name;	

                $j_file['thumbnail'] = $thumbnail;

                $j_file['active'] = false;                

                $j_file['info'] = array(

                    'id' => intval( $attachment_attributes->id ),
                    'title' => $attachment_attributes->title,
                    'alt' => $attachment_attributes->alt,
                    'description' => $attachment_attributes->description

                );                

                $j_file['type'] = array(

                    'label' => $file_type['type'],
                    'code' => $file_type['code']

                );

                $j_file['length'] = filesize( $path );

                $j_file['datecreated'] = date("d-m-Y H:i:s A", filectime( $path ) );                

                if ( $_thumbnail_sizes ) :

                    $j_file['sizes'] = $_thumbnail_sizes;

                endif;

                $j_file['upload'] = array(

                    'stat' => false,
                    'percentage' => 0,
                    'error' => array(
                        'stat' => false,
                        'message' => ""
                    )
        
                );

                $j_filesList[] = $j_file;

            endforeach;

        endif;

        callAjaxResponse($j_filesList );

    }

    public function upload() {

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed'); 

        $CI =& get_instance();

        $dir_path = $_POST['selected_dir_path'];
        $upload_dir_path = UPLOAD_DIR_PATH . $dir_path;        

        $u_filename = $_FILES['upload_file']['name'];

        if ( isset( $_POST['options'] ) ) :

            $options = json_decode( $_POST['options'], true );					

            $u_filename = $options['newFileName'];

        endif;

        $target_path = $this->mediaFileSystemUtils->concatDFPath( $upload_dir_path, $u_filename );

        $ufile_size = $_FILES['upload_file']['size'];

        $ext = strtolower( pathinfo( $target_path, PATHINFO_EXTENSION ) );
        
        //echo 'abc'; 
        
        /*if ( file_exists( $target_path ) ) :

            chmod( $target_path, 0755 ); 
            $ret = unlink( $target_path ); 

            if ( ! $ret ) :

                callAjaxResponseError();

            endif;

        endif;*/
    
        if ( move_uploaded_file($_FILES['upload_file']['tmp_name'], $target_path ) ) :

            $fileinfo = pathinfo( $target_path );
            $file_type = $this->fileUtils->getFileType( $ext );

            $thumbnail_object = $this->_getThumbnailObjectSnippet($target_path, $file_type['code'] === 'image', 
                                                                    $fileinfo,
                                                                    $dir_path,
                                                                    $ext );

            $thumbnail = $thumbnail_object['thumbnail'];
            $_thumbnail_sizes = $thumbnail_object['thumbnail_sizes'];

            //$ltdb_attachment_path = str_replace(FCPATH . 'uploads/', '', $target_path); 

            //$dir = str_replace(FCPATH, "/", UPLOAD_DIR_PATH . $dir_path);
            
            $CI->db->insert(DB_PREFIX . 'upload_attachments', array(
                'attachment' => $u_filename,
                'dir' => $dir_path,
                'title' => $fileinfo['filename'],
                'alt' => '',
                'description' => ''
            ));				

            $file = array(

                'name' => basename( $target_path ),
                'thumbnail' => $thumbnail,	
                'active' => false,
                'upload' => array(

                    'stat' => false,
                    'percentage' => 100,
                    'error' => array(
                        'stat' => false,
                        'message' => ''
                    )

                ),
                'info' => array(

                    'id' => $CI->db->insert_id(),
                    'title' => $fileinfo['filename'],
                    'alt' => '',
                    'description' => ''

                ),
                'type' => array(

                    'label' => $file_type['type'],
                    'code' => $file_type['code']

                ),
                'length' => $ufile_size,
                'datecreated' => date("d-m-Y H:i:s A", filectime( $target_path ) )

            );				    	

            if ( $_thumbnail_sizes ) :

                $file['sizes'] = $_thumbnail_sizes;

            endif;
            
            callAjaxResponse($file);

        // error
        else :

            callAjaxResponseError();

        endif;
           
        //}       

    }

    public function remove_files() {

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed'); 

        $CI =& get_instance();

        // /path/to/folder
        $orgin_dir_path = $_POST['dir_path'];
        $dir_path = UPLOAD_DIR_PATH . $orgin_dir_path;

        $rm_files = json_decode( $_POST['data'], true );

        //print_r( $rm_files ); die();

        foreach ( $rm_files as $file ) :

            $file_path = $this->mediaFileSystemUtils->concatDFPath( $dir_path, $file['name'] );

            $fileinfo = pathinfo( $file_path );

            $ext = strtolower( $fileinfo['extension'] );
            $file_name = $fileinfo['filename'];				

            if ( file_exists( $file_path ) ) :	

                $file_type = $this->fileUtils->getFileType( $ext );
                $is_image_type = $file_type['code'] === 'image';

                if ( $is_image_type ) :

                    if ( 'svg' !== $ext ) :

                        $thumbnail_sizes = $this->imageUtils->get_image_thumbnail_array_sizes();						

                        $_thumbnail_sizes = $this->imageUtils->get_exist_thumbnail_sizes( $fileinfo, $thumbnail_sizes );

                        foreach ( $_thumbnail_sizes as $thumbnail ) :

                            $thumb_width = $thumbnail[0];
                            $thumb_height = $thumbnail[1];

                            $thumb_name = "{$file_name}-{$thumb_width}x{$thumb_height}.{$ext}";
                            $thumb_path = $this->mediaFileSystemUtils->concatDFPath( $dir_path, $thumb_name );							

                            if ( file_exists( $thumb_path ) ) :

                                chmod( $thumb_path, 0755 );

                                $ret = unlink( $thumb_path );

                                if ( ! $ret ) :

                                   callAjaxResponseError();

                                endif;

                            endif;

                        endforeach;	

                    endif;	

                endif;

                chmod( $file_path, 0755 );

                $ret = unlink( $file_path );

                //$attachment_path = str_replace(UPLOAD_DIR_PATH, '', $file_path);

                if ( ! $ret ) :

                    callAjaxResponseError();

                endif;

                $CI->db->delete(

                    DB_PREFIX . 'upload_attachments',

                    array(

                        'id' => intval( $file['info']['id'] )

                    )

                );                

            else :

                callAjaxResponseError();

            endif;

        endforeach;

        callAjaxResponseSuccess();

    }

    public function get_folders() {       

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed');

        $dirList = $this->mediaFileSystemUtils->getUploadDirListData();
        $dirList = array( $dirList );
        
        /*echo "<pre>";
        print_r( $dirList );
        echo "</pre>";*/

        callAjaxResponse($dirList);

    }

    public function remove_folder() {

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed');

        $CI =& get_instance();        

        $path = $_POST['path'];

        $dir_path = UPLOAD_DIR_PATH . $path;

        if ( file_exists( $dir_path ) ) :

            $this->mediaFileSystemUtils->deleteRecursiveDir( $dir_path );

            $result = $CI->db->query("call remove_dir_attachments(?)", [$path]);

        endif;

        callAjaxResponseSuccess();

    }

    public function update_dir_structures() {

        if ( ! IS_AJAX_REQUEST ) exit('No direct script access allowed');

        $CI =& get_instance();

        $tbl_upload_attachments = DB_PREFIX . 'upload_attachments';

        $old_path = $_POST['old_path'];
        $new_path = $_POST['new_path'];

        $dir_new_path = UPLOAD_DIR_PATH . $new_path;

        // doi ten thu muc
        if ( ! empty( $old_path ) && ! empty( $new_path ) ) :

            if ( $old_path == $new_path ) callAjaxResponseError();

            $dir_old_path = UPLOAD_DIR_PATH . $old_path;

            rename( $dir_old_path, $dir_new_path );

            /*$result = $CI->db->update($tbl_upload_attachments,

                            array(

                                'dir' => $new_path

                            ),
                            array(

                                'dir' => $old_path

                            )
            );*/            

            $result = $CI->db->query("call update_dir_attachments(?, ?)",
                                      [$old_path, $new_path]);

        else :

            mkdir( $dir_new_path, 0700, true );

        endif;

        callAjaxResponseSuccess();

    }    
	
}