import React from 'react';
import MainPanel from './mainpanel';
import SidebarLeft from './sidebarleft';
import Loader from './loader';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {getSidebarMenu} from 'utils/sidebarUtils';
import {getAllActivePostTypesList} from 'utils/postTypesUtils';

import {addComponentInst} from 'utils/componentUtils';

class MainContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            is_loading : true
        }

    } 

    async initialize() {

        const _getSidebarMenu = await getSidebarMenu(),
              _getPostTypesList = await getAllActivePostTypesList();       
        
        const sidebarMenu = _getSidebarMenu.data,
              postTypesList = _getPostTypesList.data,

              postTypesMenuList = [];

        if ( postTypesList && postTypesList.length > 0 ) {

            let id = sidebarMenu.length + 1;

            postTypesList.forEach(postType => {                              

                const menuItem =  {
                    id : `${id}`,
                    icon : "receipt",
                    text : postType.name,
                    url : "#",
                    hasChildrens : true,
                    is_expand : false,
                    is_active : false,
                    childrens : [
                        {
                            id : id + "_c1",
                            icon : "sort",
                            text : "Tất cả bài viết",
                            url : `/admin/ap_type/postsList?id=${postType.id}&slug=${postType.slug}`,
                            is_active : false
                        },
                        {
                            id : id + "_c2",
                            icon : "sort",
                            text : "Đăng bài viết mới",
                            url : `/admin/ap_type/newPost?id=${postType.id}&slug=${postType.slug}`,
                            is_active : false
                        },
                        {
                            id : id + "_c3",
                            icon : "sort",
                            text : "Danh mục con",
                            url : `/admin/ap_type/categoriesList?id=${postType.id}&slug=${postType.slug}`,
                            is_active : false
                        } 
                    ]
                };

                postTypesMenuList.push( menuItem );

                id++;

            });

            let pos = 1;

            postTypesMenuList.map(v => {

                sidebarMenu.splice(pos, 0, v);

                pos++;

            });

        }

        this.props.updateSidebarMenu(sidebarMenu);      

        this.setState({ is_loading : false });

    }

    componentDidMount() {

        this.initialize.call(this);

    }

    componentDidUpdate() {

        addComponentInst({

            name : "mainContainerRef",
            instance : this

        });

    }       

	render() {

        const {is_loading} = this.state;

		return(

            ! is_loading && (

                <div className="wrapper">

                    <SidebarLeft />

                    <MainPanel />

                    <Loader />
                    
                </div>

            )

		);

	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);