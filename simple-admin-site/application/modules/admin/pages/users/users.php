<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsersPage {    
	
	public function __construct() {

    }

   public function get_user_info() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        $userinfo = libMemberShip::getUserInfo();

        if ( is_null( $userinfo ) ) :

            callAjaxResponseError();

        endif;

        callAjaxResponse( 

            array('userinfo' => $userinfo) 

        );      

   }

    public function get_user_roles_list() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        $result = libMemberShip::getUserRolesList();

        if ( is_string( $result ) ) :
        
            callAjaxResponse(

                array(
                    'response' => 'error',
                    'message' => $result
                )

            );

        endif;

        callAjaxResponse( 

            array('roles_list' => $result ) 

        );

    }

    public function get_profile_avatars() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';  

        $avatars_list = libMemberShip::getProfileAvatars();

        callAjaxResponse( array( 'avatars' => $avatars_list ) );

    }

    public function create_new_profile() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        libMemberShip::createNewProfile();

    }

    public function update_profile() {
            
        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        libMemberShip::updateProfile();        

    }

    public function upload_avatar() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        libMemberShip::uploadAvatar();

        callAjaxResponseSuccess();

    }

    public function update_password() {
        
        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        libMemberShip::updatePassword();        

    }

    public function get_active_users() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $result = libMemberShip::getActiveUsers();

        if ( is_string( $result ) ) :
        
            callAjaxResponse(

                array(
                    'response' => 'error',
                    'message' => $result
                )

            );

        endif;

        callAjaxResponse( $result );

    }

    public function get_deactive_users() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $result = libMemberShip::getDeActiveUsers();

        if ( is_string( $result ) ) :
        
            callAjaxResponse(

                array(
                    'response' => 'error',
                    'message' => $result
                )

            );

        endif;

        callAjaxResponse( $result );

    }

    public function remove_active_user() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $result = libMemberShip::removeActiveUser();       

        if ( is_string( $result ) ) :

            callAjaxResponse(

                array(
                    'response' => 'error',
                    'message' => $result
                )

            );

        endif;

        callAjaxResponseSuccess();

    }

    public function restore_deactive_user() {

        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $result = libMemberShip::restoreDeActiveUser();
        
        if ( is_string( $result ) ) :

            callAjaxResponse(

                array(
                    'response' => 'error',
                    'message' => $result
                )

            );

        endif;

        callAjaxResponseSuccess();

    }
	
}