import axios from 'axios';
import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';

import {uploadAvatar} from 'utils/membershipUtils';

import { isUserProfilePage } from 'utils/UrlUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';
import { C_MODE_STATES } from 'constants/formConstants';

export function resetFormValidateState(form) {

    const formValidation = this.state[form],
          fieldsValidation = formValidation.fields,
          states = {};

    _.mapObject( fieldsValidation, function(e, i) {

        e.error = false;
        e.errorMessage = '';

    });

    formValidation.formValidate = true;

    states[form] = formValidation;

    this.setState(states);

}

export function onClick_ProfileEditMode(e) {

    e.preventDefault();

    changeFormToEditMode.call(this);

}

export function changeFormToViewMode(form) {  

    this.props.updateCurrentModeComponent( C_MODE_STATES.view );

    resetFormValidateState.call(this, form);

}

export function changeFormToEditMode() {    

    this.props.updateCurrentModeComponent( C_MODE_STATES.edit );

}

export function isFormEditMode() {

    const { currentModeComponent } = this.props;

    return currentModeComponent === C_MODE_STATES.edit;

}

export function changeFormToSavingMode() {   

    this.props.updateCurrentModeComponent( C_MODE_STATES.saving );

}

async function updateProfileToServer() {    

    let fd = new FormData();

    fd.append("profile", JSON.stringify( this.props._userProfile ) );

    return axios({

        method : "POST",
        url : ADMIN_AJAX_URLS.UPDATE_PROFILE_URL,
        responseType : "json",
        data : fd

    });

}

export function validateSubmittedProfileForm(id, form) {

    _.setUnFocusForm( document.getElementById(id) );

    let formValidate = this.state[form].formValidate        

    const selectedRoleId = this.selectedUserRole;

    if ( ! formValidate ) {

        modalUtils.showAlertDialog({

            title : 'Thông báo',
            message : 'Mời nhập đầy đủ các trường thông tin theo yêu cầu !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
    
        });

        return false;

    }

    if ( selectedRoleId === '' ) {
        
        modalUtils.showAlertDialog({

            title : 'Thông báo',
            message : 'Mời chọn một vai trò người dùng !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
    
        });

        return false;

    }

    return true;

}

export function onClick_ProfileEditSave(e) {   

    e.preventDefault(); 

    let self = this,        
        _userProfile = this.props._userProfile,
        formValidationName = 'userProfileFormValidate';
    
    const selectedRoleId = this.selectedUserRole,
          selectedUserRole = this.props.userRolesList.filter(e => parseInt( e['role_id'] ) === parseInt( selectedRoleId ) )[0];

    const validate = validateSubmittedProfileForm.call(this, 'frmUserProfile', formValidationName);

    if ( ! validate ) return false;

    changeFormToSavingMode.call(this);    

    _userProfile.display_name =  _userProfile.last_name + ' ' + _userProfile.first_name;

    _userProfile.role_id = selectedRoleId;
    _userProfile.role_name = selectedUserRole.role_name;

    this.props.updateUserProfile(_userProfile); 
    this.props.updateUser_Profile(_userProfile); 

    updateProfileToServer.call(this)
                         .then(response => {

        const data = response.data;

        if ( data.response == 'success' ) {

            changeFormToViewMode.call(self, formValidationName);

        }

        else {          
            
            modalUtils.showAlertDialog({

                title : 'Thông báo',
                message : data.message || 'Phát hiện lỗi trong quá trình update dữ liệu !',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {

                    changeFormToEditMode.call(self);

                }
        
            });

        }       

    });    

}

export function onChange_handleProfileText(e) {    

    let userProfile = this.props._userProfile,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    userProfile[field] = v;

    //this.setState({ userProfile });

    this.props.updateUser_Profile( userProfile );   

}

export function onChange_handleProfileNumber(e) {    

    let userProfile = this.props._userProfile,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    userProfile[field] = parseInt( v );

    //this.setState({ userProfile });

    this.props.updateUser_Profile( userProfile );   

}

export function onClick_showChooseAvatarDialog(e) {

    e.preventDefault();

    const { userAvatarsList, userProfile } = this.props;

    if ( isUserProfilePage() ) {

        const id = userAvatarsList.findIndex(v => v == userProfile.avatar );        

        if ( id !== -1 ) {            
            
            this.props.updateUserSelectedAvatar(id);                             

        }

    }      

    modalUtils.openPopboxModal('chooseAvatarModal');


}

export function onClick_closeChooseAvatarDialog(e) {

    e.preventDefault();

    modalUtils.closePopboxModal('chooseAvatarModal');


}

export function onClick_chooseAvatarInModal(e) {

    e.preventDefault();

    const id = parseInt( e.currentTarget.dataset.avatarId );

    this.props.updateUserSelectedAvatar( id );   

}

export function onClick_setUserAvatar(e) {

    e.preventDefault();
   
    const { userSelectedAvatar, userAvatarsList, userProfile } = this.props,
          avatar = userAvatarsList.find((v, i) => i == userSelectedAvatar );

    userProfile.avatar = avatar;

    this.props.updateUser_Profile(userProfile);
    this.props.updateUserAvatarTimeStamp(Date.now());

    //console.log(this.props.userProfile.avatar);

    onClick_closeChooseAvatarDialog(e);


}

export function init_CropAvatarModal() {

    this.setState({
        croppedImageUrl : null,
        blob : null,
        crop: {
            unit: "px",
            x : 0,
            y : 0,           
            width: 160,
            height: 200       
        }
        
    });

}

export function onClick_CloseCropAvatarModal(e) {

    e.preventDefault();

    init_CropAvatarModal.call(this);

    modalUtils.closePopboxModal('cropModal');

}

export function onClick_CropAvatar(e) {

    e.preventDefault();

    const blobImage = this.state.blob,
          { userProfile, editUserModalProps } = this.props;

    let username = '';

    if ( isUserProfilePage() ) {

        username = userProfile.username;

    }

    else {

        username = editUserModalProps.userProfile.username;

    }

    uploadAvatar.call(this, blobImage, username, () => {       

        modalUtils.closePopboxModal('cropModal');

        //popbox.open("profileModal");

    });

}

export function openCropModal(file) {    

    loadAvatarSrc.call(this, file);

    const t = setInterval(() => {

        if ( ! _.isUndefined( document.isLoadedAvatar ) ) {

            console.log( document.isLoadedAvatar );

            if ( document.isLoadedAvatar ) {               

                modalUtils.openPopboxModal("cropModal");

            }

            else {
                
                modalUtils.showAlertDialog({

                    title : 'Thông báo',
                    message : 'Kích thước ảnh không hợp lệ !!!',
                    icon : 'error',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {}
            
                });
            
            }

            clearInterval(t);

            delete document.isLoadedAvatar;

        }

    }, 200);    

}

function loadAvatarSrc(file) {

    const self = this, 
          {userAvatarSrc} = self.props;    

    const reader = new FileReader();

    reader.addEventListener("load", () => {

        var image = document.createElement("img");

        image.src = reader.result;

        image.onload = () => {

            if (image.width < 160 || image.height < 200) {                

                document.isLoadedAvatar = false;

            } 
            
            else {

                self.props.updateUserAvatarSrc(reader.result);

                document.isLoadedAvatar = true;

            }

        };

        //this.setState({ src: reader.result });
    });

    reader.readAsDataURL(file);

}

export function onClick_uploadOtherAvatar(e) {

    e.preventDefault();

    let el = document.createElement('input'),
        self = this;
    
    el.type = "file";
    el.accept="image/*";

    el.onchange = event => { 

        const file = event.target.files[0];

        self.setState({ is_ajax_loading : true });

        openCropModal.call(self, file);

        self.setState({ is_ajax_loading : false });
        
        //uploadAvatar.call(self, file);

    }

    el.click();

}