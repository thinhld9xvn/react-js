import axios from 'axios';

import {ADMIN_AJAX_URLS} from 'constants/urlConstants';

export async function checkLogin() {    

    let ajax_check_login_url = ADMIN_AJAX_URLS.CHECK_LOGIN_URL;

    return axios({

        method : "POST",
        url : ajax_check_login_url,
        responseType : "json"      

    });

}

export async function logout() {

    let ajax_logout_url = ADMIN_AJAX_URLS.LOGOUT_URL;

    return axios({

        method : "POST",
        url : ajax_logout_url,
        responseType : "json"      

    });

}