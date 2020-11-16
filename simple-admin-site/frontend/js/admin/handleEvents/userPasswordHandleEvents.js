import axios from 'axios';

import * as _ from 'utils/libUtils';
import * as modalUtils from 'utils/modalUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';

export function onChange_handleFieldChanged(e) {

    let userPassword = this.state,
        v = e.currentTarget.value,
        field = e.currentTarget.dataset.field;

    userPassword[field] = v; 

    this.setState( userPassword ); 

}

export function onSubmit_handleForm(e) {

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

    const fd = new FormData();

    fd.append('old_password', oldPassword);
    fd.append('new_password', newPassword);

    axios({

        method : "POST",        
        url : ADMIN_AJAX_URLS.CHANGE_PASSWORD_URL,
        data : fd,
        responseType : "json"

    }).then(response => {

        const data = response.data,
              updateNewPassword = () => {

                const { userProfile } = self.props;

                userProfile.password = newPassword;

                self.props.updateUserProfile( userProfile );

              },
              successChangedPassword = () => {                

                modalUtils.showAlertDialog({

                    title : 'Thông báo',
                    message : 'Thay đổi mật khẩu thành công !!!',
                    icon : 'information',
                    ok_label : 'Đồng ý',
                    ok_callback : () => {
        
                        updateNewPassword();

                        resetForm.call(self);
        
                    }
            
                });                

              },
              
              failChangedPassword = () => {                
                        
                    modalUtils.showAlertDialog({

                        title : 'Thông báo',
                        message : data.message || 'Có lỗi xảy ra trong quá trình đổi mật khẩu !!!',
                        icon : 'error',
                        ok_label : 'Đồng ý',
                        ok_callback : () => {}
                
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

export function resetForm() {

    const userPassFormValidate = this.state.userPasswordFormValidate,
          oldPasswordField = userPassFormValidate.fields.oldPasswordField,
          newPasswordField = userPassFormValidate.fields.newPasswordField,

          resetFieldValidate = (field) => {

            field.error = false;
            field.errorMessage = '';

          },

          resetFormValidate = () => {

            userPassFormValidate.formValidate = false;

          };

    resetFieldValidate(oldPasswordField);
    resetFieldValidate(newPasswordField);

    resetFormValidate();

    this.setState({

        oldPassword : '',
        newPassword : '',
        userPassFormValidate

    });    

}