import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {isUndefined} from 'utils/libUtils';

import {FPROFILE_AVATAR_DIR_URL} from 'constants/urlConstants';

import {handleFormValidation} from 'handleValidate/handleFormValidate';

import {onClick_showChooseAvatarDialog} from 'handleEvents/usersListHandleEvents';
import {onChange_handleProfileText, onChange_handleProfileNumber, onSubmit_handleCreateNewUserForm, reloadForm} from 'handleEvents/newUserHandleEvents';

import CustomSelect from 'modules/custom-select/customSelect';

class TabNewProfile extends Component {

    constructor(props) {

        super(props);      
        
        const formFields = {

            username : '',
            password : '',
            retypePassword : '',
            email : '',
            first_name : '',
            last_name : '',
            location : '',
            website : '',
            age : 20,
            about_me : '',
            role_id : 1,
            role_name : '',
            avatar : '01.png'              

        };

        this.state = {
            
            newUserProfileFormValidate : {
                
                errorMessages : {

                    requiredError : "Trường này không được bỏ trắng",
                    minLengthError : "Trường này phải có tối thiểu là {n} ký tự",
                    maxLengthError : "Trường này có tối đa là {n} ký tự",
                    requireNotSpecialCharError : "Trường này chỉ chấp nhận chữ, số và (_)",
                    notUrlError : "Trường này phải là một URL hợp lệ",
                    notOnlyEmail : "Trường này phải là một địa chỉ email hợp lệ",
                    notDuplicatePasswordError : "Mật khẩu mới không được trùng với mật khẩu cũ",
                    notMatchPasswordError : "Mật khẩu xác nhận phải trùng với mật khẩu đã nhập",                    
                    adminPasswordError : "Mật khẩu không được đặt là admin",
                    requiredSpecialCharPasswordError : "Mật khẩu phải chứa chữ, số và ký tự đặc biệt"

                },

                fields : {

                    usernameField : {

                        error : false,
                        errorMessage : ''
    
                    },
                    first_nameField : {

                        error : false,
                        errorMessage : ''
    
                    },
                    last_nameField : {
    
                        error : false,
                        errorMessage : ''
    
                    },
                    locationField : {
    
                        error : false,
                        errorMessage : ''
    
                    },
                    websiteField : {
    
                        error : false,
                        errorMessage : ''
    
                    },
                    ageField : {
    
                        error : false,
                        errorMessage : ''
    
                    },
                    emailField : {

                        error : false,
                        errorMessage : ''
    
                    },
                    retypePasswordField : {

                        error : false,
                        errorMessage : ''
    
                    },
                    passwordField : {

                        error : false,
                        errorMessage : ''
    
                    },

                },               

                formValidate : false
                
            },

            formFields : JSON.parse( JSON.stringify( formFields ) ),
            _formFields : JSON.parse( JSON.stringify( formFields ) ),

            is_ajax_saving : false

        }

        this.selectedUserRole = '';

    }

    componentDidMount() {               

        this.props.updateUserSelectedAvatar(0);

    }    

    render() {

        const {  userRolesList, newUserSelectedAvatar, userAvatarsList, userAvatarTimeStamp } = this.props,
              { formFields, is_ajax_saving } = this.state;        
        
        const userRolesListData = [];

        userRolesList.map(e => {

            const data = {

                name : e['role_name'],
                value : e['role_id'],
                selected : false

            };

            userRolesListData.push( data );

        });

        let avatar = userAvatarsList.find((v, i) => i == newUserSelectedAvatar ); 

        avatar = isUndefined(avatar) ? this.state.formFields.avatar : avatar;

        if ( ! avatar.startsWith('blob:') ) {

            avatar = FPROFILE_AVATAR_DIR_URL.concat(avatar, `?t=${userAvatarTimeStamp}`);

        }               

        return (

            <div className="myTabContainer">
            
                <form id="frmNewUserProfile" 
                      method="post" 
                      action="" 
                      className={is_ajax_saving ? "disabled" : ""}>

                    <div className="mainHeader"></div>

                    <div className="mainContent">
                    
                        <div className="rowFluid">

                            <div className="col-xs-12 col-sm-3 center">

                                <div id="profile-avatar" className="profile-avatar">
                                    <a className="profile-picture ">
                                        <img id="profile-img" 
                                            className="editable img-responsive" 
                                            src={avatar} />
                                    </a>
                                </div>

                                <div id="profile-edit" className="profile-edit">
                                    <a id="btnProfileEdit" 
                                        href="#" 
                                        className="btn btn-sm btn-block btn-danger"
                                        onClick={onClick_showChooseAvatarDialog.bind(this)}>
                                        <i className="fa fa-image mg-right5"></i>
                                        <span className="bigger-110">Thay đổi avatar</span>
                                    </a>
                                </div>                           
                            
                            </div>                    
                        
                            <div className="col-xs-12 col-sm-9">
                                <div className="profile-user-info">
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Tên thành viên
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserName" 
                                                    className="form-control" 
                                                    data-field="username"                                                    
                                                    data-field-min-length="5"
                                                    data-field-max-length="20"
                                                    data-field-notspecialchar="true"
                                                    value={formFields.username}
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')} />

                                            {this.state.newUserProfileFormValidate.fields.usernameField.error && (
                                                
                                                    <div className="error-msg padLeft5" 
                                                        dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.usernameField.errorMessage }}>
                                                    </div>

                                            )}

                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Email
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserEmail" 
                                                    className="form-control" 
                                                    data-field="email"
                                                    data-validation-type="email"
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.email} />

                                            {this.state.newUserProfileFormValidate.fields.emailField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.emailField.errorMessage }}>
                                                </div>

                                            )}


                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Họ
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserLastName" 
                                                    className="form-control" 
                                                    data-field="last_name" 
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.last_name} />

                                            {this.state.newUserProfileFormValidate.fields.last_nameField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.last_nameField.errorMessage }}>
                                                    
                                                </div>

                                            )}

                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Tên
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserFirstName" 
                                                    className="form-control" 
                                                    data-field="first_name" 
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.first_name} />      

                                            {this.state.newUserProfileFormValidate.fields.first_nameField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.first_nameField.errorMessage }}>
                                                    
                                                </div>

                                            )}  

                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Tuổi
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="number" 
                                                    id="txtUserAge" 
                                                    className="form-control" 
                                                    min="20" max="70" step="1" 
                                                    data-field="age" 
                                                    onChange={onChange_handleProfileNumber.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.age} />

                                            {this.state.newUserProfileFormValidate.fields.ageField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.ageField.errorMessage }}>
                                                    
                                                </div>

                                            )}        

                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Địa chỉ
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserLocation" 
                                                    className="form-control" 
                                                    data-field="location" 
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.location} />

                                            {this.state.newUserProfileFormValidate.fields.locationField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.locationField.errorMessage }}>
                                                    
                                                </div>

                                            )}           

                                        </div>
                                    </div>
                                    <div className="profile-info-row edit_mode">
                                        <div className="profile-info-name">
                                            Website
                                            <span className="required">(*)</span>
                                        </div>
                                        <div className="profile-info-value">

                                            <input type="text" 
                                                    id="txtUserWebsite" 
                                                    className="form-control" 
                                                    data-field="website" 
                                                    data-validation-type="url"
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                    value={formFields.website} />

                                            {this.state.newUserProfileFormValidate.fields.websiteField.error && (
                                                
                                                <div className="error-msg padLeft5"
                                                    dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.websiteField.errorMessage }}>
                                                    
                                                </div>

                                            )}        

                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>                
                        
                        <div className="rowFluid">

                            <div className="col-xs-12 w100p">

                                <div className="widget-box transparent">

                                    <div className="widget-header widget-header-small">
                                        <h4 className="widget-title smaller">
                                            <i className="fa fa-check-square-o mg-right5"></i>
                                            Vai trò người dùng                                        
                                        </h4>
                                    </div>

                                    <div className="widget-body">
                                        <div className="widget-main">

                                            <div className="profile-info-row edit_mode">

                                                <div className="profile-info-name">
                                                    Vai trò người dùng
                                                    <span className="required">(*)</span>
                                                </div>
                                                <div className="profile-info-value">

                                                    <CustomSelect placeholder="--- Mời chọn một mục ---"
                                                        data={userRolesListData}
                                                        parent={this}
                                                        variableReturn="selectedUserRole" />   

                                                </div>

                                            </div>                                    
                                        
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="rowFluid">

                            <div className="col-xs-12 w100p">
                                <div className="widget-box transparent">
                                    <div className="widget-header widget-header-small">
                                        <h4 className="widget-title smaller">
                                            <i className="fa fa-key mg-right5"></i>
                                            Mật khẩu người dùng                                        
                                        </h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-main">

                                            <div className="profile-info-row edit_mode">

                                                <div className="profile-info-name">
                                                    Mật khẩu
                                                    <span className="required">(*)</span>
                                                </div>
                                                <div className="profile-info-value">

                                                    <input type="password" 
                                                            id="txtUserPassword"
                                                            className="form-control" 
                                                            data-field="password"   
                                                            data-field-min-length="5"
                                                            data-field-max-length="20"
                                                            onChange={onChange_handleProfileText.bind(this)}
                                                            onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                            value={formFields.password} />

                                                    {this.state.newUserProfileFormValidate.fields.passwordField.error && (
                                                        
                                                        <div className="error-msg padLeft5"
                                                            dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.passwordField.errorMessage }}>
                                                            
                                                        </div>

                                                    )}        

                                                </div>

                                            </div>

                                            <div className="profile-info-row edit_mode">
                                            
                                                <div className="profile-info-name">
                                                    Nhập lại mật khẩu
                                                    <span className="required">(*)</span>
                                                </div>
                                                <div className="profile-info-value">

                                                    <input type="password" 
                                                            id="txtRetypeUserPassword"
                                                            className="form-control" 
                                                            data-field="retypePassword"
                                                            data-field-value-match={this.state.formFields.password}
                                                            data-validation-type="passwordRetype"
                                                            data-field-min-length="5"
                                                            data-field-max-length="20"
                                                            onChange={onChange_handleProfileText.bind(this)}
                                                            onBlur={handleFormValidation.bind(this, 'newUserProfileFormValidate')}
                                                            value={formFields.retypePassword} />

                                                    {this.state.newUserProfileFormValidate.fields.retypePasswordField.error && (
                                                        
                                                        <div className="error-msg padLeft5"
                                                            dangerouslySetInnerHTML={{ __html : this.state.newUserProfileFormValidate.fields.retypePasswordField.errorMessage }}>
                                                            
                                                        </div>

                                                    )}        

                                                </div>

                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        
                        <div className="rowFluid">

                            <div className="col-xs-12 w100p">
                                <div className="widget-box transparent">
                                    <div className="widget-header widget-header-small">
                                        <h4 className="widget-title smaller">
                                            <i className="fa fa-check-square-o mg-right5"></i>
                                            Giới thiệu bản thân
                                        </h4>
                                    </div>
                                    <div className="widget-body">
                                        <div className="widget-main">
                                            <textarea id="txtUserIntro" 
                                                    rows="5" 
                                                    className="form-control" 
                                                    data-field="about_me" 
                                                    value={formFields.about_me}
                                                    onChange={onChange_handleProfileText.bind(this)}
                                                    />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    
                    </div>

                    <div className="mainFooter" style={{ textAlign : 'center' }}>                        

                        <div className="toolbar">

                            <button type="button"
                                    onClick={onSubmit_handleCreateNewUserForm.bind(this)}
                                    className="btn btn-primary btnCreateNewUser">

                                <span className="fa fa-user"></span>
                                <span className="padLeft5">
                                    Tạo thành viên
                                </span>

                            </button>

                            <button type="button"
                                    className="btn btn-default btnReload"
                                    onClick={reloadForm.bind(this)}>

                                <span className="fa fa-refresh"></span>
                                <span className="padLeft5">
                                    Thiết lập lại
                                </span>

                            </button>

                        </div>                        

                    </div>                   

                </form>

            </div>         

        );

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabNewProfile);