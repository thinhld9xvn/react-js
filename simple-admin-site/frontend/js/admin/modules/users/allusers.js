import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import TabAllActiveUsers from './components/allUsers/tabAllActiveUsers';
import TabAllDeactiveUsers from './components/allUsers/tabAllDeActiveUsers';

import 'css/tabsList.min.css';
import './css/users.min.css';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

import AvatarsListModal from './modals/editUser/avatarsListModal';
import CropAvatarModal from './modals/editUser/cropAvatarModal';

import EditUserModal from './modals/editUserModal';
import ChangePasswordModal from './modals/editUser/changePasswordModal';

class AllUsers extends Component {

    constructor(props) {

        super(props);

    }    

    componentDidMount() {
       
        tabListsEvents.initWindowResize();

        window.addEventListener('resize', tabListsEvents.windowResizeEvent);

        document.addEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.addEventListener('keydown', tabListsEvents.onKeyDownShortcut);


    }

    componentWillUnmount() {        

        tabListsEvents.resetWindowResize();

        window.removeEventListener('resize', tabListsEvents.windowResizeEvent);

        document.removeEventListener('fullscreenchange', tabListsEvents.windowResizeEvent);
        document.removeEventListener('keydown', tabListsEvents.onKeyDownShortcut);

    }

    onClick_selectTab(k, e) {
        
        if ( ! e.currentTarget.classList.contains('active') ) {

            setTimeout(() => {

                tabListsEvents.windowResizeEvent();

                document.querySelector('.tabLists .tab-pane.active .btnRefresh').click();

            }, 100);

        }

    }

    render() {
        
        return (
            <div className="w100p">

                <div className="tabLists w100p">

                    <Tabs defaultActiveKey="active-users" 
                          transition={false} 
                          id="all-users-tabs"
                          onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="active-users" title="Người dùng hiện có">
                            <TabAllActiveUsers />
                        </Tab>

                        <Tab eventKey="inactive-users" title="Người dùng đã xóa">
                            <TabAllDeactiveUsers />
                        </Tab>
                
                    </Tabs>

                </div>  

                <EditUserModal heading="Profile người dùng"                               
                              chooseText="Lưu thay đổi"
                              closeText="Đóng lại" />

                <ChangePasswordModal heading="Thay đổi mật khẩu"
                              closeText="Đóng lại" />

                <AvatarsListModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />

                <CropAvatarModal heading="Chỉnh sửa avatar"                               
                              chooseText="Chọn"
                              closeText="Đóng lại" />              

            </div>

        );

    }

}

export default AllUsers;