import axios from 'axios';

import {getParameterFromUrl} from './UrlUtils';

import {ADMIN_AJAX_URLS} from 'constants/urlConstants';

export async function getAllActivePostTypesList() {

    const url = ADMIN_AJAX_URLS.GET_ALL_ACTIVE_POST_TYPES_LIST;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function getDeActivePostTypesList() {

    const url = ADMIN_AJAX_URLS.GET_ALL_DEACTIVE_POST_TYPES_LIST;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function getAllActivePostsList() {

    const url = ADMIN_AJAX_URLS.GET_ALL_ACTIVE_POSTS_LIST;

    const fd = new FormData();

    fd.append('slugPostType', getParameterFromUrl(window.location.href, 'slug'))

    return axios({

        method : "POST",
        url : url,
        data : fd,
        responseType : 'json'

    });

}

export function getPostStatusCaption(status) {

   return status === 'public' ? 'Công khai' : 'Bản nháp';


}