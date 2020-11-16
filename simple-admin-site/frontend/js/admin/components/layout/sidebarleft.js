import React from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { Link } from "react-router-dom";

import { addComponentInst } from 'utils/componentUtils';

import { onClick_toggleSidebar } from 'handleEvents/sidebarHandleEvents';

class SidebarLeft extends React.Component {

    constructor(props) {

        super(props);

        this.onClick_MenuItemToggle = this.onClick_MenuItemToggle.bind(this);

        this.state = {
            is_disable: false
        }

    }

    componentDidMount() {

        let menuitems = this.props.sidebarMenuItems,
            route_pathname = window.location.pathname === '/' ? '/dashboard' : window.location.pathname,

            getParentMenuItem = function (e) {

                let pid = e['id'].toString().split('_')[0];

                return menuitems.filter(item => item['id'] == pid)[0];

            },

            activeRouteMenuItem = function (e) {

                const href = window.location.pathname.concat(window.location.search).replace(/\#/ig, ''),
                       url = e['url'].replace(/\#/ig, '');

                if (e['url'] === route_pathname || href === url ) {

                    if (!e['is_active']) {

                        e['is_active'] = true;

                    }

                    let parent = getParentMenuItem(e);

                    parent.is_expand = true;

                }

                else {

                    if (e['is_active']) {

                        e['is_active'] = false;

                    }

                }

                if (e['hasChildrens']) {

                    e['childrens'].map(activeRouteMenuItem);

                }

                return e;

            };

        menuitems.map(activeRouteMenuItem);

        this.props.updateSidebarMenu(menuitems);

    }

    componentDidUpdate() {

        addComponentInst({

            name: "sidebarLeftRef",
            instance: this

        });


    }

    onClick_MenuItemToggle(e) {

        e.stopPropagation();

        let element = e.currentTarget.querySelector('a'),

            _keyitem = element.dataset.keyItem.toString(),
            keyitems = _keyitem.split('_'),

            keyitem = keyitems[0],

            menuitems = this.props.sidebarMenuItems,

            m_item = null,
            sm_item = null,

            //is_menusubchild = false,

            filterMenuItem = e => {

                //console.log(e['id'] === _keyitem);

                if (e['id'] === _keyitem) m_item = e;

                if (e['hasChildrens']) e['childrens'].map(filterMenuItem);

                return e;

            };

        menuitems.map(filterMenuItem)[0];

        // menu là menu con
        /*if ( keyitems.length > 1 ) {

            is_menusubchild = true;
        }*/

        if (m_item['hasChildrens']) {

            m_item['is_expand'] = !m_item['is_expand'];

        }

        else {

            this.props.updateNavBrandName(m_item['text']);

            menuitems.map(e => {

                if (e['is_active']) {

                    e['is_active'] = false;

                }

                if (e['hasChildrens']) {

                    e['childrens'].map(sitem => {

                        if (sitem['is_active']) {

                            sitem['is_active'] = false;

                        }

                        return sitem;

                    });

                }

                return e;

            });

            m_item['is_active'] = true;

        }

        //console.log(m_item);

        this.props.updateSidebarMenu(menuitems);

    }

    setSidebarDisable(s) {

        this.setState({
            is_disable: s
        })

    }

    render() {

        const temp_menuitems = [];

        const getTempMItem = function (item, index) {

            const temp_subitems = item.hasChildrens ?
                item.childrens.map((subitem, k) => getTempMItem(subitem, subitem.id)) :
                null;

            return (
                <li key={item.id} className={"nav-item ".concat(item.hasChildrens ? "has-sub" : "")
                    .concat(item.is_active ? " active" : "")}
                    onClick={this.onClick_MenuItemToggle}>
                    <Link className="nav-link"
                        to={item.url}
                        data-key-item={item.id}>
                        <i className="material-icons">{item.icon}</i>
                        <p>{item.text}</p>
                        {item.hasChildrens ? (
                            <i className="material-icons expand">{item.is_expand ? "remove_circle_outline" : "add_circle_outline"}</i>
                        ) : null}
                    </Link>
                    {
                        item.hasChildrens ? (

                            <ul className={"sub-childrens ".concat(item.is_expand ? "show" : "")}>
                                {temp_subitems}
                            </ul>

                        ) : null
                    }

                </li>
            );

        }.bind(this);

        this.props.sidebarMenuItems.map((item, i) => {

            temp_menuitems.push(getTempMItem(item, i));

        });

        return (

            <React.Fragment>
            
                <div id="sidebar" className={"sidebar ".concat(this.state.is_disable ? 'disabled' : '')}
                    data-color="purple"
                    data-background-color="white"
                    data-image="">

                    <div className="logo">

                        <a href="#" className="simple-text logo-normal">
                            Go Invest Global
                        </a>

                    </div>

                    <div className="sidebar-wrapper ps-theme-default">

                        <ul className="nav">
                            {temp_menuitems}
                        </ul>

                    </div>

                </div>

                <a href="#" 
                    className="toggleSidebar" 
                    onClick={onClick_toggleSidebar.bind(this)}></a>

            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);