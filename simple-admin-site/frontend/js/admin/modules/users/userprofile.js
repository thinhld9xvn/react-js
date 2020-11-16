import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import TabProfile from './components/userprofile/tabProfile';
import TabPassword from './components/userprofile/tabPassword';

import AvatarsListModal from './modals/avatarsListModal';
import CropAvatarModal from './modals/cropAvatarModal';

import 'css/tabsList.min.css';
import './css/users.min.css';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

class UserProfile extends Component {

    constructor(props) {

        super(props);

    }

    componentDidMount() {            
       
        tabListsEvents.initWindowResize();
        window.addEventListener('resize', tabListsEvents.windowResizeEvent);

    }

    componentWillUnmount() {        

        tabListsEvents.resetWindowResize();
        window.removeEventListener('resize', tabListsEvents.windowResizeEvent);

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

                    <Tabs defaultActiveKey="profile" 
                          transition={false} 
                          id="user-profile-tabs"
                          onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="profile" title="Hồ sơ">
                            <TabProfile />
                        </Tab>

                        <Tab eventKey="password" title="Mật khẩu">
                            <TabPassword />
                        </Tab>
                
                    </Tabs>

                </div>

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

export default UserProfile;