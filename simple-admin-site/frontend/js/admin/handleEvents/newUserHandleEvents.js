import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';

import {onClick_closeChooseAvatarDialog} from './usersListHandleEvents';
import {validateSubmittedProfileForm} from './userProfileHandleEvents';

import axios from 'axios';

export function onClick_setUserAvatar(e) {

    e.preventDefault();

    const { userSelectedAvatar } = this.props;
    
    this.props.updateNewUserSelectedAvatar( userSelectedAvatar );
    this.props.updateUserAvatarTimeStamp( Date.now() );

    onClick_closeChooseAvatarDialog(e);

}

export function onClick_CropAvatar(e) {

    e.preventDefault();

    const { userAvatarsList } = this.props,
          { blob, croppedImageUrl } = this.state,

          length = userAvatarsList.length - 1,

          checkIsAvatarDefault = () => {

            const avatar_name = userAvatarsList[length].split('.'),
                  n = parseInt( avatar_name );

            return ! isNaN(n) && n > 0;

          }

    document.cropAvatarRef = {

        blobImage : blob

    };
    
    if ( ! checkIsAvatarDefault() ) {
        
        userAvatarsList.splice(length, 1);

    }

    userAvatarsList.push( croppedImageUrl );    

    //console.log(index);

    this.props.updateUserAvatarsList(userAvatarsList);

    index = userAvatarsList.length - 1;
    this.props.updateUserSelectedAvatar(index);    

    this.props.updateUserAvatarTimeStamp(Date.now());

    this.props.updateUserAvatarLoading(false);      
    
    modalUtils.closePopboxModal('cropModal');

}

export function onClick_chooseAvatarInModal(e) {

    e.preventDefault();

    const id = parseInt( e.currentTarget.dataset.avatarId );

    this.props.updateUserSelectedAvatar( id );

}

export function onChange_handleProfileText(e) {    

    let { formFields } = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    formFields[field] = v; 

    this.setState({ formFields });

}

export function onChange_handleProfileNumber(e) {    

    let { formFields } = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    formFields[field] = parseInt( v ); 

    this.setState({ formFields });

}

export function onSubmit_handleCreateNewUserForm(e) {

    e.preventDefault();

    const self = this,         
          { formFields } = this.state,
          ajax_url = ADMIN_AJAX_URLS.CREATE_NEW_USER_PROFILE_URL;   

    const selectedRoleId = this.selectedUserRole,
          selectedUserRole = this.props.userRolesList.filter(e => parseInt( e['role_id'] ) === parseInt( selectedRoleId ) )[0];
    
    const validate = validateSubmittedProfileForm.call(this, 'frmNewUserProfile', 'newUserProfileFormValidate');

    if ( ! validate ) return false;

    this.setState({ is_ajax_saving : true });

    formFields.role_id = selectedRoleId;
    formFields.role_name = selectedUserRole.role_name;     

    const fd = new FormData(); 

    fd.append('formFields', JSON.stringify( formFields ) );

    if ( document.cropAvatarRef && document.cropAvatarRef.blobImage ) {

        fd.append('blobAvatarImage', document.cropAvatarRef.blobImage);

    }

    axios({

        method : "POST",
        url : ajax_url,
        data : fd,
        responseType : "json"

    }).then(response => {

        const data = response.data;

        if ( data.response === 'error' ) {

            modalUtils.showAlertDialog({

                title : 'Thông báo',
                message : data.message || "Phát hiện lỗi khi tạo user, mời thử lại !!!",
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {}
        
            });            

        }

        else {

            modalUtils.showAlertDialog({

                title : 'Thông báo',
                message : 'Tạo user thành công !!!',
                icon : 'information',
                ok_label : 'Đồng ý',
                ok_callback : () => {

                    reloadForm.call(self);

                }
        
            });    

        }

        _.scrollPageToTop();

        this.setState({ is_ajax_saving : false });

    });



}

export function reloadForm(e) {    

    e.preventDefault();

    const { _formFields, newUserProfileFormValidate } = this.state,
          formFields = JSON.parse( JSON.stringify( _formFields ) ); 
          
    _.mapObject(newUserProfileFormValidate.fields, function(e, i) {

        e.error = false;
        e.errorMessage = '';

    });

    newUserProfileFormValidate.formValidate = true;

    this.setState({

        formFields,
        newUserProfileFormValidate

    }); 

    _.scrollPageToTop();   

}