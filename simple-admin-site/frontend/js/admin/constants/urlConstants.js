const _ORIGINAL_URL = window.location.origin;

export const JSON_CONFIG_URL = _ORIGINAL_URL + '/json_config/';

export const FPROFILE_AVATAR_DIR_URL = _ORIGINAL_URL + '/frontend/avatar/';

export const LOGIN_URL = _ORIGINAL_URL + '/admin/login';

export const ADMIN_AJAX_URLS = {

    CHECK_LOGIN_URL : _ORIGINAL_URL + '/admin/login/checkLogin',
    LOGOUT_URL : _ORIGINAL_URL + '/admin/login/logout',
    LOGIN_URL : _ORIGINAL_URL + '/admin/login/callLogin',
    GET_USER_INFO_URL : _ORIGINAL_URL + '/admin/users/getuserinfo',
    GET_USER_ROLES_LIST_URL : _ORIGINAL_URL + '/admin/users/get_user_roles_list',
    GET_AVATARS_LIST_URL : _ORIGINAL_URL + '/admin/users/get_profile_avatars',    
    GET_ALL_ACTIVE_USERS : _ORIGINAL_URL + '/admin/users/get_active_users',
    GET_ALL_DEACTIVE_USERS : _ORIGINAL_URL + '/admin/users/get_deactive_users',
    REMOVE_ACTIVE_USER : _ORIGINAL_URL + '/admin/users/remove_active_user',
    RESTORE_DEACTIVE_USER : _ORIGINAL_URL + '/admin/users/restore_deactive_user',
    CREATE_NEW_USER_PROFILE_URL : _ORIGINAL_URL + '/admin/users/create_new_profile',
    UPDATE_PROFILE_URL : _ORIGINAL_URL + '/admin/users/update_profile',
    CHANGE_PASSWORD_URL : _ORIGINAL_URL + '/admin/users/update_password',
    UPLOAD_AVATAR_URL : _ORIGINAL_URL + '/admin/users/upload_avatar',
    GET_ALL_ACTIVE_POST_TYPES_LIST : _ORIGINAL_URL + '/admin/configuration/get_active_post_types_list',
    GET_ALL_DEACTIVE_POST_TYPES_LIST : _ORIGINAL_URL + '/admin/configuration/get_deactive_post_types_list',
    CREATE_NEW_POST_TYPE_URL : _ORIGINAL_URL + '/admin/configuration/create_new_post_type',
    UPDATE_POST_TYPE_URL : _ORIGINAL_URL + '/admin/configuration/update_post_type',
    REMOVE_POST_TYPE_URL : _ORIGINAL_URL + '/admin/configuration/remove_post_type',
    RESTORE_POST_TYPE_URL : _ORIGINAL_URL + '/admin/configuration/restore_post_type',
    REMOVE_PERMANTLY_POST_TYPE_URL : _ORIGINAL_URL + '/admin/configuration/remove_permantly_post_type',
    GET_ALL_ACTIVE_POSTS_LIST : _ORIGINAL_URL + '/admin/ap_type/get_posts_list',
};