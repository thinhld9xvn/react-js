import React, { Component } from 'react';

import DataTable from 'react-data-table-component';

import memoize from 'memoize-one';

import { css } from "@emotion/core";

import PulseLoader from "react-spinners/PulseLoader";

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {getDeActivePostTypesList} from 'utils/postTypesUtils';

import {onKeyDown_txtSearchUserNameChanged as onKeyDown_txtSearchChanged, 
        onClick_clearSearchUserNameFilter as onClick_clearSearchFilter,
        onClick_zoomIn, onClick_zoomOut, 
        onClick_zoomReset, onClick_toggleTabFullScreen} from 'handleEvents/usersListHandleEvents';

import {onClick_restoreDeactivePostType,
        onClick_trashPermantlyPostType,
        onClick_refreshPostTypesListData,
        onClick_restoreAllDeactivePostType, 
        onClick_trashPermantlyAllPostType} from 'handleEvents/postTypesHandleEvents';

import {addComponentInst} from 'utils/componentUtils';

import 'css/tabsList.min.css';
import '../css/configuration.min.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ActionButtons = ({ row, actionData }) => (    
            
    <div className="actionButtons">     
        
        <a className="btn btn-danger btn-link btn-sm"  
            data-pid={row.id} 
            onClick={actionData.onClick_restoreDeactivePostType}                  
            href="#">
            <i className="fa fa-recycle"></i>
        </a>

        <a className="btn btn-default btn-link btn-sm"  
            data-pid={row.id} 
            onClick={actionData.onClick_trashPermantlyPostType}                  
            href="#">
            <i className="fa fa-trash"></i>
        </a>
        
    </div>

);

const columns = memoize(columnsData => [
    {
        name : '',
        maxWidth: '80px',
        cell : row => <ActionButtons row={row} actionData={columnsData.actionData} />
    },      
    {
        name: 'Tên loại bài viết',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Mô tả',
        selector: 'description'
    },
    {
        name: 'Slug',
        selector: 'slug'              
    }
   
]);

const ToolbarButtons = ({ toolbarData }) => (

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
                    onClick={toolbarData.onClick_refreshPostTypesListData}>

                    <span className="fa fa-refresh"></span>

                </a>
                
                <a className="btn btn-primary btn-link btn-sm btnRestoreAll disabled"
                    href="#"
                    onClick={toolbarData.onClick_restoreAllDeactivePostType}>

                    <span className="fa fa-recycle"></span>

                </a>

                <a className="btn btn-primary btn-link btn-sm btnTrashAll disabled"
                    href="#"
                    onClick={toolbarData.onClick_trashPermantlyAllPostType}>

                    <span className="fa fa-trash"></span>

                </a>

            </div>

            <div className="toolRight">

                <div>

                    <input type="text" 
                            id="_searchPostTypeKey"                                
                            className="form-control searchUserNameKey" 
                            placeholder="Mục bài viết cần tìm ..." 
                            defaultValue=""
                            onKeyDown={toolbarData.onKeyDown_txtSearchChanged} />

                    <button className="btn btn-primary btn-sm btnClearFilter"
                            onClick={toolbarData.onClick_clearSearchFilter}>

                        <span className="fa fa-remove"></span>

                    </button>

                </div>

            </div>

        </div>

);

const emptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;

class DeactivePostTypesTab extends Component {

    onSelectedRowsChange(state) {

        const setNavigAllButtonState = (v) => {

            const buttonTrashAll = document.querySelector('.tab-pane.active .mainHeader .toolbar .btnTrashAll'),
                   buttonRestoreAll = document.querySelector('.tab-pane.active .mainHeader .toolbar .btnRestoreAll');

            switch( v ) {

                case 'enable' :

                    buttonTrashAll.classList.contains('disabled') && buttonTrashAll.classList.remove('disabled');
                    buttonRestoreAll.classList.contains('disabled') && buttonRestoreAll.classList.remove('disabled');

                    break;

                case 'disable' :

                    ! buttonTrashAll.classList.contains('disabled') && buttonTrashAll.classList.add('disabled');
                    ! buttonRestoreAll.classList.contains('disabled') && buttonRestoreAll.classList.add('disabled');

                    break;

            }

        };

        const {selectedCount, selectedRows} = state,
              postTypesListIdSelected = [];            

        if ( selectedCount === 0 ) {

            this.setState({

                //isTrashAllState : false,
                postTypesListIdSelected : []
                
            });

            setNavigAllButtonState('disable');

            return;

        }        

        else {

            const postTypesListSelected = [...selectedRows];

            postTypesListSelected.map(v => postTypesListIdSelected.push(v.id) );

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
            
            filteredItems : [], 
            data : [],       
            isFullScreen : false,            
            postTypesListIdSelected : [],
            zoom : 1,             
            loadingData : false

        };

    }

    componentDidMount() {

        const self = this;

        self.setState({

            loadingData : true

        });

        getDeActivePostTypesList.call(this)
                                 .then(response => {

            const postTypesList = response.data;            

            this.props.updateDeactivePostTypesList( postTypesList );
            //this.props.update_UsersList( usersList );

            self.setState({

                loadingData : false,
                data : [...postTypesList],
                filteredItems : [...postTypesList]

            });

            

        });

    } 

    shouldComponentUpdate(nextProps, nextState) {

        const { loadingData, filteredItems, zoom, isFullScreen } = this.state;

        if ( loadingData !== nextState.loadingData ) return true;

        if ( filteredItems !== nextState.filteredItems ) return true;
      
        if ( zoom !== nextState.zoom ) return true;

        if ( isFullScreen !== nextState.isFullScreen ) return true;
        
        let boolUpdate = false;

        filteredItems.forEach(user => {

            const _user = nextState.filteredItems.find(v => v.id === user.id);

            if ( _user.avatarImgSrc !== user.avatarImgSrc ||
                 _user.display_name !== user.display_name ||
                 _user.role_name !== user.role_name ) {             

                boolUpdate = true;

                return;

            } 

        });       

        return boolUpdate;        

    }

    componentDidUpdate() {        

        addComponentInst({

            name : "deactivePostTypesTabRef",
            instance : this
            
        })

    }   

    render() {

        const self = this,
              { loadingData, filteredItems, zoom, isFullScreen } = this.state,
              { userAvatarTimeStamp } = this.props;

        const columnsData = {

            userAvatarTimeStamp,
            actionData : {
                
                onClick_restoreDeactivePostType : onClick_restoreDeactivePostType.bind(self),
                onClick_trashPermantlyPostType : onClick_trashPermantlyPostType.bind(self)

            }

        };

        const toolbarData = {
            
            onClick_zoomIn : onClick_zoomIn.bind(self),
            onClick_zoomOut : onClick_zoomOut.bind(self),
            onClick_zoomReset : onClick_zoomReset.bind(self),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(self),          
            onClick_refreshPostTypesListData : onClick_refreshPostTypesListData.bind(self),
            onClick_trashPermantlyAllPostType : onClick_trashPermantlyAllPostType.bind(self),
            onClick_restoreAllDeactivePostType : onClick_restoreAllDeactivePostType.bind(self),
            onKeyDown_txtSearchChanged : onKeyDown_txtSearchChanged.bind(self),
            onClick_clearSearchFilter : onClick_clearSearchFilter.bind(self)

        };
       
        return (

            <div className={"myTabContainer ".concat(isFullScreen ? 'fullscreen' : '')}>

                <div className="mainHeader" style={{ zoom : zoom }}>

                    {! loadingData && filteredItems && <ToolbarButtons toolbarData = {toolbarData} />}

                </div>

                <div className="mainContent" 
                    style={{ paddingTop : 0, zoom : zoom }}>

                    { loadingData ? (

                        <div className="sweet-loading">
                            <PulseLoader
                                css={override}
                                size={15}
                                color={"#9c27b0"}
                                loading={this.state.loadingData}
                            />
                        </div> 
                        ) : (

                            <div>

                                <h4 className="headingTable">
                                    Danh sách mục bài viết chưa kích hoạt
                                </h4>
                            
                                <DataTable
                                    title="Danh sách mục bài viết chưa kích hoạt"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtAllDeActivePostTypesList"
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

export default connect(mapStateToProps, mapDispatchToProps)(DeactivePostTypesTab);