import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import PostTypesTab from './components/postTypesTab';
import DeactivePostTypesTab from './components/deactivePostTypesTab';

import * as tabListsEvents from 'handleEvents/tabListsHandleEvents';

import NewPostTypeModal from './modals/newPostTypeModal';
import EditPostTypeModal from './modals/editPostTypeModal';

class PostTypes extends Component {

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

                    <Tabs defaultActiveKey="list-posts-types-tab"
                        transition={false}
                        id="advanced-post-types-tabs"
                        onSelect={this.onClick_selectTab.bind(this)}>

                        <Tab eventKey="list-posts-types-tab" title="Danh sách mục bài viết nâng cao">
                            <PostTypesTab />
                        </Tab>

                        <Tab eventKey="list-deactive-posts-types-tab" title="Thùng rác">
                            <DeactivePostTypesTab />
                        </Tab>

                    </Tabs>

                </div>

                <NewPostTypeModal heading="Hộp thoại tạo mục bài viết"
                    chooseText="Tạo mục bài viết"
                    closeText="Đóng lại" />

                <EditPostTypeModal heading="Hộp thoại sửa mục bài viết"
                    chooseText="Sửa mục bài viết"
                    closeText="Đóng lại" />

            </div>

        );

    }
}

export default PostTypes;