import axios from 'axios';
import {getParameterFromUrl} from 'utils/UrlUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';

import * as modalUtils from 'utils/modalUtils';

function checkFormValidation() {

    let targetFields = this.state.loginFormValidation.fields,
        keys = Object.keys(targetFields),
        length = keys.length;

    for ( let i = 0; i < length; i++ ) {

        let field = targetFields[keys[i]];

        if ( field.error ) return false;

    }

    return true;

}

export function onClick_toggleStateForm(e) {

    e.preventDefault();

    let showLoginForm = ! this.state.showLoginForm;

    this.setState({
        showLoginForm : showLoginForm
    });

}

export function onChange_handleChangedValue(e) {

    const v = e.currentTarget.value,          
          fieldName = e.currentTarget.dataset.fieldname,
          formFields = this.state.formFields;

    formFields[fieldName] = v;

    this.setState({

        formFields : formFields

    });

}

export function onBlur_handleValidate(e) {

    const v = e.currentTarget.value.trim(),
          fieldName = e.currentTarget.dataset.fieldname,

          formValidation = this.state.loginFormValidation,
          
          formFields = formValidation.fields,
          targetField = formFields[fieldName],
          
          errorMessages = formValidation.errorMessages;          

    if ( v == '' ) {

        targetField.error = true;
        targetField.error_message = errorMessages.requiredError;

    }

    else {

        targetField.error = false;
        targetField.error_message = '';

    }

    formValidation.formValidation = checkFormValidation.call(this);

    this.setState({

        loginFormValidation : formValidation

    });

}

export function onSubmit_login(e) {

    e.preventDefault();

    const self = this;

    document.getElementById('txtUserName').blur();
    document.getElementById('txtUserPassword').blur();

    setTimeout(() => {}, 100);

    if ( ! self.state.loginFormValidation.formValidation ) {

        alert('Mời nhập đầy đủ thông tin đăng nhập !');

        return false;

    }

    let fd = new FormData(),

        ajax_login_url = ADMIN_AJAX_URLS.LOGIN_URL,
        
        formFields = self.state.formFields,

        username = formFields.username,
        password = formFields.password;        
    
    fd.append("username", username);
    fd.append("password", password);

    axios({

        method : "POST",
        url : ajax_login_url,
        responseType : "json",
        data : fd

    }).then(response => {

        const data = response.data,
              redirect_url = getParameterFromUrl(window.location.href, "redirect_url"),

              resetLoginFormFields = () => {

                formFields.username = formFields.password = '';  

                self.setState({

                    formFields : formFields

                });

                document.getElementById('txtUserName').focus();

              },

              handleSuccessLogin = () => {

                resetLoginFormFields();

                window.location.href = redirect_url;

              },

              handleFailedLogin = () => {

                    modalUtils.showAlertDialog({

                        title : 'Thông báo',
                        message : data.message || 'Username hoặc mật khẩu không đúng !!! Mời nhập lại.',
                        icon : 'error',
                        ok_label : 'Đồng ý',
                        ok_callback : () => {

                            resetLoginFormFields();

                        }
                
                    });                   
                    

              };

        // đăng nhập thành công
        if ( data.response == 'success' ) {

            handleSuccessLogin();

        }

        else {

            handleFailedLogin();

        }

    });

}