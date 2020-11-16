import React, { Component } from 'react';

import memoize from 'memoize-one';

import DataTable from 'react-data-table-component';

import {getAllDeActiveUsers} from 'utils/membershipUtils';

import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { FPROFILE_AVATAR_DIR_URL } from "constants/urlConstants";

import {onClick_restoreDeactiveUser,
        onKeyDown_txtSearchUserNameChanged,
        onClick_clearSearchUserNameFilter,
        onClick_zoomIn, onClick_zoomOut,
        onClick_zoomReset, onClick_toggleTabFullScreen,
        onClick_refreshUsersListData, onClick_restoreAllUsersListData} from 'handleEvents/usersListHandleEvents';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ActionButtons = ({ row, actionData }) => (

    <div className="actionButtons">

        <a className="btn btn-danger btn-link btn-sm"
            data-uid={row.id}
            onClick={actionData.onClick_restoreDeactiveUser}
            href="#">
            <i className="fa fa-recycle"></i>
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
        name: 'Avatar',
        grow: 0,
        cell: row => <img width="40px" alt={row.display_name} src={row.avatarImgSrc.concat(`?t=${columnsData.userAvatarTimeStamp}`)} />,
    },
    {
        name: 'Tên người dùng',
        selector: 'username',
        sortable: true,
    },
    {
        name: 'Tên hiển thị',
        selector: 'display_name',
        sortable: true,
    },
    {
        name: 'Thư điện tử',
        selector: 'email'
    },
    {
        name: 'Vai trò',
        selector: 'role_name'
    }
]);

const emptyData = <p style={{ paddingBottom: 10 }}>Không có dữ liệu nào để hiển thị.</p>;

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

            <a className="btn btn-primary btn-link btn-sm  btnToggleFullScreeen"
                href="#"
                onClick={toolbarData.onClick_toggleTabFullScreen}>
                <span className="fa fa-arrows-alt"></span>
            </a>

            <span className="delimiter">|</span>

            <a className="btn btn-primary btn-link btn-sm btnRefresh"
                href="#"
                onClick={toolbarData.onClick_refreshUsersListData}>

                <span className="fa fa-refresh"></span>

            </a>

            <a className="btn btn-primary btn-link btn-sm btnRestoreAll disabled"
                href="#"
                onClick={toolbarData.onClick_restoreAllUsersListData}>

                <span className="fa fa-recycle"></span>

            </a>

        </div>

        <div className="toolRight">

            <div>

                <input type="text"
                        id="_searchUserNameKey"
                        className="form-control searchUserNameKey _searchUserNameKey"
                        placeholder="Tên người dùng cần tìm ..."
                        defaultValue=""
                        onKeyDown={toolbarData.onKeyDown_txtSearchUserNameChanged} />

                <button className="btn btn-primary btn-sm btnClearFilter"
                        onClick={toolbarData.onClick_clearSearchUserNameFilter}>

                    <span className="fa fa-remove"></span>

                </button>

            </div>

        </div>

    </div>

);

class TabAlDeActiveUsers extends Component {

    onSelectedRowsChange(state) {

        const setRestoreAllButtonState = (v) => {

            const button = document.querySelector('.mainHeader .toolbar .btnRestoreAll');

            switch( v ) {

                case 'enable' :

                    button.classList.contains('disabled') && button.classList.remove('disabled');

                    break;

                case 'disable' :

                    ! button.classList.contains('disabled') && button.classList.add('disabled');

                    break;

            }

        };

        const {selectedCount, selectedRows} = state,
              usersListIdSelected = [];

        if ( selectedCount === 0 ) {

            this.setState({

                //isRestoreAllState : false,
                usersListIdSelected : []

            });

            setRestoreAllButtonState('disable');

            return;

        }

       else {

            const usersListSelected = [...selectedRows];

            usersListSelected.map(v => usersListIdSelected.push(v.id) );

            this.setState({

                //isRestoreAllState : true,
                usersListIdSelected

            });

            setRestoreAllButtonState('enable');

            return;


        }

    }

    constructor(props) {

        super(props);

        this.state = {

            searchUserNameKey : '',
            filteredItems : [],
            data : [],
            isFullScreen : false,
            //isRestoreAllState : false,
            usersListIdSelected : [],
            zoom : 1,
            loadingData : false

        };

    }

    componentDidMount() {

        const self = this;

        self.setState({

            loadingData : true

        });

        getAllDeActiveUsers.call(self)
                         .then(response => {

            const usersList = response.data;

            usersList.map(e => {

                e.avatarDirPath = FPROFILE_AVATAR_DIR_URL;
                e.avatarImgSrc = e.avatarDirPath + e.avatar;

            });

            this.props.updateDeactiveUsersList( usersList );
            //this.props.update_UsersList( usersList );

            self.setState({

                loadingData : false,
                data : [...usersList],
                filteredItems : [...usersList]

            });

        });

    }   

    shouldComponentUpdate(nextProps, nextState) {

        const { loadingData, filteredItems, zoom, isFullScreen } = this.state;

        if ( loadingData !== nextState.loadingData ) return true;

        if ( filteredItems !== nextState.filteredItems ) return true;

        //if ( isRestoreAllState !== nextState.isRestoreAllState ) return true;

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

    render() {

        const self = this,
              { loadingData, filteredItems, zoom, isFullScreen  } = this.state,
              { userAvatarTimeStamp } = this.props;

        const columnsData = {

            userAvatarTimeStamp,
            actionData : {
               
                onClick_restoreDeactiveUser : onClick_restoreDeactiveUser.bind(self)

            }

        };

        const toolbarData = {

            onClick_zoomIn : onClick_zoomIn.bind(self),
            onClick_zoomOut : onClick_zoomOut.bind(self),
            onClick_zoomReset : onClick_zoomReset.bind(self),
            onClick_toggleTabFullScreen : onClick_toggleTabFullScreen.bind(self),
            onClick_refreshUsersListData : onClick_refreshUsersListData.bind(self),
            onClick_restoreAllUsersListData : onClick_restoreAllUsersListData.bind(self),
            onKeyDown_txtSearchUserNameChanged : onKeyDown_txtSearchUserNameChanged.bind(self),
            onClick_clearSearchUserNameFilter : onClick_clearSearchUserNameFilter.bind(self)

        };

        document.deActiveUsersListRef = this;

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
                                    Danh sách người dùng đã xóa
                                </h4>

                                <DataTable
                                    title="Danh sách người dùng"
                                    columns={columns(columnsData)}
                                    data={filteredItems}
                                    className="dtAllUsers dtAllActiveUsers"
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

export default connect(mapStateToProps, mapDispatchToProps)(TabAlDeActiveUsers);