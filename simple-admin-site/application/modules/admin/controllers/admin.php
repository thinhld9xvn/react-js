<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    private $routeLevel = 1, $maxLevel = 1;
	
	public function __construct() {        
        
       parent::__construct();            

       $this->load->model('master/master_model');       

    }   

    public function login() {            

        require_once LIBRARIES_DIR_PATH . 'libUrls.php';

        $url = $_SERVER['REQUEST_URI'];
        $route = 'login';

        $isRouteValidate = ! IS_AJAX_REQUEST ? checkAdminRouteValidate( $url, $route, $this->routeLevel, $this->maxLevel ) :
                                               checkAdminRouteValidate( $url, $route, $this->routeLevel, $this->maxLevel + 1 );

        if ( ! $isRouteValidate ) show_404();

        if ( IS_AJAX_REQUEST ) :

            require_once LOGIN_ADMIN_DIR_PATH . 'login.php';

            $loginPage = new LoginPage();   

            $path = getUrlLastPath( $url );

            switch ( $path ) :

                case 'callLogin' :                                           

                    $loginPage->callLogin();
                    
                    break;

                case 'checkLogin' :

                    $loginPage->checkLogin();
                    
                    break;

                case 'logout' :
                    
                    $loginPage->logout();

                    break;

                default: 

                    show_404();

                    break;

            endswitch;

            die();

        endif;

        $this->load->template_view('template_master');        

    }

    public function dashboard() {        

        $this->load->template_view('template_master');

    }

    public function media() {           

        require_once LIBRARIES_DIR_PATH . 'libUrls.php';

        $url = $_SERVER['REQUEST_URI'];
        $route = 'media';

        $isRouteValidate = ! IS_AJAX_REQUEST ? checkAdminRouteValidate( $url, $route, $this->routeLevel, $this->maxLevel ) :
                                               checkAdminRouteValidate( $url, $route, $this->routeLevel, $this->maxLevel + 1 );

        if ( ! $isRouteValidate ) show_404();

        if ( IS_AJAX_REQUEST ) :

            require_once MEDIA_ADMIN_DIR_PATH . 'media.php';

            $mediaPage = new MediaPage();

            $path = getUrlLastPath( $url );

            switch ( $path ) :

                case 'get_files_list' :

                    $mediaPage->get_files_list();

                break;

                case 'upload' :

                    $mediaPage->upload();
                
                break;

                case 'remove_files' :

                    $mediaPage->remove_files();
                
                break;

                case 'get_folders' :

                    $mediaPage->get_folders();
                
                break;

                case 'remove_folder' :

                    $mediaPage->remove_folder();
                
                break;

                case 'update_dir_structures' :

                    $mediaPage->update_dir_structures();
                
                break;

                default: 

                    show_404();

                break;

            endswitch;

            die();

        endif;

        $this->load->template_view('template_master');

    }

    public function users() {

        require_once LIBRARIES_DIR_PATH . 'libUrls.php';
        //require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $url = $_SERVER['REQUEST_URI'];
        $routes = array('profile', 'all_users', 'new_user');

        $isRouteValidate = ! IS_AJAX_REQUEST ? checkAdminRouteValidate( $url, $routes, ++$this->routeLevel, ++$this->maxLevel ) :
                                                checkAdminRouteValidate( $url, 'users', $this->routeLevel, ++$this->maxLevel );

        if ( ! $isRouteValidate ) show_404();

        if ( IS_AJAX_REQUEST ) :  

            require_once USERS_ADMIN_DIR_PATH . 'users.php';

            $usersPage = new UsersPage();          

            $path = getUrlLastPath( $url );

            switch ( $path ) :

                case "getuserinfo" :

                    $usersPage->get_user_info();

                break;

                case "get_user_roles_list" :

                    $usersPage->get_user_roles_list();                    
                
                break;

                case "create_new_profile" :

                    $usersPage->create_new_profile();

                break;

                case "update_profile" :

                    $usersPage->update_profile();

                break;

                case "get_profile_avatars" :

                    $usersPage->get_profile_avatars();

                break;

                case "get_deactive_users" :

                    $usersPage->get_deactive_users();

                break;

                case "upload_avatar" :

                    $usersPage->upload_avatar();

                break;

                case "update_password" :
                    
                    $usersPage->update_password();
                
                break;

                case "get_active_users" :

                    $usersPage->get_active_users();

                break;

                case "remove_active_user" :
                    
                    $usersPage->remove_active_user();

                break;

                case "restore_deactive_user" :
                    
                    $usersPage->restore_deactive_user();

                break;
                
                default :

                    show_404();

                break;

            endswitch;

            die();

        endif;

        $this->load->template_view('template_master');

    }

    public function configuration() {

        require_once LIBRARIES_DIR_PATH . 'libUrls.php';
        //require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $url = $_SERVER['REQUEST_URI'];
        $routes = array('post_types');

        $isRouteValidate = ! IS_AJAX_REQUEST ? checkAdminRouteValidate( $url, $routes, ++$this->routeLevel, ++$this->maxLevel ) :
                                                checkAdminRouteValidate( $url, 'configuration', $this->routeLevel, ++$this->maxLevel );

        if ( ! $isRouteValidate ) show_404();

        if ( IS_AJAX_REQUEST ) :

            require_once CONFIG_ADMIN_DIR_PATH . 'configuration.php';

            $configPage = new Configuration();

            $path = getUrlLastPath( $url );

            switch ( $path ) :

                case 'get_active_post_types_list' :

                    $result = $configPage->getActivePostTypesList();                   
                   
                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );

                    endif;

                    callAjaxResponse($result);
                    
                    break;

                case 'get_deactive_post_types_list' :

                    $result = $configPage->getDeActivePostTypesList();                   
                   
                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );

                    endif;

                    callAjaxResponse($result);

                    break;

                case 'create_new_post_type' :

                    $result = $configPage->createNewPostType();

                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );


                    endif;

                    callAjaxResponseSuccess();

                    break;

                case 'update_post_type' :

                    $result = $configPage->updatePostType();

                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );


                    endif;

                    callAjaxResponseSuccess();

                    break;

                case 'remove_post_type' :

                    $result = $configPage->removePostType();

                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );


                    endif;

                    callAjaxResponseSuccess();

                    break;

                case 'restore_post_type' :

                    $result = $configPage->restorePostType();

                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );


                    endif;

                    callAjaxResponseSuccess();

                    break;                

                case 'remove_permantly_post_type' :

                    $result = $configPage->removePermantlyPostType();

                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );


                    endif;

                    callAjaxResponseSuccess();

                    break;
            
                default:
                    break;

            endswitch;

            die();

        endif;

        $this->load->template_view('template_master');

    }

    public function ap_type() {

        require_once LIBRARIES_DIR_PATH . 'libUrls.php';
        //require_once LIBRARIES_DIR_PATH . 'libMemberShip.php';
        require_once LIBRARIES_DIR_PATH . 'libAjaxResponse.php';

        $url = $_SERVER['REQUEST_URI'];
        $routes = array('postsList', 'newPost', 'categoriesList');

        $isRouteValidate = ! IS_AJAX_REQUEST ? checkAdminRouteValidate( $url, $routes, ++$this->routeLevel, ++$this->maxLevel ) :
                                                checkAdminRouteValidate( $url, 'ap_type', $this->routeLevel, ++$this->maxLevel );

        if ( ! $isRouteValidate ) show_404();

        if ( IS_AJAX_REQUEST ) :

            require_once APTYPE_ADMIN_DIR_PATH . 'advancedPostType.php';

            $aptypePage = new AdvancedPostType();

            $path = getUrlLastPath( $url );

            switch ( $path ) :

                case 'get_posts_list' :

                    $result = $aptypePage->getPostsList();                   
                   
                    if ( is_string( $result ) ) :

                        callAjaxResponse(

                            array(
                                'response' => 'error',
                                'message' => $result
                            )

                        );

                    endif;

                    callAjaxResponse($result);
                    
                    break;

                default:
                    break;

            endswitch;

            die();

        endif;

        $this->load->template_view('template_master');

    }

	public function index() {

        header( "Location: /admin/login" );

        die();

    }

    public function test() { 

    }
    
	
}