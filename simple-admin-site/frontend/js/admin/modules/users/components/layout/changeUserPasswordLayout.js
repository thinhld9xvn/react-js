import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {onChange_handleFieldChanged, resetForm} from 'handleEvents/userPasswordHandleEvents';

import {handleFormValidation} from 'handleValidate/handleFormValidate';

class ChangeUserPasswordLayout extends Component {

    constructor(props) {

        super(props);

        this.state = {

            userPasswordFormValidate : {
                
                errorMessages : {

                    requiredError : "Trường này không được bỏ trắng",
                    notDuplicatePasswordError : "Mật khẩu mới không được trùng với mật khẩu cũ",
                    minLengthError : "Mật khẩu phải có tối thiểu là {n} ký tự",
                    maxLengthError : "Mật khẩu có tối đa là {n} ký tự",
                    adminPasswordError : "Mật khẩu không được đặt là admin",
                    requiredSpecialCharPasswordError : "Mật khẩu phải chứa chữ, số và ký tự đặc biệt"

                },

                fields : {

                    oldPasswordField : {

                        error : false,
                        errorMessage : ''
    
                    },
                    newPasswordField : {
    
                        error : false,
                        errorMessage : ''
    
                    }                    

                },

                formValidate : true
                
            },
            oldPassword : '',
            newPassword : '',           
            isSaveChanges : false

        };

    } 

    render() {

        const { events } = this.props;

        document.changeUserPassRef = this;

        return (

            <div>
                <form id="frmUserPassword"
                    method="post"
                    action=""
                    className={this.state.isSaveChanges ? "disabled" : ""}>

                    <div className="mainHeader"></div>

                    <div className="mainContent">

                        <div className="inputBoxControl">

                            <label>
                                Mật khẩu cũ
                            </label>

                            <div className="inputControl">
                                <input type="password" 
                                    id="txtOldPassword"
                                        name="txtOldPassword" 
                                        className="form-control"
                                        data-field="oldPassword"
                                        data-field-min-length="5"
                                        data-field-max-length="20"
                                        value={this.state.oldPassword} 
                                        onChange={onChange_handleFieldChanged.bind(this)} 
                                        onBlur={handleFormValidation.bind(this, 'userPasswordFormValidate')}
                                        />
                                {
                                    this.state.userPasswordFormValidate.fields.oldPasswordField.error ?
                                
                                    <div className="error-msg"
                                        dangerouslySetInnerHTML={{ __html : this.state.userPasswordFormValidate.fields.oldPasswordField.errorMessage }}>
                                        
                                    </div> : 

                                    null 
                                }
                            </div>

                        </div>

                        <div className="inputBoxControl">

                        <label>
                            Mật khẩu mới
                        </label>

                        <div className="inputControl">

                            <input type="password" 
                                id="txtNewPassword"
                                    name="txtNewPassword" 
                                    className="form-control"
                                    data-field="newPassword"
                                    data-field-value-match={this.state.oldPassword}                                    
                                    data-validation-type="passwordMatch"
                                    data-field-min-length="5"
                                    data-field-max-length="20"
                                    value={this.state.newPassword} 
                                    onChange={onChange_handleFieldChanged.bind(this)} 
                                    onBlur={handleFormValidation.bind(this, 'userPasswordFormValidate')}
                                    />

                            {
                                this.state.userPasswordFormValidate.fields.newPasswordField.error ?
                            
                                <div className="error-msg"
                                     dangerouslySetInnerHTML={{ __html : this.state.userPasswordFormValidate.fields.newPasswordField.errorMessage }}>                                    
                                </div> : 

                                null 
                            }

                        </div>

                    </div>
                    
                        <div className="inputBoxControl">

                            <button className="btn btn-primary"
                                    type="submit"
                                    onClick={events.handleSubmitForm.bind(this)}>
                                <span className="fa fa-key"></span>
                                <span className="padLeft5">
                                    Thay đổi mật khẩu
                                </span>
                            </button>

                            <button type="button" 
                                    className="btn btn-default"
                                    onClick={resetForm.bind(this)}>
                                <span className="fa fa-refresh"></span>
                                <span className="padLeft5">
                                    Thiết lập lại
                                </span>
                            </button>

                        </div>
                    </div>

                    <div className="mainFooter"></div>

                </form>
            </div>

        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserPasswordLayout);