import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import TabNewProfile from './components/allUsers/tabNewProfile';

import AvatarsListModal from './modals/newUser/avatarsListModal';
import CropAvatarModal from './modals/newUser/cropAvatarModal';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

import 'css/tabsList.min.css';
import './css/users.min.css';

class NewUser extends Component {

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

                    <Tabs id="user-add-newprofile-tabs"
                          defaultActiveKey="new-profile"
                          transition={false}
                          onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="new-profile" title="Thông tin thành viên">
                            <TabNewProfile />
                        </Tab>
                
                    </Tabs>

                </div>  

                <AvatarsListModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />  

                <CropAvatarModal heading="Mời chọn một avatar"                               
                              chooseText="Chọn avatar"
                              closeText="Đóng lại" />            

            </div>

        );

    }

}

export default NewUser;