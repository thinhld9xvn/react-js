import axios from 'axios';

import {JSON_CONFIG_URL} from 'constants/urlConstants';

export async function getSidebarMenu() {

    let ajax_url = JSON_CONFIG_URL + 'sidebarMenu.config.json';

    return axios({

        method : "GET",
        url : ajax_url,
        responseType : "json"      

    });    

}