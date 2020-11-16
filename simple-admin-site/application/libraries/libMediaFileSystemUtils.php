<?php

require_once CONSTANTS_DIR_PATH . 'constFileSystem.php';

class libMediaFileSystemUtils {

    private $dirList, $fileList;

    public function __construct() {

        $this->dirList = $this->getNewDirInfo('/', '/', 'root');

        $this->fileList = array();

    }

    private function getNewDirInfo($name, $path, $alias) {

        return array(
            'name' => $name,
            'path' => $path,
            'old_path' => '',
            'new_path' => '',
            'alias' => $alias,
            'active' => false,
            'edit_mode' => false,
            'disabled' => false,
            'children' => array()
        );

    }

    public function ProcessListPaths( $listPaths, $depth = 1, $ignore = FILEMANAGER_IGNORE_FILE  ) {

        require_once LIBRARIES_DIR_PATH . 'libArrayUtils.php';

        while ( count ( $listPaths ) > 0 ) :

            $path = array_pop( $listPaths );
            
            if ( FILEMANAGER_IGNORE_DIRECTORY === $ignore ) :

                // nếu path là file => xử lý file đang duyệt
                if ( is_file( $path ) && is_readable( $path ) ) :

                    $this->fileList["$path"] = filemtime( $path );


                endif;               

            elseif ( FILEMANAGER_IGNORE_FILE === $ignore ) :

                // nếu path là folder => xử lý folder đang duyệt
                if ( is_dir( $path ) && is_readable( $path ) ) :

                    $dirname = basename( $path );
                    $dirpath = str_replace(UPLOAD_DIR_PATH, "", $path);

                    $dirpath = $dirpath === '' ? '/' : $dirpath;                    

                    $splices = explode('/', $dirpath);

                    array_pop( $splices );

                    $parent = implode('/', $splices);
                    $parent = empty( $parent ) ? '/' : $parent;                    

                    //echo $parent . "\r\n";

                    $info = $this->getNewDirInfo($dirname, $dirpath, $dirname);

                    $dirList =& $this->dirList;       

                    libArrayUtils::pushArrayTree('path', $parent,
                                                  'children', $dirList, $info);

                    /*echo "<pre>";
                    print_r( $dirList );
                    echo "</pre>";*/

                    //print_r( $info ); die();

                    $this->scanRDir( $path, array(), $depth + 1, $ignore );                    

                endif;

            endif;

        endwhile;

    } 

    public function scanRDir( $rootDir, $listPaths = array(), $depth = 1, $ignore = FILEMANAGER_IGNORE_FILE, $scode = FILEMANAGER_GET_ALL_FILES  ) {

        //require_once LIBRARIES_DIR_PATH . 'libImageUtils.php';
        require_once LIBRARIES_DIR_PATH . 'libFileUtils.php';

        //$libImageUtils = new libImageUtils();
        $libFileUtils = new libFileUtils();

        // set filenames exclude if you want
        $exclude_files = array(".", "..", ".htaccess", ".htpasswd");

        // run through content of root directory
        $dirContent = scandir($rootDir);

        foreach ( $dirContent as $key => $content ) :

            // filter all files not accessible
            $path = $rootDir . '/' . $content;

            if ( ! in_array( $content, $exclude_files ) ) :

                if ( FILEMANAGER_IGNORE_FILE === $ignore ) :

                    if ( is_dir( $path ) && is_readable( $path ) ) :

                        array_push( $listPaths, $path );                  

                    endif;

                elseif ( FILEMANAGER_IGNORE_DIRECTORY === $ignore ) :

                    if ( is_file( $path ) && is_readable( $path ) ) :

                        $fname = basename( $path );

                        $ext = pathinfo( $path, PATHINFO_EXTENSION ); 

                        if ( $scode === FILEMANAGER_GET_ONLY_IMAGES ) :

                            $type = $libFileUtils->getFileType( $ext );

                            if ( $type['code'] === 'image' ) :

                                $match = preg_match("/[-][0-9]+[x][0-9]+[.][a-zA-Z]{3,}$/", $fname);

                                if ( 0 === $match ) :

                                    array_push( $listPaths, $path );

                                endif;

                            endif;

                        else :

                            $match = preg_match("/[-][0-9]+[x][0-9]+[.][a-zA-Z]{3,}$/", $fname);

                            if ( 0 === $match ) :

                                array_push( $listPaths, $path );

                            endif;

                        endif;                       

                    endif;

                endif;                    

            endif;        

        endforeach;       

        // process all list paths
        $this->ProcessListPaths( $listPaths, $depth, $ignore, $scode );

    }

    public function deleteRecursiveDir($dirPath) {

        if ( ! is_dir( $dirPath ) ) :

            if ( file_exists($dirPath) !== false ) :

                unlink($dirPath);

            endif;

            return;

        endif;

        if ( $dirPath[ strlen($dirPath) - 1 ] != '/' ) :

            $dirPath .= '/';

        endif;

        $files = glob($dirPath . '*', GLOB_MARK);

        foreach ($files as $file) :

            if ( is_dir($file) ) :

                $this->deleteRecursiveDir($file);                

            else :

                unlink($file);

            endif;

        endforeach;

        rmdir( $dirPath );
    }   

    public function getUploadDirListData() {

        $this->scanRDir( UPLOAD_DIR_PATH );

        return $this->dirList;

    }

    public function getFileListInFolder( $dirPath, $scode = FILEMANAGER_GET_ONLY_IMAGES ) {        

        $this->fileList = array();                        

        $this->scanRDir( $dirPath, array(), 1, FILEMANAGER_IGNORE_DIRECTORY, $scode );

        $fileList = $this->fileList;

        arsort( $fileList );

        $fileListPath = array_keys( $fileList );

        $fileList = array();

        foreach ( $fileListPath as $filePath ) :

            $fileList[] = pathinfo( $filePath );
            
        endforeach;

        return $fileList;

    }

    public function concatDFPath( $d1, $d2 ) {

    	if ( substr( $d1, strlen( $d1 ) - 1 ) === '/' ) :

			$d1 .= $d2;

		else :

			$d1 .= '/' . $d2;

		endif;

		return $d1;

    }

    public function createUserAvatarDir($username) {

        $u_dir = sprintf("%s/%s", AVATAR_DIR_PATH, 
                                  $username);        

        if ( file_exists( $u_dir ) ) :

            $this->deleteRecursiveDir( $u_dir );

        endif;

        mkdir($u_dir, 0777, true);

        return $u_dir;

    }

}

