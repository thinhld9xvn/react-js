import React, { Component } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API } from 'constants/tinyMCEApi';
import TagsInput from 'modules/tags-input/tagsInput';

import { onChange_handleEditorChanged, 
         onClick_toggleAddCategoryForm,
         onClick_showMediaDialog,
         onClick_removeFeaturedImage } from 'handleEvents/postTypesHandleEvents';

import { addComponentInst } from 'utils/componentUtils';

import { categoriesData, tagsPostSuggestionsData } from '../components/sampleData';

import CustomTreeList from 'modules/custom-select/customTreeList';
import CustomTreeListSelect from 'modules/custom-select/customTreeListSelect';
import { attachDomFixedPosListener } from 'utils/domUtils';
import { getPostStatusCaption } from 'utils/postTypesUtils';

class PostLayout extends Component {

    constructor(props) {

        super(props);

        const categoriesList = [...categoriesData],
            _categoriesList = [...categoriesData];

        const tagsPostSuggestions = [...tagsPostSuggestionsData];

        this.state = {

            instName: props.name.concat('Ref'),
            categoriesList: categoriesList.splice(1),
            _categoriesList: _categoriesList.splice(1),
            tagsPostSuggestions: tagsPostSuggestions,
            editorContent: '',
            featuredImage : {
                src : '',
                alt : ''
            },
            showFormCategory: false,
            postStatus: 'draft'
            

        }

        this.chooseCategoriesList = [];
        this.categoryItemSelected = null;

    }

    componentDidMount() {

        attachDomFixedPosListener('.option-custom.categoriesBoxListDropDown',
            '.select-list');

        attachDomFixedPosListener('.ReactTags__tags',
            '.ReactTags__suggestions');

    }

    componentDidUpdate() {

        addComponentInst({

            name: this.state.instName,
            instance: this

        });

    }

    render() {

        return (

            <React.Fragment>
            
                <div className="myTabContainer">

                    <div className="mainContent">

                        <div className="panelMainBox">

                            <div className="panelLeft">

                                <div className="post_title">

                                    <label>Tên bài viết</label>
                                    <input type="text" className="form-control" value="" />
                                </div>

                                <div className="post_slug">

                                    <div className="slug">

                                        <strong>Đường dẫn: </strong>
                                        <span>{window.location.origin.concat('/')} </span>

                                        <input type="text"
                                            className="form-control"                                           
                                            value="" />

                                        <span>.html</span>

                                    </div>

                                    <div className="view">

                                        <button type="button" className="btn btn-danger btn-sm">

                                            <span className="fa fa-eye"></span>
                                            <span className="padLeft5">Xem bài viết</span>

                                        </button>

                                    </div>

                                </div>

                                <div className="post_content mtop20">

                                    <div className="mediaButton">

                                        <button className="btn btn-sm btn-default"
                                                onClick={onClick_showMediaDialog.bind(this, 'insertInToTinyMce')}>
                                            <span className="fa fa-film"></span>
                                            <span className="padLeft5">Thư viện ảnh</span>
                                        </button>

                                    </div>

                                    <div className="mtop10">

                                        <Editor
                                            apiKey={TINYMCE_API}
                                            value={this.state.editorContent}
                                            init={{
                                                height: 300,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                                                        alignleft aligncenter alignright alignjustify | \
                                                        bullist numlist outdent indent | image | removeformat | help',
                                                /*setup: (ed) => {

                                                    ed.on("click", function(e) {

                                                        if ( e.target.nodeName.toLowerCase() === 'img' ) {



                                                        }
                                                        
                                                    });

                                                }*/
                                            }}
                                            onEditorChange={onChange_handleEditorChanged.bind(this)}
                                        />
                                    </div>

                                </div>

                                <div className="post_excerpt mtop20">

                                    <div className="widget-box">

                                        <div className="widget-title">
                                            Mô tả ngắn cho bài viết
                                            </div>

                                        <div className="widget-content">

                                            <div className="widget-box-content">

                                                <textarea name="txtPostExcerpt"
                                                    className="form-control"
                                                    rows="5"
                                                    value=""></textarea>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="panelRight">

                                <div className="widget-box">

                                    <div className="widget-title">
                                        Cập nhật
                                    </div>

                                    <div className="widget-content">

                                        <div className="widget-box-content">

                                            <div className="rowFluid">

                                                <span className="fa fa-spoon"></span>
                                                <span className="padLeft5">
                                                    Trạng thái bài đăng: 
                                                    <strong className="padLeft5">{getPostStatusCaption(this.state.postStatus)}</strong>
                                                </span>

                                            </div>

                                            <div className="rowFluid mtop10">

                                                <span className="fa fa-calendar"></span>

                                                <span className="padLeft5">

                                                    <span>Ngày đăng: <strong>T4 03/05/2017</strong></span>

                                                    <span style={{ paddingLeft: "75px" }}>

                                                        <span className="fa fa-history"></span>
                                                        <span className="padLeft5"><strong>09:35:18</strong></span>

                                                    </span>

                                                </span>

                                            </div>

                                            <div className="rowFluid mtop10">

                                                <span className="fa fa-calendar"></span>

                                                <span className="padLeft5">

                                                    <span>
                                                        Ngày sửa gần nhất: 
                                                        <span className="loc-date-modiffied"><strong>T4 03/05/2017</strong></span>
                                                    </span>
                                                    <span className="loc-time-modiffied">
                                                        <span className="fa fa-history"></span>
                                                        <span className="padLeft5"><strong>09:35:18</strong></span>
                                                    </span>

                                                </span>

                                            </div>

                                            <div className="rowFluid mtop10">

                                                <button className="btn btn-success btn-sm">
                                                    <span className="fa fa-check"></span><span className="padLeft5">Cập nhật</span>
                                                </button>

                                                <button className="btn btn-success btn-danger btn-sm">
                                                    <span className="fa fa-trash"></span><span className="padLeft5">Bỏ thùng rác</span>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="widget-box mtop20">

                                    <div className="widget-title">

                                        Danh mục

                                    </div>

                                    <div className="widget-content">

                                        {this.state.categoriesList &&
                                            <CustomTreeList parent={this}
                                                data={this.state.categoriesList}
                                                variableReturn="chooseCategoriesList" />
                                        }

                                        <div className="addCategorySection mtop20">

                                            <a href="#"
                                                onClick={onClick_toggleAddCategoryForm.bind(this)}>

                                                <span className={"fa ".concat(this.state.showFormCategory ? 'fa-minus' : 'fa-plus')}></span>
                                                <span className="padLeft5">Thêm mới danh mục</span>

                                            </a>

                                            <div className={"form mtop20 ".concat(this.state.showFormCategory ? 'show' : '')}>

                                                <div>

                                                    <label>
                                                        Tên danh mục cần tạo
                                                    </label>

                                                    <div className="mtop5">

                                                        <input type="text" className="form-control"
                                                            placeholder="Mời nhập tên danh mục"
                                                            value="" />

                                                    </div>

                                                </div>

                                                <div className="mtop10">

                                                    <label>
                                                        Danh mục cha
                                                    </label>

                                                    <div className="mtop5">

                                                        <CustomTreeListSelect parent={this}
                                                            data={this.state._categoriesList}
                                                            placeholder="Mời chọn một danh mục cha"
                                                            className="categoriesBoxListDropDown"
                                                            displayMode="dialog"
                                                            variableReturn="categoryItemSelected" />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="widget-box mtop20">

                                    <div className="widget-title">
                                        Thẻ bài viết
                                    </div>

                                    <div className="widget-content">

                                        <TagsInput placeholder="Mời nhập thẻ bài viết"
                                            suggestions={this.state.tagsPostSuggestions}
                                        />

                                    </div>

                                </div>

                                <div className="widget-box mtop20">

                                    <div className="widget-title">
                                        Ảnh đại diện
                                    </div>

                                    <div className="widget-content">

                                        <div className="featuredImage">

                                            {this.state.featuredImage.src && (
                                                <img src={this.state.featuredImage.src}                                              
                                                    alt={this.state.featuredImage.alt}
                                                    onClick={onClick_showMediaDialog.bind(this, 'attachFeaturedImage')} />
                                            )}

                                        </div>
                                        
                                        
                                        <div className={"chooseFeaturedImage ".concat(this.state.featuredImage.src === '' ? '-notChosen' : '')}>

                                            {this.state.featuredImage.src && (

                                                <div>
                                                    <a href="#"
                                                        onClick={onClick_removeFeaturedImage.bind(this)}>
                                                        <span className="fa fa-trash"></span>
                                                        <span className="caption padLeft5">
                                                            Xóa ảnh đại diện
                                                        </span>
                                                    </a>
                                                </div>

                                            )}
                                            
                                            <div>
                                                <a href="#"
                                                    onClick={onClick_showMediaDialog.bind(this, 'attachFeaturedImage')}>
                                                    <span className={this.state.featuredImage.src === '' ? 'fa fa-plus' : 'fa fa-edit'}></span>
                                                    <span className="caption padLeft5">
                                                        {this.state.featuredImage.src === '' ? 'Thêm ảnh đại diện' : 'Thay đổi ảnh đại diện'}
                                                    </span>
                                                </a>
                                            </div>

                                        </div>                                
                                    
                                    </div>

                                </div>

                            </div>
                        
                        </div>
                        
                    </div>

                </div>               

            </React.Fragment>

        );

    }

}

export default PostLayout;