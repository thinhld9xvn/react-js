import React, { Component } from 'react';

import { handleFormValidation } from 'handleValidate/handleFormValidate';

import { onChange_handleTextChanged } from 'handleEvents/postTypesHandleEvents';

import {addComponentInst} from 'utils/componentUtils';

class PostTypeModalLayout extends Component {

    constructor(props) {

        super(props);

        const formFields = {

            namePostType: '',
            slugPostType: '',
            descriptionPostType: ''

        };

        this.state = {

            postTypeFormValidate: {

                errorMessages: {

                    requiredError: "Trường này không được bỏ trắng",
                    minLengthError: "Trường này phải có tối thiểu là {n} ký tự",
                    maxLengthError: "Trường này có tối đa là {n} ký tự",
                    requiredNotSpecialCharError: "Trường này chỉ chấp nhận chữ, số và (_)",

                },

                fields: {

                    namePostTypeField: {

                        error: false,
                        errorMessage: ''

                    },
                    slugPostTypeField: {

                        error: false,
                        errorMessage: ''

                    },
                    descriptionPostTypeField: {

                        error: false,
                        errorMessage: ''

                    }

                },

                formValidate: true

            },

            formFields: JSON.parse(JSON.stringify(formFields)),
            _formFields: JSON.parse(JSON.stringify(formFields))

        };

    }

    componentDidUpdate() {        

        addComponentInst({

            name : this.props.formid === 'frmNewPostType' ? 'newPostTypeModalLayoutRef' : 'editPostTypeModalLayoutRef',
            instance : this

        });  
       

    }

    render() {

        const { formFields } = this.state,
              { formid } = this.props;       

        return (            

            <div className="w100p">

                <form id={formid}
                    className={formid}
                    action=""
                    method="post">

                    <div className="inputBoxControl">

                        <label>Tên loại bài viết <span className="required">(*)</span></label>

                        <div className="inputControl">

                            <input type="text"
                                className="form-control txtNamePostType"
                                name="txtNamePostType"
                                data-field="namePostType"
                                data-field-max-length="50"
                                onChange={onChange_handleTextChanged.bind(this)}
                                onBlur={handleFormValidation.bind(this, 'postTypeFormValidate')}
                                value={formFields.namePostType} />

                            {this.state.postTypeFormValidate.fields.namePostTypeField.error &&

                                <div className="error-msg"
                                    dangerouslySetInnerHTML={{ __html: this.state.postTypeFormValidate.fields.namePostTypeField.errorMessage }}>

                                </div>}

                            <div className="description mtop10">
                                Tên loại bài viết sẽ hiển thị ở trên thanh menu bên trái màn hình
                            </div>

                        </div>

                    </div>

                    <div className="inputBoxControl">

                        <label>Slug  <span className="required">(*)</span></label>

                        <div className="inputControl">

                            <input type="text" className="form-control txtSlugPostType" name="txtSlugPostType"
                                data-field="slugPostType"
                                data-field-max-length="50"
                                onChange={onChange_handleTextChanged.bind(this)}
                                onBlur={handleFormValidation.bind(this, 'postTypeFormValidate')}
                                value={formFields.slugPostType} />

                            {this.state.postTypeFormValidate.fields.slugPostTypeField.error &&

                                <div className="error-msg"
                                    dangerouslySetInnerHTML={{ __html: this.state.postTypeFormValidate.fields.slugPostTypeField.errorMessage }}>

                                </div>}

                            <div className="description mtop10">Slug của loại bài viết</div>

                        </div>

                    </div>

                    <div className="inputBoxControl">

                        <label>Mô tả <span className="required">(*)</span></label>

                        <div className="inputControl">

                            <input type="text"
                                className="form-control txtDescriptionPostType"
                                name="txtDescriptionPostType"
                                data-field="descriptionPostType"
                                data-field-max-length="100"
                                onChange={onChange_handleTextChanged.bind(this)}
                                onBlur={handleFormValidation.bind(this, 'postTypeFormValidate')}
                                value={formFields.descriptionPostType} />

                            {this.state.postTypeFormValidate.fields.descriptionPostTypeField.error &&

                                <div className="error-msg"
                                    dangerouslySetInnerHTML={{ __html: this.state.postTypeFormValidate.fields.descriptionPostTypeField.errorMessage }}>

                                </div>}

                            <div className="description mtop10">
                                Vài dòng mô tả về loại bài viết này
                        </div>

                        </div>

                    </div>

                </form>

            </div>

        );
    }
}

export default PostTypeModalLayout;