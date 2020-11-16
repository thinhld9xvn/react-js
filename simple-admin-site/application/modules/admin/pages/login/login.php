<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class LoginPage {
	
	public function __construct() {}   	
    
    public function callLogin() {

        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';
        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';        

        $username =  $_POST['username'];
        $password = $_POST['password'];

        $result = libMemberShip::login($username, $password);

        if ( is_string( $result ) ) :

            callAjaxResponse(

                array(

                    'response' => 'error',
                    'message' => $result

                )

            );

        endif;

        // login success
        if ( $result ) :

            callAjaxResponseSuccess();

        endif;

        // login error
        callAjaxResponseError();

    }

    public function checkLogin() {

        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';
        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        $boolLogin = libMemberShip::checkLogin();

        if ( $boolLogin ) callAjaxResponse( array('login_status' => true) );    

        callAjaxResponse( array('login_status' => false) );      

    }

    public function logout() {

        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';
        require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';

        $boolLogin = libMemberShip::logout();

        callAjaxResponseSuccess();

    }
	
}