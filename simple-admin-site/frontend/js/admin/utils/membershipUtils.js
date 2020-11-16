import axios from 'axios';

import {ADMIN_AJAX_URLS} from 'constants/urlConstants';

export async function getUserInfo() {

    const url = ADMIN_AJAX_URLS.GET_USER_INFO_URL;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function getUserRolesList() {

    const url = ADMIN_AJAX_URLS.GET_USER_ROLES_LIST_URL;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function getUserAvatarsList() {

    const url = ADMIN_AJAX_URLS.GET_AVATARS_LIST_URL;

    //console.log( url );

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function uploadAvatar(blobImage, username, callback) {

    const self = this,
          { userAvatarsList } = self.props,
          userAvatarPath = username + '/',

        do_upload = async function() {

            var fd = new FormData();

            //if (window.FileReader) {

                //reader = new FileReader();
                //reader.readAsDataURL(file);

                fd.append("avatar", blobImage);
                fd.append("newAvatarName", "avatar.jpg");
                fd.append("username", username);

                let result = await axios({

                    method: "POST",
                    url: ADMIN_AJAX_URLS.UPLOAD_AVATAR_URL,
                    data: fd

                });

                return result.data;
            //}
        };

    do_upload().then(data => {

        let avatar_data = userAvatarPath + data,
            index = userAvatarsList.findIndex(v => v === avatar_data );

        // founded
        if ( index !== -1 ) {

            userAvatarsList.splice(index, 1);

        }

        userAvatarsList.push( avatar_data );

        index = userAvatarsList.length - 1;

        //console.log(index);

        self.props.updateUserAvatarsList(userAvatarsList);
        self.props.updateUserSelectedAvatar(index);

        self.props.updateUserAvatarTimeStamp(Date.now());

        self.props.updateUserAvatarLoading(false);

        //self.forceUpdate();

        callback();

    });

}

export async function getAllActiveUsers() {

    const url = ADMIN_AJAX_URLS.GET_ALL_ACTIVE_USERS;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}

export async function getAllDeActiveUsers() {

    const url = ADMIN_AJAX_URLS.GET_ALL_DEACTIVE_USERS;

    return axios({

        method : "POST",
        url : url,
        responseType : 'json'

    });

}