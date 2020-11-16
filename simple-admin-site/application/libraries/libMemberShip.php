<?php
    class libMemberShip {

        private static function checkUserExist($username) {

            try {

                $username = libQueries::get_str($username);

                $params = array(

                    'fields' => array('username'),
                    'table' => USERS_TABLE,
                    'where' => array(

                        'username' => array(

                            'value' => $username,
                            'type' => 'string'

                        )

                    )

                );

                $result = libQueries::select($params);       

            } catch ( Exception $e ) {

                return $e->getMessage();

            }

            return count( $result ) > 0;

        }

        public static function login($username, $password) {

            try {

                $params = array(

                    'fields' => array('username', 'display_name', 'password',
                                    sprintf('%s.role_id', USERS_TABLE), 'role_name', 'first_name',
                                    'last_name', 'join_date', 'location',
                                    'age', 'avatar', 'email', 'about_me', 'website', 'is_online', 'user_status'),
                    'table' => USERS_TABLE,
                    'inner_join' => array(

                        'table' => USERS_ROLES_TABLE,
                        'condition' => sprintf('%s.role_id = %s.role_id', 
                                                USERS_TABLE, USERS_ROLES_TABLE)

                    ),
                    'where' => array(

                        'AND' => array(

                            'username' => array(
                                'value' => $username,
                                'type' => 'string'
                            ),

                            'password' => array(
                                'value' => $password,
                                'type' => 'string'
                            )

                        )

                    )

                );

                $result = libQueries::select($params);           

                if ( count( $result ) === 0 ) :

                    return false;

                endif;

                $userinfo = $result[0];

                self::initialize_session_time();

                self::setUserInfo( $userinfo );

                return true;

            } catch(Exception $e) {

                return $e->getMessage();

            }
           

        }

        public static function setUserInfo($userinfo) {

            $_SESSION['userinfo'] = $userinfo;

        }

        public static function getUserInfo() {

            if ( isset( $_SESSION['userinfo'] ) && ! empty( $_SESSION['userinfo'] ) )
                return $_SESSION['userinfo'];

            return null;

        }

        private static function initialize_session_time() {

            $_SESSION["user_session_time"] = time();

        }

        public static function is_user_session_timeout() {

            $user_session_timeout = LOGIN_SESSION_TIMEOUT;

            $is_timeout = false;

            if ( isset( $_SESSION["userinfo"] ) ) :

                if ( isset( $_SESSION["user_session_time"] ) ) :

                    $begin_t = $_SESSION["user_session_time"];

                    $current_t = time();

                    if ( isset( $begin_t ) ) :

                        $t = $current_t - $begin_t;

                        if ( $t >= $user_session_timeout ) :

                            $is_timeout = true;

                        endif;

                    else :

                        $is_timeout = true;

                    endif;

                else :

                    $is_timeout = true;

                endif;

            else :

                $is_timeout = true;

			endif;

			return $is_timeout;

        }

        private static function reset_user_sesion() {

            if ( isset( $_SESSION["user_session_time"] ) ) :

                unset($_SESSION['user_session_time']);

            endif;

        }

        private static function removeUserInfo() {

            if ( isset( $_SESSION["userinfo"] ) ) :

                unset( $_SESSION['userinfo'] );

            endif;

        }

        public static function getUserRolesList() {

            try {

                $params = array(

                    'fields' => array('role_id', 'role_name'),
                    'table' => USERS_ROLES_TABLE

                );

                $result = libQueries::select($params);

            } catch (Exception $e) {

                return $e->getMessage();

            }

            return $result;         

        }

        public static function getProfileAvatars() {

            require_once LIBRARIES_DIR_PATH . 'libMediaFileSystemUtils.php';

            $libMediaFileSystemUtils = new libMediaFileSystemUtils();

            $avatars_info = $libMediaFileSystemUtils->getFileListInFolder( AVATAR_DIR_PATH );

            $usersList = self::getActiveUsers();

            foreach ($usersList as $k => $userinfo) :

                $user_avatar_path = AVATAR_DIR_PATH . '/' . $userinfo->username;

                if ( file_exists( $user_avatar_path ) ) :

                    $user_avatar = $libMediaFileSystemUtils->getFileListInFolder( $user_avatar_path );

                    if ( count( $user_avatar ) > 0 ) :

                        $user_avatar[0]['basename'] = $userinfo->username . '/' . $user_avatar[0]['basename'];

                        $avatars_info = array_merge($avatars_info, $user_avatar);

                    endif;

                endif;

            endforeach;

            //print_r( $avatars_info ); die();

            $avatars_list = array();

            //print_r( $avatars_info );

            foreach ($avatars_info as $key => $v) :

                extract( $v );

                array_push( $avatars_list, $basename );

            endforeach;

            return $avatars_list;

        }

        public static function createNewProfile() {

            require_once LIBRARIES_DIR_PATH . 'libMediaFileSystemUtils.php';

            $libMediaFileSystemUtils = new libMediaFileSystemUtils();

            $form = json_decode( $_POST['formFields'], true);

            extract($form);

            $display_name = $last_name . ' ' . $first_name;

            if ( self::checkUserExist($username) ) :

                $error = array(

                    'message' => 'Username đã tồn tại, mời nhập một username khác !!!',
                    'response' => 'error'

                );

                callAjaxResponse($error);

            endif;

            if ( isset( $_FILES['blobAvatarImage'] ) ) :

                $u_dir = $libMediaFileSystemUtils->createUserAvatarDir($username);
                $u_filename = 'avatar.jpg';

                $target_path = sprintf("%s/%s", $u_dir,
                                            $u_filename);

                if ( move_uploaded_file($_FILES['blobAvatarImage']['tmp_name'], $target_path ) ) :

                    $avatar = "{$username}/{$u_filename}";

                endif;

            endif;

            try {

                $params = array(

                    'fields' => array(
                        'username' => $username,
                        'password' => $password,
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'display_name' => $display_name,
                        'email' => $email,
                        'age' => $age,
                        'location' => $location,
                        'website' => $website,
                        'about_me' => $about_me,
                        'role_id' => $role_id,
                        'avatar' => $avatar

                    ),

                    'table' => USERS_TABLE

                );

                libQueries::insert( $params );

                

            } catch (Exception $e) {

                callAjaxResponse(

                    array(
                        'response' => 'error',
                        'message' => $e->getMessage()
                    )

                );             

            } 

            callAjaxResponseSuccess();

        }

        public static function updateProfile() {

            if ( isset( $_POST['profile'] ) ) :

                require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

                $profile = json_decode( $_POST['profile'], true );

                extract($profile);

                try {

                    $params = array(

                        'fields' => array(

                            'role_id' => array(
                                'value' => $role_id,
                                'type' => 'int'
                            ),

                            'first_name' => array(
                                'value' => $first_name,
                                'type' => 'string'
                            ),

                            'last_name' => array(
                                'value' => $last_name,
                                'type' => 'string'
                            ),

                            'display_name' => array(
                                'value' => $display_name,
                                'type' => 'string'
                            ),

                            'location' => array(
                                'value' => $location,
                                'type' => 'string'
                            ),

                            'website' => array(
                                'value' => $website,
                                'type' => 'string'
                            ),

                            'age' => array(
                                'value' => $age,
                                'type' => 'int'
                            ),

                             'about_me' => array(
                                'value' => $about_me,
                                'type' => 'string'
                            ),

                            'avatar' => array(
                                'value' => $avatar,
                                'type' => 'string'
                            ),

                            'password' => array(
                                'value' => $password,
                                'type' => 'string'
                            ),

                        ),

                        'table' => USERS_TABLE,

                        'where' => array(

                            'username' => array(

                                'value' => $username,
                                'type' => 'string'

                            )

                        )

                    );

                    libQueries::update( $params );
                    
                } catch (Exception $e) {

                    callAjaxResponse(

                        array(
                            'response' => 'error',
                            'message' => $e->getMessage()
                        )

                    );

                } 

                $userinfo = self::getUserInfo();

                $userinfo->first_name = $first_name;
                $userinfo->last_name = $last_name;
                $userinfo->display_name = $display_name;
                $userinfo->location = $location;
                $userinfo->website = $website;
                $userinfo->age = $age;
                $userinfo->about_me = $about_me;
                $userinfo->role_name = $role_name;
                $userinfo->role_id = $role_id;
                $userinfo->avatar = $avatar;
                $userinfo->password = $password;

                self::setUserInfo( $userinfo );

                callAjaxResponseSuccess();
                

            endif;

        }

        public static function uploadAvatar() {

            require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';
            require_once LIBRARIES_DIR_PATH . 'libMediaFileSystemUtils.php';

            $libMediaFileSystemUtils = new libMediaFileSystemUtils();

            $userinfo = self::getUserInfo();

            $u_filename = $_POST['newAvatarName'];
            $username = $_POST['username'];

            $u_dir = $libMediaFileSystemUtils->createUserAvatarDir($username);

            $target_path = sprintf("%s/%s", $u_dir,
                                            $u_filename);

            if ( move_uploaded_file($_FILES['avatar']['tmp_name'], $target_path ) ) :

                callAjaxResponse( $u_filename );

            endif;

        }

        public static function updatePassword() {

            $userinfo = self::getUserInfo();

            $old_password = $_POST['old_password'];
            $new_password = $_POST['new_password'];

            $username = $_POST['username'];

            if ( ! isset( $username ) ) :

                $username = $userinfo['username'];

            endif;

            if ( $old_password !== $userinfo->password ) :

                callAjaxResponseError();

            endif;

            try {

                $params = array(

                    'fields' => array(

                        'password' => array(

                            'value' => $password,
                            'type' => 'string'

                        )

                    ),

                    'table' => USERS_TABLE,

                    'where' => array(

                        'username' => array(

                            'value' => $userinfo->username,
                            'type' => 'string'

                        )


                    )

                );

                $result = libQueries::update( $params );               

                
            } catch (Exception $e) {

                callAjaxResponse( 

                    array(
                        'response' => 'error',
                        'message' => $e->getMessage()
                    )
                );

                
            } 

            $userinfo->password = $new_password;

            self::setUserInfo( $userinfo );

            callAjaxResponseSuccess();

        }

        public static function getActiveUsers() {

            try {

                $params = array(

                    'fields' => array(

                        sprintf("%s.id", USERS_TABLE),

                        'username',
                        'display_name',
                        'password',

                        sprintf("%s.role_id", USERS_TABLE),

                        'role_name',
                        'first_name',
                        'last_name',
                        'join_date',
                        'location',
                        'age',
                        'avatar',
                        'email',
                        'about_me',
                        'website',
                        'is_online',
                        'user_status'
                    ),

                    'table' => USERS_TABLE,

                    'inner_join' => array(

                        'table' => USERS_ROLES_TABLE,
                        'condition' => sprintf("%s.role_id = %s.role_id", USERS_TABLE, USERS_ROLES_TABLE )

                    ),

                    'where' => array(

                        'user_status' => array(

                            'value' => 'public',
                            'type' => 'string'

                        )


                    )

                );

                $result = libQueries::select( $params );               

                
            } catch (Exception $e) {

                return $e->getMessage();

                
            } 
            
            return $result;

        }

        public static function getDeActiveUsers() {

            try {

                $params = array(

                    'fields' => array(

                        sprintf("%s.id", USERS_TABLE),

                        'username',
                        'display_name',
                        'password',

                        sprintf("%s.role_id", USERS_TABLE),

                        'role_name',
                        'first_name',
                        'last_name',
                        'join_date',
                        'location',
                        'age',
                        'avatar',
                        'email',
                        'about_me',
                        'website',
                        'is_online',
                        'user_status'
                    ),

                    'table' => USERS_TABLE,

                    'inner_join' => array(

                        'table' => USERS_ROLES_TABLE,
                        'condition' => sprintf("%s.role_id = %s.role_id", USERS_TABLE, USERS_ROLES_TABLE )

                    ),

                    'where' => array(

                        'user_status' => array(

                            'value' => 'trash',
                            'type' => 'string'

                        )


                    )

                );

                $result = libQueries::select( $params );               

                
            } catch (Exception $e) {

                return $e->getMessage();

                
            } 

            return $result;      

        }

        public static function removeActiveUser() {

            $uid = $_POST['uid'];

            try {

                $params = array(

                    'fields' => array(

                        'user_status' => array(

                            'value' => 'trash',
                            'type' => 'string'

                        )

                    ),

                    'table' => USERS_TABLE,

                    'where' => array(

                        'id' => array(

                            'value' => $uid,
                            'type' => 'int'

                        )


                    )

                );

                $result = libQueries::update( $params );               

                
            } catch (Exception $e) {

                return $e->getMessage();

                
            } 

            return true;         

        }

        public static function restoreDeActiveUser() {

            $uid = $_POST['uid'];

            try {

                $params = array(

                    'fields' => array(

                        'user_status' => array(

                            'value' => 'public',
                            'type' => 'string'

                        )

                    ),

                    'table' => USERS_TABLE,

                    'where' => array(

                        'id' => array(

                            'value' => $uid,
                            'type' => 'int'

                        )


                    )

                );

                $result = libQueries::update( $params );               

                
            } catch (Exception $e) {

                return $e->getMessage();

                
            } 

            return true;                  

        }

        public static function checkLogin() {

            return ! self::is_user_session_timeout();

        }

        public static function logout() {

            self::removeUserInfo();
            self::reset_user_sesion();

        }

    }