import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

import memoize from 'memoize-one';

import { css } from "@emotion/core";

import PulseLoader from "react-spinners/PulseLoader";

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { getAllActivePostsList } from 'utils/postTypesUtils';

import {
    onClick_zoomIn, onClick_zoomOut,
    onClick_zoomReset, onClick_toggleTabFullScreen
} from 'handleEvents/usersListHandleEvents';

import {
    onClick_editPost,
    onClick_removePost,
    onClick_refreshPostsListData,
    onClick_trashAllPostsListData,
    onClick_handleChooseAuthorFilter,
    onClick_handleChoosePostModifiedFilter,
    onClick_handleChooseCategoryFilter,
    onClick_authorFilter,
    setFilterChanged,
    onClick_categoryFilter,
    onClick_handleFilter,
    onClick_clearFilter,
    onKeyDown_txtSearchChanged,
    onClick_cleartxtSearchFilter
} from 'handleEvents/postTypesHandleEvents';

import { addComponentInst } from 'utils/componentUtils';

import 'css/tabsList.min.css';
import '../css/style.min.css';

import CustomTreeListSelect from '../../custom-select/customTreeListSelect';
import { authorData, postModifiedData, categoriesData, generateSampleData } from './sampleData';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ActionButtons = ({ row, actionData }) => (

    <div className="actionButtons">

        <a className="btn btn-primary btn-link btn-sm"
            data-pid={row.id}
            onClick={actionData.onClick_editPost}
            href="#">
            <i className="fa fa-pencil"></i>
        </a>

        <a className="btn btn-danger btn-link btn-sm"
            data-pid={row.id}
            onClick={actionData.onClick_removePost}
            href="#">
            <i className="fa fa-trash"></i>
        </a>

    </div>

);

const CategoriesList = ({ row, inst }) => {

    const categories = [];

    row.post_categories.forEach((category, index) => {

        categories.push(
                        <div key={index}>
                            <a onClick={onClick_categoryFilter.bind(inst, category.name, 
                                                                          category.id)}
                               href="#">
                                {category.name}
                            </a>
                        </div>
                        );

    });

    return (

        <div className="categoriesList">

            {categories}

        </div>

    )

};

const columns = memoize(columnsData => [
    {
        name: '',
        maxWidth: '80px',
        cell: row => <ActionButtons row={row} actionData={columnsData.actionData} />
    },
    {
        name: 'Tên bài viết',
        selector: 'post_title',
        sortable: true,
        cell: row => <div className="post_title">{row.post_title}</div>
    },
    {
        name: 'Tác giả',
        selector: 'username',
        cell: row => <div className="post_author">
                        <a onClick={onClick_authorFilter.bind(columnsData.inst, row.username.name, row.username.id)}
                           href="#">{row.username.display_name}</a>
                     </div>
    },
    {
        name: 'Ngày đăng',
        selector: 'post_modified_date'
    },
    {
        name: 'Danh mục',
        selector: 'post_categories',
        cell: row => <CategoriesList row={row} inst={columnsData.inst} />
    },
    {
        name: 'Ảnh đại diện',
        selector: 'post_featured_image',
        cell: row => <img width="50" src={row.post_featured_image} alt="" />
    }

]);

const ToolbarButtons = ({ inst, toolbarData }) => (

    <React.Fragment>

        <div className="toolbar">

            <div className="toolLeft">

                <a className="btn btn-primary btn-link btn-sm btnZoomIn"
                    href="#"
                    onClick={toolbarData.onClick_zoomIn}>
                    <span className="fa fa-search-plus"></span>
                </a>

                <a className="btn btn-primary btn-link btn-sm btnZoomOut"
                    href="#"
                    onClick={toolbarData.onClick_zoomOut}>
                    <span className="fa fa-search-minus"></span>
                </a>

                <a className="btn btn-primary btn-link btn-sm btnZoomReset"
                    href="#"
                    onClick={toolbarData.onClick_zoomReset}>
                    <span className="fa fa-arrows"></span>
                </a>

                <span className="delimiter">|</span>

                <a className="btn btn-primary btn-link btn-sm  btnToggleFullScreen"
                    href="#"
                    onClick={toolbarData.onClick_toggleTabFullScreen}>
                    <span className="fa fa-arrows-alt"></span>
                </a>

                <span className="delimiter">|</span>

                <a className="btn btn-primary btn-link btn-sm btnRefresh"
                    href="#"
                    onClick={toolbarData.onClick_refreshPostsListData}>

                    <span className="fa fa-refresh"></span>

                </a>

                <a className="btn btn-primary btn-link btn-sm btnTrashAll disabled"
                    href="#"
                    onClick={toolbarData.onClick_trashAllPostsListData}>

                    <span className="fa fa-trash"></span>

                </a>

            </div>

            <div className="toolRight">

                <div>

                    <input type="text"
                        id="searchPostKey"
                        className="form-control searchUserNameKey searchPostKey"
                        placeholder="Tên bài viết cần tìm ..."
                        defaultValue=""
                        onKeyDown={toolbarData.onKeyDown_txtSearchChanged} />

                    <button className="btn btn-primary btn-sm btnClearFilter"
                        onClick={toolbarData.onClick_cleartxtSearchFilter}>

                        <span className="fa fa-remove"></span>

                    </button>

                </div>

            </div>

        </div>

        <div className="fitlerBox">

            <div className="filterWrap">

                <div className="filterLabel">
                    Lọc theo tác giả:
                </div>

                <div className="filterContent mtop5">

                    <CustomTreeListSelect placeholder="--- Xin mời chọn một tác giả ---"
                                          parent={inst}
                                          componentInst = "authorFilterInst"
                                          variableReturn = "authorFilterSelected"
                                          data={authorData} 
                                          handleChooseItemCallback={onClick_handleChooseAuthorFilter}
                                          />
                </div>

            </div>

            <div className="filterWrap">

                <div className="filterLabel">
                    Lọc theo ngày đăng:
                </div>

                <div className="filterContent mtop5">

                    <CustomTreeListSelect placeholder="--- Xin mời chọn một ngày đăng ---"
                                          parent={inst}
                                          componentInst = "postModifiedFilterInst"
                                          variableReturn = "postModifiedFilterSelected"
                                          data={postModifiedData} 
                                          handleChooseItemCallback={onClick_handleChoosePostModifiedFilter}

                                          />
                </div>

            </div>

            <div className="filterWrap">

                <div className="filterLabel">
                    Lọc theo danh mục:
                </div>

                <div className="filterContent mtop5">

                    <CustomTreeListSelect placeholder="--- Xin mời chọn một danh mục ---"
                                        parent={inst}
                                        componentInst = "categoryFilterInst"
                                        variableReturn = "categoryFilterSelected"
                                          data={categoriesData} 
                                          handleChooseItemCallback={onClick_handleChooseCategoryFilter}

                                          />
                </div>

            </div>

            <div className="filterWrap">

                <button type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={toolbarData.onClick_handleFilter}>
                    <span className="fa fa-filter"></span>
                </button>

                <button type="button" 
                        className="btn btn-default btn-sm"
                        onClick={toolbarData.onClick_clearFilter}>
                    <span className="fa fa-recycle"></span>
                </button>

            </div>

        </div>

    </React.Fragment>

);

const emptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;

class PostsListTab extends Component {

    onSelectedRowsChange(state) {

        const setNavigAllButtonState = (v) => {

            const buttonTrashAll = document.querySelector('.tab-pane.active .mainHeader .toolbar .btnTrashAll');

            switch (v) {

                case 'enable':

                    buttonTrashAll.classList.contains('disabled') && buttonTrashAll.classList.remove('disabled');

                    break;

                case 'disable':

                    !buttonTrashAll.classList.contains('disabled') && buttonTrashAll.classList.add('disabled');

                    break;

            }

        };

        const { selectedCount, selectedRows } = state,
            postTypesListIdSelected = [];

        if (selectedCount === 0) {

            this.setState({

                //isTrashAllState : false,
                postTypesListIdSelected: []

            });

            setNavigAllButtonState('disable');

            return;

        }

        else {

            const postTypesListSelected = [...selectedRows];

            postTypesListSelected.map(v => postTypesListIdSelected.push(v.id));

            this.setState({

                //isTrashAllState : true,
                postTypesListIdSelected

            });

            setNavigAllButtonState('enable');

            return;


        }

    }

    constructor(props) {

        super(props);

        this.state = {

            filteredItems: [],
            data: [],          
            isFullScreen: false,
            postTypesListIdSelected: [],
            zoom: 1,
            loadingData: false

        };

        this.authorFilterInst = null;
        this.postModifiedFilterInst = null;
        this.categoryFilterInst = null;

        this.authorFilterSelected = '-1';
        this.postModifiedFilterSelected = '-1';
        this.categoryFilterSelected = '-1';

        this.isFilterChanged = true;

    }

    componentDidMount() {

        const self = this;

        self.setState({

            loadingData: true

        });

        /*getAllActivePostsList.call(this)
                             .then(response => {
            
            const postsList = response.data;

            self.setState({

                data : [...postsList],
                filteredItems : [...postsList],
                loadingData : false

            })
            

        });*/     
        
        const postsList = generateSampleData();

        setFilterChanged.call(this, true);

        self.setState({
            data: [...postsList],
            filteredItems: [...postsList],
            loadingData: false
        });

    }

    shouldComponentUpdate(nextProps, nextState) {

        const { loadingData, zoom, isFullScreen } = this.state;

        //console.log(this.state);
        //console.log(nextState);

        if (loadingData !== nextState.loadingData) return true;       
        
        if (zoom !== nextState.zoom) return true;
    
        if (isFullScreen !== nextState.isFullScreen) return true;

        //console.log( this.isFilterChanged );

        if ( this.isFilterChanged ) return true;

        return false;

    }

    componentDidUpdate() {

        addComponentInst({

            name: "postTypesTabRef",
            instance: this

        });

        setFilterChanged.call(this, false);

    }

    render() {

        const self = this,
            { loadingData, filteredItems, zoom, isFullScreen } = this.state,
            { userAvatarTimeStamp } = this.props;

        const columnsData = {

            userAvatarTimeStamp,
            inst : self,
            actionData: {

                onClick_editPost: onClick_editPost.bind(self),
                onClick_removePost: onClick_removePost.bind(self)

            }

        };

        const toolbarData = {

            onClick_zoomIn: onClick_zoomIn.bind(self),
            onClick_zoomOut: onClick_zoomOut.bind(self),
            onClick_zoomReset: onClick_zoomReset.bind(self),
            onClick_toggleTabFullScreen: onClick_toggleTabFullScreen.bind(self),
            onClick_refreshPostsListData: onClick_refreshPostsListData.bind(self),
            onClick_trashAllPostsListData: onClick_trashAllPostsListData.bind(self),
            onClick_handleFilter :  onClick_handleFilter.bind(self),
            onClick_clearFilter : onClick_clearFilter.bind(self),
            onKeyDown_txtSearchChanged: onKeyDown_txtSearchChanged.bind(self),
            onClick_cleartxtSearchFilter: onClick_cleartxtSearchFilter.bind(self)

        };

        return (

            <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>

                <div className="mainHeader">                    

                    {!loadingData && filteredItems && <ToolbarButtons inst={this} toolbarData={toolbarData} />}

                </div>

                <div className="mainContent"
                    style={{ paddingTop: 0 }}>

                    {loadingData ? (

                        <div className="sweet-loading">
                            <PulseLoader
                                css={override}
                                size={15}
                                color={"#9c27b0"}
                                loading={this.state.loadingData}
                            />
                        </div>
                    ) : (

                            <div style={{ zoom: zoom }}>

                                <h4 className="headingTable">
                                    Danh sách bài viết hiện có
                                </h4>

                                <DataTable
                                    title="Danh sách bài viết"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtAllActivePostsList"
                                    noDataComponent={emptyData}
                                    noHeader={true}
                                    onSelectedRowsChange={(state) => this.onSelectedRowsChange(state)}
                                    selectableRows
                                    highlightOnHover
                                    //subHeader
                                    //subHeaderComponent={subHeaderComponentMemo}                                   
                                    pagination />
                            </div>
                        )}

                </div>

                <div className="mainFooter"></div>

            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListTab);