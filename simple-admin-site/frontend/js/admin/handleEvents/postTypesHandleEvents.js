import axios from 'axios';

import * as modalUtils from 'utils/modalUtils';
import * as _ from 'utils/libUtils';

import { convertStrToSlug } from 'utils/UrlUtils';
import { getComponentInst } from 'utils/componentUtils';

import { ADMIN_AJAX_URLS } from 'constants/urlConstants';

import { resetFormValidateState } from 'handleEvents/userProfileHandleEvents';
import { validateSubmittedProfileForm } from './userProfileHandleEvents';
import * as dateTimeUtils from 'utils/dateTimeUtils';

//#region Post Type Action

function updateSidebarMenu() {

    const mainInst = getComponentInst('mainContainerRef'),
        sidebarInst = getComponentInst('sidebarLeftRef');

    mainInst.componentDidMount();

    setTimeout(() => {

        sidebarInst.componentDidMount();

    }, 200);

}

function restorePostTypeCallback(pids) {

    const { deactivePostTypesList } = this.props,
        dtInst = getComponentInst('deactivePostTypesTabRef'),
        filteredItems = this.state.filteredItems;

    _.showLoadingOverlay();

    if (pids.length > 0) {

        pids.forEach(pid => {

            const pIndex = deactivePostTypesList.findIndex(p => p.id == pid),
                _pIndex = filteredItems.findIndex(p => p.id == pid);

            // remove item in filtered list in datatable
            if (_pIndex !== -1) {

                filteredItems.splice(_pIndex, 1);

                dtInst.setState({
                    filteredItems: [...filteredItems]
                })

            }

            if (pIndex !== -1) {

                deactivePostTypesList.splice(pIndex, 1);

                this.props.updateDeactivePostTypesList(deactivePostTypesList);

                dtInst.setState({

                    data: [...deactivePostTypesList],
                    filteredItems: [...deactivePostTypesList]

                });

            }

        });

        const fd = new FormData();

        fd.append('pids', JSON.stringify(pids));

        axios({

            method: "POST",
            url: ADMIN_AJAX_URLS.RESTORE_POST_TYPE_URL,
            data: fd,
            responseType: "json"

        }).then(response => {

            const data = response.data;

            _.closeLoadingOverlay();

            if (data.response === 'error') {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: data.message || "Phát hiện lỗi khi khôi phục mục bài viết, mời thử lại !!!",
                    icon: 'error',
                    ok_label: 'Đồng ý',
                    ok_callback: () => { }

                });

            }

            else {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: 'Khôi phục mục bài viết thành công !!!',
                    icon: 'information',
                    ok_label: 'Đồng ý',
                    ok_callback: () => {

                        updateSidebarMenu();

                    }

                });

            }

        });

    }

}

function removePostTypeCallback(pids) {

    const { postTypesList } = this.props,
        dtInst = getComponentInst('postTypesTabRef'),
        filteredItems = [...dtInst.state.filteredItems];

    _.showLoadingOverlay();

    if (pids.length > 0) {

        pids.forEach(pid => {

            const pIndex = postTypesList.findIndex(p => p.id == pid),
                _pIndex = filteredItems.findIndex(p => p.id == pid);

            // remove item in filtered list in datatable
            if (_pIndex !== -1) {

                filteredItems.splice(_pIndex, 1);

                dtInst.setState({
                    filteredItems: [...filteredItems]
                })

            }

            if (pIndex !== -1) {

                postTypesList.splice(pIndex, 1);

                this.props.updatePostTypesList(postTypesList);

                dtInst.setState({

                    data: [...postTypesList]

                });

            }

        });

        const fd = new FormData();

        fd.append('pids', JSON.stringify(pids));

        axios({

            method: "POST",
            url: ADMIN_AJAX_URLS.REMOVE_POST_TYPE_URL,
            data: fd,
            responseType: "json"

        }).then(response => {

            const data = response.data;

            _.closeLoadingOverlay();

            if (data.response === 'error') {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: data.message || "Phát hiện lỗi khi xóa mục bài viết, mời thử lại !!!",
                    icon: 'error',
                    ok_label: 'Đồng ý',
                    ok_callback: () => { }

                });

            }

            else {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: 'Xóa mục bài viết thành công !!!',
                    icon: 'information',
                    ok_label: 'Đồng ý',
                    ok_callback: () => {

                        updateSidebarMenu();

                    }

                });

            }

        });

    }

}

function removePermantlyPostTypeCallback(pids) {

    const { deactivePostTypesList } = this.props,
        dtInst = getComponentInst('deactivePostTypesTabRef'),
        filteredItems = [...dtInst.state.filteredItems],
        slugsList = [];

    _.showLoadingOverlay();

    if (pids.length > 0) {

        pids.forEach(pid => {

            const pIndex = deactivePostTypesList.findIndex(p => p.id == pid),
                _pIndex = filteredItems.findIndex(p => p.id == pid);

            // remove item in filtered list in datatable
            if (_pIndex !== -1) {

                filteredItems.splice(_pIndex, 1);

                dtInst.setState({
                    filteredItems: [...filteredItems]
                })

            }

            if (pIndex !== -1) {

                const _postType = deactivePostTypesList.splice(pIndex, 1);

                this.props.updateDeactivePostTypesList(deactivePostTypesList);

                dtInst.setState({

                    data: [...deactivePostTypesList]

                });

                slugsList.push(_postType[0].slug);

            }

        });

        const fd = new FormData();

        fd.append('pids', JSON.stringify(pids));
        fd.append('slugs', JSON.stringify(slugsList));

        axios({

            method: "POST",
            url: ADMIN_AJAX_URLS.REMOVE_PERMANTLY_POST_TYPE_URL,
            data: fd,
            responseType: "json"

        }).then(response => {

            const data = response.data;

            _.closeLoadingOverlay();

            if (data.response === 'error') {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: data.message || "Phát hiện lỗi khi xóa mục bài viết, mời thử lại !!!",
                    icon: 'error',
                    ok_label: 'Đồng ý',
                    ok_callback: () => { }

                });

            }

            else {

                modalUtils.showAlertDialog({

                    title: 'Thông báo',
                    message: 'Xóa mục bài viết thành công !!!',
                    icon: 'information',
                    ok_label: 'Đồng ý',
                    ok_callback: () => {

                        updateSidebarMenu();

                    }

                });

            }

        });

    }

}


export function reloadForm(e) {

    if (e) e.preventDefault();

    const { _formFields, postTypeFormValidate } = this.state,
        formFields = JSON.parse(JSON.stringify(_formFields));

    _.mapObject(postTypeFormValidate.fields, function (e, i) {

        e.error = false;
        e.errorMessage = '';

    });

    postTypeFormValidate.formValidate = true;

    this.setState({

        formFields,
        postTypeFormValidate

    });

    _.scrollPageToTop();

}

export function onClick_showNewPostTypeModal(e) {

    e.preventDefault();

    const formInst = getComponentInst('newPostTypeModalLayoutRef');

    resetFormValidateState.call(formInst, 'postTypeFormValidate');

    formInst.setState((state) => ({

        formFields: _.getCopiedJsonObject(state._formFields)

    }));

    modalUtils.openPopboxModal('newPostTypeModal');

}

export function onClick_showEditPostTypeModal(e) {

    e.preventDefault();

    const formInst = getComponentInst('editPostTypeModalLayoutRef'),
        { postTypesList } = this.props,
        pid = e.currentTarget.dataset.pid,

        postType = postTypesList.find(e => e.id == pid);

    resetFormValidateState.call(formInst, 'postTypeFormValidate');

    this.props.updatePostTypeEditing(postType);

    formInst.setState({

        formFields: {

            namePostType: postType.name,
            slugPostType: postType.slug,
            descriptionPostType: postType.description,

        }

    });

    modalUtils.openPopboxModal('editPostTypeModal');

}

export function onClick_closeNewPostTypeModal(e) {

    e.preventDefault();

    modalUtils.closePopboxModal('newPostTypeModal');

    document.querySelector('.btnRefresh').click();

}

export function onClick_closeEditPostTypeModal(e) {

    e && e.preventDefault();

    modalUtils.closePopboxModal('editPostTypeModal');

    document.querySelector('.btnRefresh').click();

}

export function onSubmit_performCreateNewPostType(e) {

    e.preventDefault();

    const formInst = getComponentInst('newPostTypeModalLayoutRef'),
        { formFields } = formInst.state,
        ajax_url = ADMIN_AJAX_URLS.CREATE_NEW_POST_TYPE_URL;

    const validate = validateSubmittedProfileForm.call(formInst, 'frmNewPostType', 'postTypeFormValidate');

    if (!validate) return false;

    this.setState({ is_ajax_saving: true });

    const fd = new FormData();

    fd.append('formFields', JSON.stringify(formFields));

    axios({

        method: "POST",
        url: ajax_url,
        data: fd,
        responseType: "json"

    }).then(response => {

        const data = response.data;

        if (data.response === 'error') {

            modalUtils.showAlertDialog({

                title: 'Thông báo',
                message: data.message || "Phát hiện lỗi khi tạo một mục bài viết mới, mời thử lại !!!",
                icon: 'error',
                ok_label: 'Đồng ý',
                ok_callback: () => {

                    reloadForm.call(formInst);

                }

            });

        }

        else {

            modalUtils.showAlertDialog({

                title: 'Thông báo',
                message: 'Tạo mục bài viết mới thành công !!!',
                icon: 'information',
                ok_label: 'Đồng ý',
                ok_callback: () => {

                    updateSidebarMenu();

                    reloadForm.call(formInst);

                }

            });

        }

        _.scrollPageToTop();

        this.setState({ is_ajax_saving: false });

    });

}

export function onSubmit_performEditPostType(e) {

    e.preventDefault();

    const formInst = getComponentInst('editPostTypeModalLayoutRef'),
        { formFields } = formInst.state,
        { postTypeEditing, sidebarMenuItems } = this.props,
        ajax_url = ADMIN_AJAX_URLS.UPDATE_POST_TYPE_URL;

    const validate = validateSubmittedProfileForm.call(formInst, 'frmEditPostType', 'postTypeFormValidate');

    if (!validate) return false;

    if (postTypeEditing.name.toLowerCase() === formFields.namePostType.toLowerCase() ||
        postTypeEditing.slug.toLowerCase() === formFields.slugPostType.toLowerCase()) {

        modalUtils.showAlertDialog({

            title: 'Thông báo',
            message: 'Thông tin về mục bài viết đã tồn tại, mời nhập một thông tin khác !!!',
            icon: 'error',
            ok_label: 'Đồng ý',
            ok_callback: () => { }

        });

        return false;

    }

    this.setState({ is_ajax_saving: true });

    const fd = new FormData(),
        _formFields = _.getCopiedJsonObject(formFields);

    _formFields._namePostType = postTypeEditing.name;
    _formFields._slugPostType = postTypeEditing.slug;

    fd.append('formFields', JSON.stringify(_formFields));

    axios({

        method: "POST",
        url: ajax_url,
        data: fd,
        responseType: "json"

    }).then(response => {

        const data = response.data;

        if (data.response === 'error') {

            modalUtils.showAlertDialog({

                title: 'Thông báo',
                message: data.message || "Phát hiện lỗi khi sửa mục bài viết mới, mời thử lại !!!",
                icon: 'error',
                ok_label: 'Đồng ý',
                ok_callback: () => {

                    reloadForm.call(formInst);

                }

            });

        }

        else {

            modalUtils.showAlertDialog({

                title: 'Thông báo',
                message: 'Sửa mục bài viết thành công !!!',
                icon: 'information',
                ok_label: 'Đồng ý',
                ok_callback: () => {

                    updateSidebarMenu();

                    onClick_closeEditPostTypeModal(e);

                }

            });

        }

        _.scrollPageToTop();

        this.setState({ is_ajax_saving: false });

    });

}

export function onClick_removePostType(e) {

    e.preventDefault();

    const self = this,
        pid = e.currentTarget.dataset.pid;

    modalUtils.showConfirmDialog({

        title: 'Thông báo',
        message: 'Bạn có muốn thực hiện thao tác này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {

            removePostTypeCallback.call(self, [pid]);

        },
        no_callback: () => { }

    });

}

export function onClick_refreshPostTypesListData(e) {

    e.preventDefault();

    this.componentDidMount();

}

export function onClick_trashAllPostTypesListData(e) {

    e.preventDefault();

    const self = this,
        { postTypesListIdSelected } = this.state;

    //console.log( postTypesListIdSelected );

    postTypesListIdSelected &&
        postTypesListIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({

            title: 'Thông báo',
            message: 'Bạn có chắc muốn thực hiện thao tác này không ?',
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {

                removePostTypeCallback.call(self, postTypesListIdSelected);


            },
            no_callback: () => { }

        });

}

export function onChange_handleTextChanged(e) {

    const { formFields } = this.state,
        currentTarget = e.currentTarget,
        field = currentTarget.dataset.field,
        value = currentTarget.value;

    if (field === 'namePostType') {

        formFields.slugPostType = convertStrToSlug(value);

    }

    formFields[field] = value;

    this.setState({ formFields });


}

export function onClick_restoreDeactivePostType(e) {

    e.preventDefault();

    const self = this,
        pid = e.currentTarget.dataset.pid;

    modalUtils.showConfirmDialog({

        title: 'Thông báo',
        message: 'Bạn có muốn khôi phục mục bài viết này không ?',
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {

            restorePostTypeCallback.call(self, [pid]);

        },
        no_callback: () => { }

    });

}

export function onClick_restoreAllDeactivePostType(e) {

    e.preventDefault();

    const self = this,
        { postTypesListIdSelected } = this.state;

    postTypesListIdSelected &&
        postTypesListIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({

            title: 'Thông báo',
            message: 'Bạn có muốn khôi phục những mục bài viết này không ?',
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {

                restorePostTypeCallback.call(self, postTypesListIdSelected);

            },
            no_callback: () => { }

        });

}

export function onClick_trashPermantlyPostType(e) {

    e.preventDefault();

    const self = this,
        pid = e.currentTarget.dataset.pid;

    modalUtils.showConfirmDialog({

        title: 'Thông báo',
        message: `Bạn có thực sự muốn xóa vĩnh viễn mục bài viết này không ? 
                    Lưu ý: Thao tác này sẽ xóa tất các bảng dữ liệu liên quan, cần cân nhắc 
                    thât kỹ khi thực hiện thao tác này !!!
                  `,
        yes_label: 'Đồng ý',
        no_label: 'Hủy bỏ',
        yes_callback: () => {

            removePermantlyPostTypeCallback.call(self, [pid]);

        },
        no_callback: () => { }

    });

}

export function onClick_trashPermantlyAllPostType(e) {

    e.preventDefault();

    const self = this,
        { postTypesListIdSelected } = this.state;

    postTypesListIdSelected &&
        postTypesListIdSelected.length > 0 &&
        modalUtils.showConfirmDialog({

            title: 'Thông báo',
            message: `Bạn có thực sự muốn xóa vĩnh viễn những mục bài viết này không ? 
                    Lưu ý: Thao tác này sẽ xóa tất các bảng dữ liệu liên quan, cần cân nhắc 
                    thât kỹ khi thực hiện thao tác này !!!
                  `,
            yes_label: 'Đồng ý',
            no_label: 'Hủy bỏ',
            yes_callback: () => {

                removePermantlyPostTypeCallback.call(self, postTypesListIdSelected);


            },
            no_callback: () => { }

        });

}

//#endregion

//#region Post Action
export function onClick_editPost(e) {

    e.preventDefault();

    modalUtils.openPopboxModal('editPostModal');

}

export function onClick_removePost(e) {

    e.preventDefault();

}

export function onClick_SavePostChange(e) {

    e.preventDefault();

}

export function onClick_CloseEditPostModal(e) {

    e.preventDefault();

    modalUtils.closePopboxModal('editPostModal');

}

export function onClick_refreshPostsListData(e) {

    e.preventDefault();

    this.componentDidMount();

}

export function onClick_trashAllPostsListData(e) {

    e.preventDefault();

}

function handleFilterAction(item, params) {

    const { authorId, categoryId, postModifiedFilter } = params,
        postModifiedDate = dateTimeUtils.convertStringtoDateObj(item.post_modified_date),
        dateNow = new Date(Date.now());

    let boolCheck = authorId !== -1 ? parseInt(item.username.id) === authorId : true;
    boolCheck &= categoryId !== -1 ? item.post_categories.filter(c => parseInt(c.id) === categoryId).length > 0 : true;

    if (postModifiedFilter === 'filter_by_date_now') {

        boolCheck &= dateTimeUtils.compareTwoDateObj(postModifiedDate, dateNow);

    }

    else if (postModifiedFilter === 'filter_by_this_week') {

        const d1 = dateTimeUtils.subtractDate(dateNow, 7),
            d2 = dateNow;

        // postModifiedDate >= d1 or postModifiedDate <= d2
        boolCheck &= dateTimeUtils.betweenRangeDate(postModifiedDate, d1, d2);

    }

    else if (postModifiedFilter.startsWith('filter_by_month_')) {

        const month = postModifiedFilter.split('_').pop();

        boolCheck &= dateTimeUtils.compareDateMonth(postModifiedDate, month);

    }

    return boolCheck;

}

export function setFilterChanged(s) {

    this.isFilterChanged = s;

}

export function onClick_handleChooseAuthorFilter(v) { }

export function onClick_handleChoosePostModifiedFilter(v) { }

export function onClick_handleChooseCategoryFilter(v) { }

export function onClick_authorFilter(n, v, e) {

    e.preventDefault();

    //setFilterChanged.call(this, false);

    const authorName = n,
        authorId = v,
        { data } = this.state,
        filteredItems = data.filter(item => item.username.id == authorId);

    this.authorFilterInst.setValue(authorName, authorId);
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', -1);
    this.categoryFilterInst.setValue('Tất cả danh mục', -1);

    setFilterChanged.call(this, true);

    this.setState({
        filteredItems: [...filteredItems]
    });

    //setFilterChanged.call(this, true);

}

export function onClick_categoryFilter(n, v, e) {

    e.preventDefault();

    //setFilterChanged.call(this, false);

    const categoryId = v,
        categoryName = n,
        { data } = this.state,
        filteredItems = data.filter(item => item.post_categories.filter(category => category.id == categoryId).length > 0);

    this.categoryFilterInst.setValue(categoryName, categoryId);
    this.authorFilterInst.setValue('Tất cả tác giả', -1);
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', -1);

    setFilterChanged.call(this, true);

    this.setState({
        filteredItems: [...filteredItems]
    });

}

export function onClick_handleFilter(e) {

    e.preventDefault();

    _.showLoadingOverlay();    

    setTimeout(() => {

        const { data } = this.state,

            authorId = parseInt(this.authorFilterSelected),
            categoryId = parseInt(this.categoryFilterSelected),

            postModifiedFilter = this.postModifiedFilterSelected.toString();

        //console.log( categoryId );

        let filteredItems = [],
            params = {
                authorId,
                categoryId,
                postModifiedFilter
            };

        //setFilterChanged.call(parent, false);

        /*console.log( authorId );
        console.log( categoryId );
        console.log( postModifiedFilter );*/

        if (authorId === -1 &&
            categoryId === -1 &&
            parseInt(postModifiedFilter) === -1) {

            filteredItems = data;

        }

        else {

            filteredItems = data.filter((item) => handleFilterAction(item, params));

        }

        setFilterChanged.call(this, true);

        //if ( filteredItems.length !== data.length ) {

        this.setState({
            filteredItems : [...filteredItems]
        });

        //}

        _.closeLoadingOverlay();

    }, 200);
}

export function onClick_clearFilter(e) {

    e.preventDefault();

    this.authorFilterInst.setValue('Tất cả tác giả', '-1');
    this.categoryFilterInst.setValue('Tất cả danh mục', '-1');
    this.postModifiedFilterInst.setValue('Tất cả ngày đăng', '-1');    

}

export function onKeyDown_txtSearchChanged(e) {

    const keyCode = e.keyCode || e.which;

    if ( keyCode === 13 ) {

        const v = document.querySelector('.tab-pane.active .searchPostKey').value,
              { data } = this.state,            
              filteredItems = data.filter(item => item.post_title.toLowerCase().includes( v.toLowerCase() ) );

        setFilterChanged.call(this, true);

        this.setState({
           
            filteredItems : [...filteredItems]

        });

    } 

}

export function onClick_cleartxtSearchFilter(e) {

    document.querySelector('.tab-pane.active .searchPostKey').value = '';

    setFilterChanged.call(this, true);

    this.setState((prevState) => ({
        filteredItems : [...prevState.data]
    }));     

}

export function onChange_handleEditorChanged(content, editor) {

    //console.log(content);

    this.setState({
        editorContent : content
    })

}

export function onClick_toggleAddCategoryForm(e) {

    e.preventDefault();

    //const { showFormCategory } = this.state;

    this.setState((prevState) => ({

        showFormCategory : ! prevState.showFormCategory

    }));

}

export function onClick_showMediaDialog(command, e) {

    e.preventDefault();   

    document.fileManagerCExtraSettings = {

        chooseSingleFile : true

    };

    document.mediaEmbbedModalCommand = command;
    document.mediaEmbbedModalPointer = this;

    modalUtils.openPopboxModal("mediaEmbbedModal");

    setTimeout(() => {
        document.querySelector('.tree-leaf-content.active').click();
    }, 100);

}

export function onClick_removeFeaturedImage(e) {

    e.preventDefault();

    this.setState({

        featuredImage : {

            src : '',
            alt : ''

        }

    })

}
//#endregion Post Action
