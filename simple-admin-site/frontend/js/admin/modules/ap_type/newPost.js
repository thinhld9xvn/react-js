import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import PostLayout from './layout/postLayout';
//import DeactivePostsListTab from './components/deactivePostsListTab';

import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

import 'css/tabsList.min.css';
import './css/style.min.css';

class PostsList extends Component {

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

                //document.querySelector('.tabLists .tab-pane.active .btnRefresh').click();

            }, 100);

        }

    }

    render() {

        return (

            <div className="w100p">

                <div className="tabLists w100p">

                    <Tabs defaultActiveKey="active-new-post-tab"
                        transition={false}
                        id="new-post-tab"
                        onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="active-new-post-tab" title="Đăng bài viết mới">
                            <PostLayout name="NewPostLayout" />
                        </Tab>

                    </Tabs>

                </div>              

                <MediaEmbbedModal heading="Thư viện ảnh"
                                chooseText="Chọn đối tượng"
                                closeText="Đóng lại" />

            </div>            

        );

    }
}

export default PostsList;