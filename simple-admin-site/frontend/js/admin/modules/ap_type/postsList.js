import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import PostsListTab from './components/postsListTab';
//import DeactivePostsListTab from './components/deactivePostsListTab';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

import EditPostModal from './modals/editPostModal';
import MediaEmbbedModal from 'modules/filemanager/modals/mediaEmbbedModal';

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

                document.querySelector('.tabLists .tab-pane.active .btnRefresh').click();

            }, 100);

        }

    }

    render() {

        return (

            <div className="w100p">

                <div className="tabLists w100p">

                    <Tabs defaultActiveKey="active-posts-list-tab"
                        transition={false}
                        id="posts-list-tab"
                        onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="active-posts-list-tab" title="Danh sách bài viết">
                            <PostsListTab />
                        </Tab>

                        <Tab eventKey="deactive-posts-list-tab" title="Thùng rác">
                            
                        </Tab>

                    </Tabs>

                </div>

                <EditPostModal heading="Hộp thoại sửa bài viết"
                                chooseText="Sửa bài viết"
                                closeText="Đóng lại" />

                <MediaEmbbedModal heading="Thư viện ảnh"
                                  chooseText="Chọn đối tượng"
                                  closeText="Đóng lại" />


            </div>

        );

    }
}

export default PostsList;