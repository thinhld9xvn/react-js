import axios from 'axios';

import * as _ from 'utils/libUtils';

import * as modalUtils from 'utils/modalUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';

import {resetForm} from './userPasswordHandleEvents';

import {isFormEditMode, 
        changeFormToViewMode, 
        changeFormToEditMode, 
        changeFormToSavingMode, 
        validateSubmittedProfileForm,
        onChange_handleProfileText as _onChange_handleProfileText,
        onChange_handleProfileNumber as _onChange_handleProfileNumber} from './userProfileHandleEvents';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

async function updateProfileToServer() {    

    let fd = new FormData();

    //fd.append("profile", JSON.stringify( this.props.editUserModalProps.userProfile ) );
    fd.append("profile", JSON.stringify( this.props._userProfile ) );

    return axios({

        method : "POST",
        url : ADMIN_AJAX_URLS.UPDATE_PROFILE_URL,
        responseType : "json",
        data : fd

    });

}

async function removeProfileOnServer(uid) {

    let fd = new FormData();

    //fd.append("profile", JSON.stringify( this.props.editUserModalProps.userProfile ) );
    fd.append("uid", uid );

    return axios({

        method : "POST",
        url : ADMIN_AJAX_URLS.REMOVE_ACTIVE_USER,
        responseType : "json",
        data : fd

    });

}

async function restoreProfileOnServer(uid) {

    let fd = new FormData();

    //fd.append("profile", JSON.stringify( this.props.editUserModalProps.userProfile ) );
    fd.append("uid", uid );

    return axios({

        method : "POST",
        url : ADMIN_AJAX_URLS.RESTORE_DEACTIVE_USER,
        responseType : "json",
        data : fd

    });

}

function resetUserPassFormState() {

    const { userPasswordFormValidate } = this.state,
      fieldsValidation = userPasswordFormValidate.fields;          

    _.mapObject( fieldsValidation, function(e, i) {

        e.error = false;
        e.errorMessage = '';

    });

    userPasswordFormValidate.formValidate = true;       

    this.setState({
        userPasswordFormValidate
    });

}

function removeUserCallback(uids) {

    const self = this;

    let { usersList, deactiveUsersList } = this.props,
        filteredItems = [...this.state.filteredItems];

    _.showLoadingOverlay();

    uids.forEach(uid => {

        const id = usersList.findIndex(v => v.id === uid ),
              _id = filteredItems.findIndex(v => v.id === uid );

        if ( _id !== -1 ) {

            filteredItems.splice(_id, 1);

            self.setState({
               
                filteredItems : [...filteredItems]
                
            });

        } 

        if ( id !== -1 ) {            

            const user = usersList.splice(id, 1);

            deactiveUsersList = deactiveUsersList.concat( user );

            self.props.updateUsersList(usersList);
            self.props.updateDeactiveUsersList(deactiveUsersList);            

            self.setState({

                data : [...usersList]

                
            });

            removeProfileOnServer.call(self, uid)
                                 .then((response) => {

                const data = response.data;

                if ( data.response === 'success' ) {

                    document.querySelector('.btnTrashAll')
                            .classList.add('disabled');

                }

                else {

                    modalUtils.showAlertDialog({

                        title : 'Thông báo',
                        message : data.message || 'Phát hiện lỗi trong quá trình xóa user, xin mời thử lại sau !!!',
                        icon : 'error',
                        ok_label : 'Đồng ý',
                        ok_callback : () => {}
                
                    });               

                }

            });
            
        }         

    });

    _.closeLoadingOverlay();

}

function restoreUserCallback(uids) {

    const self = this;

    let { usersList, deactiveUsersList } = this.props,
        filteredItems = [...this.state.filteredItems];

    _.showLoadingOverlay();

    uids.forEach(uid => {

        _.showLoadingOverlay();

        const id = deactiveUsersList.findIndex(v => v.id === uid ),
            _id = filteredItems.findIndex(v => v.id === uid );

        if ( _id !== -1 ) {

            filteredItems.splice(_id, 1);

            self.setState({
                
                filteredItems : [...filteredItems]
                
            });

        } 

        if ( id !== -1 ) {
            
            filteredItems.splice(id, 1); 

            const user = deactiveUsersList.splice(id, 1);                
            usersList = usersList.concat( user );  
        
            self.props.updateDeactiveUsersList(deactiveUsersList);
            self.props.updateUsersList(usersList);

            self.setState({

                data : [...deactiveUsersList],
                filteredItems : [...filteredItems]
                
            });

            restoreProfileOnServer.call(self, uid)
                                .then((response) => {

                                    const data = response.data;

                                    if ( data.response === 'success' ) {

                                        document.querySelector('.btnRestoreAll')
                                                .classList.add('disabled');

                                    }

                                    else {

                                        modalUtils.showAlertDialog({

                                            title : 'Thông báo',
                                            message : data.message || 'Phát hiện lỗi trong quá trình khôi phục user, xin mời thử lại sau !!!',
                                            icon : 'error',
                                            ok_label : 'Đồng ý',
                                            ok_callback : () => {}
                                    
                                        });     

                                    }

                                });           

        }

    });

    _.closeLoadingOverlay();

}

export function onClick_editUser(e) {

    e.preventDefault();    

    const uid = e.currentTarget.dataset.uid,
          { usersList, userAvatarsList, editUserModalProps } = this.props,
          userProfile = usersList.find(u => u['id'] == uid),

        id = userAvatarsList.findIndex(v => userProfile && v == userProfile.avatar);

    if ( id !== -1 ) {

        this.props.updateUserSelectedAvatar(id);

    }    

    editUserModalProps.userProfile = userProfile;

    this.props.updateEditUserModalProps(editUserModalProps);

    this.props.updateUser_Profile(userProfile);

    if ( isFormEditMode.call(this) ) {
        
        changeFormToViewMode.call(document.profileRef, 'userProfileFormValidate');

    }    

    //console.log( userProfile );

    modalUtils.openPopboxModal('editUserModal');

}

export function onClick_removeUser(e) {

    e.preventDefault();

    const self = this,
          uid = e.currentTarget.dataset.uid;   

    modalUtils.showConfirmDialog({

        title : 'Thông báo',
        message : 'Bạn có chắc muốn thực hiện thao tác này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {
           
            removeUserCallback.call(self, [uid]);


        },
        no_callback : () => {}

    });

}

export function onClick_restoreDeactiveUser(e) {

    e.preventDefault();

    const self = this,
          uid = e.currentTarget.dataset.uid;

    modalUtils.showConfirmDialog({

        title : 'Thông báo',
        message : 'Bạn có chắc muốn khôi phục thành viên này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {

            restoreUserCallback.call(self, [uid]);

        },
        no_callback : () => {}

    });

}

export function onChange_handleProfileText(e) {  

    _onChange_handleProfileText.call(this, e);

    /*const { editUserModalProps } = this.props;

    let userProfile = editUserModalProps.userProfile,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    userProfile[field] = v; 

    editUserModalProps.userProfile = userProfile;

    this.props.updateEditUserModalProps( editUserModalProps );*/   

}

export function onChange_handleProfileNumber(e) { 
    
    _onChange_handleProfileNumber.call(this, e);

    /*let userProfile = this.props.editUserModalProps.userProfile,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    userProfile[field] = parseInt( v );

    editUserModalProps.userProfile = userProfile;

    this.props.updateEditUserModalProps( userProfile ); */  

}

export function onClick_showChooseAvatarDialog(e) {

    e.preventDefault(); 
    
    modalUtils.openPopboxModal('chooseAvatarModal');

}

export function onClick_ProfileEditMode(e) {

    e.preventDefault();

    changeFormToEditMode.call(this);

}

export function onClick_ProfileEditSave(e) {   

    e.preventDefault();    

    let self = this,               

        userProfile = this.props._userProfile, // userProfile editting
        _userProfile = this.props.userProfile, // original userProfile

        { usersList } = this.props,
        userListIndex = usersList.findIndex(v => v.id == userProfile.id),

        formValidationName = 'userProfileFormValidate';

    const selectedRoleId = this.selectedUserRole,
          selectedUserRole = this.props.userRolesList.filter(e => parseInt( e['role_id'] ) === parseInt( selectedRoleId ) )[0];    

    const activeUsersListInst = document.activeUsersListRef,
          filteredItems = [...activeUsersListInst.state.filteredItems],
          filteredItemIndex = filteredItems.findIndex(user => user.username === userProfile.username);

    const validate = validateSubmittedProfileForm.call(this, 'frmEditUserForm', formValidationName);

    if ( ! validate ) return false;

    changeFormToSavingMode.call(this);          

    userProfile.role_id = selectedRoleId;
    userProfile.role_name = selectedUserRole.role_name;            

    userProfile.display_name =  userProfile.last_name + ' ' + userProfile.first_name;     
    
    this.props.updateUser_Profile(userProfile); 

    usersList[userListIndex] = JSON.parse( JSON.stringify( userProfile ) );

    filteredItems[filteredItemIndex] = JSON.parse( JSON.stringify( userProfile ) );
    
    // kiem tra userProfile.id === _userProfile.id => update user profile equal active user profile
    if ( _userProfile.username === userProfile.username ) {

        this.props.updateUserProfile( userProfile );

    }    

    //console.log( usersList[userListIndex] );

    this.props.updateUsersList( usersList );    

   activeUsersListInst.setState({

       data : [...usersList],
       filteredItems : [...filteredItems]

   });

    updateProfileToServer.call(this)
                         .then(response => {

        const data = response.data;

        if ( data.response == 'success' ) {

            changeFormToViewMode.call(self, formValidationName);

        }

        else {         

            modalUtils.showAlertDialog({

                title : 'Thông báo',
                message : data.message || 'Phát hiện lỗi trong quá trình cập nhật user, xin mời thử lại sau !',
                icon : 'error',
                ok_label : 'Đồng ý',
                ok_callback : () => {

                    changeFormToEditMode.call(self);

                }
        
            });            

        }       

    });

}

export function onClick_CloseEditUserModal(e) {

    e.preventDefault();    

    modalUtils.closePopboxModal('editUserModal');
}

export function onClick_closeChooseAvatarDialog(e) {

    e.preventDefault();

    modalUtils.closePopboxModal('chooseAvatarModal');

}

export function onClick_setUserAvatar(e) {

    e.preventDefault();
   
    const { userSelectedAvatar, userAvatarsList, _userProfile } = this.props,
          avatar = userAvatarsList.find((v, i) => i == userSelectedAvatar );

    //editUserModalProps.userProfile.avatar = avatar;
    //editUserModalProps.userProfile.avatarImgSrc = editUserModalProps.userProfile.avatarDirPath + avatar;

    _userProfile.avatar = avatar;
    _userProfile.avatarImgSrc = _userProfile.avatarDirPath + avatar;

    //this.props.updateEditUserModalProps(editUserModalProps);
    this.props.updateUser_Profile(_userProfile);
    this.props.updateUserAvatarTimeStamp(Date.now());

    onClick_closeChooseAvatarDialog(e);

}

export function onSubmit_handleUserPasswordForm(e) {    

    e.preventDefault();       

    const self = this; 

    _.setUnFocusForm( document.getElementById('frmUserPassword') );    

    if ( ! this.state.userPasswordFormValidate.formValidate ) {
        
        modalUtils.showAlertDialog({

            title : 'Thông báo',
            message : 'Mời nhập đầy đủ thông tin các trường theo yêu cầu !',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {}
    
        });

        return false;

    }

    const oldPassword = this.state.oldPassword,
          newPassword = this.state.newPassword;

    // nhap khong dung mat khau cu
    if ( oldPassword !== this.props.userProfile.password ) {

        modalUtils.showAlertDialog({

            title : 'Thông báo',
            message : 'Mật khẩu cũ không chính xác !!!',
            icon : 'error',
            ok_label : 'Đồng ý',
            ok_callback : () => {

                document.getElementById('txtOldPassword').focus();

                resetForm.call(self);

            }
    
        });

        return false;

    }

    const { userProfile, editUserModalProps, usersList } = self.props,                
          userListIndex = usersList.findIndex(v => v.id == userProfile.id),
          updateNewPassword = () => {                

                editUserModalProps.userProfile.password = newPassword;

                //console.log( 'active password : ' + activeUserProfile.password );

                // update users list
                usersList[userListIndex] = JSON.parse( JSON.stringify( editUserModalProps.userProfile ) );
                this.props.updateUsersList( usersList );

                //console.log(usersList);

                // update user profile
                if ( editUserModalProps.userProfile.username === userProfile.username ) {

                    self.props.updateUserProfile( editUserModalProps.userProfile );
                }

                //console.log(self.props.userProfile);

                
            };

    updateNewPassword();

    const fd = new FormData();

    fd.append('old_password', oldPassword);
    fd.append('new_password', newPassword);
    fd.append('username', editUserModalProps.userProfile.username);

    axios({

        method : "POST",
        url : ADMIN_AJAX_URLS.CHANGE_PASSWORD_URL,
        data : fd,
        responseType : "json"

    }).then(response => {

        const data = response.data,              
              successChangedPassword = () => {
                
                modalUtils.showAlertDialog({

                    title : 'Thông báo',
                    message : 'Thay đổi mật khẩu thành công !!!',
                    icon : 'information',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {

                        resetForm.call(self);
                        
                    }
            
                }); 

              },              
              failChangedPassword = () => {
                
                modalUtils.showAlertDialog({

                    title : 'Thông báo',
                    message : data.message || 'Có lỗi xảy ra trong quá trình đổi mật khẩu, xin thử lại sau !!!',
                    icon : 'error',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {

                        resetForm.call(self);

                    }
            
                });                

              };             

        if ( data.response === 'success' ) {

            successChangedPassword();

        }

        else {

            failChangedPassword();

        }

    });

    resetForm.call(this);    

} 

export function onClick_showChangePassModal(e) {

    e.preventDefault();
    
    if ( document.changeUserPassRef ) {
        resetUserPassFormState.call(document.changeUserPassRef);
    }

    modalUtils.openPopboxModal('changePasswordModal');

}

/*export function onChange_txtSearchUserNameChanged(e) {    

    const v = e.currentTarget.value;

    let {usersList} = this.props,
        {filteredItems} = this.state;
        
    filteredItems = usersList.filter(user => user.username.toLowerCase().indexOf( v.toLowerCase() ) !== -1 );

    this.setState({
        searchUserNameKey : v,
        filteredItems,
        isFilterTyping : true
    });

}*/

export function onKeyDown_txtSearchUserNameChanged(e) {    

    const keyCode = e.keyCode || e.which;

    if ( keyCode === 13 ) {

        const v = document.querySelector('.tab-pane.active .searchUserNameKey').value,
              { data } = this.state,            
              filteredItems = data.filter(user => user.username.toLowerCase().includes( v.toLowerCase() ) );

        this.setState({
          
            filteredItems : [...filteredItems]

        });

    }        

}

export function onClick_clearSearchUserNameFilter(e) {

    e.preventDefault();

    document.querySelector('.tab-pane.active .searchUserNameKey').value = '';

    this.setState((prevState) => ({
        filteredItems : [...prevState.data]
    }));     

}

export function onClick_zoomIn() { 

    const { zoom } = this.state,
          _zoom = zoom + 0.1;

    this.setState({
        zoom : _zoom
    });  
   
    tabListsEvents.windowResizeEvent();

}

export function onClick_zoomOut() {

    const { zoom } = this.state,
          _zoom = zoom - 0.1;

    this.setState({
        zoom : _zoom
    });    

    tabListsEvents.windowResizeEvent();

}

export function onClick_zoomReset() {         
    
    this.setState({

        zoom : 1

    });    

    tabListsEvents.windowResizeEvent();
  
}

export function onClick_toggleTabFullScreen() {

    this.setState((prevState) => ({

        isFullScreen : ! prevState.isFullScreen,
        zoom : 1

    }));    

    setTimeout(() => {

        tabListsEvents.windowResizeEvent();

    }, 200);

}

export function onClick_refreshUsersListData(e) {

    e.preventDefault();

    this.componentDidMount();

}

export function onClick_trashAllUsersListData(e) {

    e.preventDefault();

    const self = this, 
         { usersListIdSelected } = this.state;

    usersListIdSelected && usersListIdSelected.length > 0 && modalUtils.showConfirmDialog({

        title : 'Thông báo',
        message : 'Bạn có chắc muốn thực hiện thao tác này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {           
           
            removeUserCallback.call(self, usersListIdSelected);


        },
        no_callback : () => {}

    });

}

export function onClick_restoreAllUsersListData(e) {

    e.preventDefault();

    const self = this, 
         { usersListIdSelected } = this.state;

    usersListIdSelected && usersListIdSelected.length > 0 && modalUtils.showConfirmDialog({

        title : 'Thông báo',
        message : 'Bạn có chắc muốn thực hiện thao tác này không ?',        
        yes_label : 'Đồng ý',
        no_label : 'Hủy bỏ',
        yes_callback : () => {           
           
            restoreUserCallback.call(self, usersListIdSelected);


        },
        no_callback : () => {}

    });

}