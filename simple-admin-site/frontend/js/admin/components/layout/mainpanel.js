import React from 'react';
import { connect } from 'react-redux';

import { Route } from "react-router-dom";

import {getUserInfo, getUserRolesList} from "utils/membershipUtils";

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import { asyncComponent } from './asyncComponent';

const DashboardPage = asyncComponent(() => {

    return import('components/pages/dashboard');

});

const FileManagerPage = asyncComponent(() => {

    return import('components/pages/filemanager');
    
});

const UserProfilePage = asyncComponent(() => {

    return import('components/pages/users/userprofile');
    
});

const AllUsersPage = asyncComponent(() => {

    return import('components/pages/users/allusers');
    
});

const NewUserPage = asyncComponent(() => {

    return import('components/pages/users/newuser');
    
});

const PostTypesPage = asyncComponent(() => {

    return import('components/pages/configuration/postTypes');
    
});

const postsListPage  = asyncComponent(() => {

    return import('components/pages/ap_type/postsList');
    
});

const newPostPage  = asyncComponent(() => {

    return import('components/pages/ap_type/newPost');
    
});

const categoriesListPage  = asyncComponent(() => {

    return import('components/pages/ap_type/categoriesList');
    
});

class MainPanel extends React.Component {   

    constructor(props) {

        super(props);

        this.state = {

            is_ajax_completed : false

        }

        this.updateBrandNameByUrl = this.updateBrandNameByUrl.bind(this);

        this.OnClick_ShowNavBarDropDownMenu = this.OnClick_ShowNavBarDropDownMenu.bind(this);
        this.OnClick_HideNavBarDropDownMenu = this.OnClick_HideNavBarDropDownMenu.bind(this);

    }

    updateBrandNameByUrl() {

        let searched_item = null;

        const searchMenuItem = (m_item) => {

            const href = window.location.pathname.concat(window.location.search).replace(/\#/ig, ''),
                  url = m_item.url.replace(/\#/ig, '');

            if ( m_item.url == window.location.pathname || href === url ) {

                searched_item = JSON.parse( JSON.stringify( m_item ) );

                return;

            }

            if ( searched_item === null && m_item.childrens && m_item.childrens.length > 0 ) {

                m_item.childrens.map(searchMenuItem);

            }

        };

        this.props.sidebarMenuItems.map(searchMenuItem);

        if ( searched_item === null ) searched_item = this.props.sidebarMenuItems[0];        

        //console.log(item);

        this.props.updateNavBrandName( searched_item.text );

    }

    componentDidMount() {

        let self = this;

        self.updateBrandNameByUrl();

        getUserInfo.call(self)
                   .then(response => {

            let data = response.data,
                userinfo = JSON.parse( JSON.stringify( data.userinfo ) );

            self.props.updateUserProfile(userinfo);

            getUserRolesList.call(self)
                            .then(response => {

                let data = response.data,
                    roles_list = data.roles_list;

                self.props.updateUserRolesList(roles_list);

                //console.log(self.props.userRolesList);

                self.setState({
                    is_ajax_completed : true
                });

            });

            //console.log(self.props.userProfile);

        });

    }

    OnClick_ShowNavBarDropDownMenu(e) {

        e.preventDefault();

        let navbarInfo = this.props.navbarInfo,

            element = e.currentTarget,
            keyitem = element.dataset.keyItem,

            navbaritem = navbarInfo.navbar_items.filter(e => e['name'] === keyitem)[0];

        if ( navbarInfo.navbar_item_active !== null &&
            navbarInfo.navbar_item_active['name'] != navbaritem['name'] ) {

            document.removeEventListener('click', this.OnClick_HideNavBarDropDownMenu);

        }

        navbarInfo.navbar_item_active = navbaritem;

        navbarInfo.navbar_items.map(e => {

            if ( e['name'] === navbaritem['name'] ) {

                e.show = true;

                return e;

            }

            if ( e.show ) {
                e.show = false;
            }

            return e;

        });

        this.props.updateNavStateItems( navbarInfo );

        document.addEventListener('click', this.OnClick_HideNavBarDropDownMenu);

    }

    OnClick_HideNavBarDropDownMenu(e) {

        e.preventDefault();

        let navbarInfo = this.props.navbarInfo;

        navbarInfo.navbar_items.map(e => {

            if ( e.show ) {
                e.show = false;
            }

            return e;

        })

        this.props.updateNavStateItems( navbarInfo );

        document.removeEventListener('click', this.OnClick_HideNavBarDropDownMenu)

    }

    render() {

        const temp_navbaritems = [],
              self = this;

        self.props.navbarInfo.navbar_items.map(e => {

            temp_navbaritems.push(
                <li key={"nav-item-".concat(e.name)} className="nav-item dropdown">

                    <a className="nav-link" href="#" data-key-item={e.name} onClick={(e) => self.OnClick_ShowNavBarDropDownMenu(e)}>
                        <i className="material-icons">{e.icon}</i>
                        {
                            e.name === 'actions' ? (
                                <span className="notification">{e.items_list.length}</span>
                            ) : null
                        }
                        <p className="d-lg-none d-md-block">
                            {e.label}
                        </p>
                    </a>

                    <div className={"dropdown-menu dropdown-menu-right".concat(e.show ? ' show' : '')}>
                        {
                            e.items_list.map( (se, si) => {
                                return (
                                    <a key={"nav-item-child-" . concat(si, '-', e.name)} className="dropdown-item" href={se.url}>{se.label}</a>
                                )
                            })
                        }
                    </div>

                </li>
            );

        }); 

        return (

            this.state.is_ajax_completed ? (

                <div className="main-panel">

                    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">

                        <div className="container-fluid">

                            <div className="navbar-wrapper">
                                <a className="navbar-brand" href="#">{this.props.navbarInfo.navbar_brand}</a>
                            </div>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="navbar-toggler-icon icon-bar"></span>
                                <span className="navbar-toggler-icon icon-bar"></span>
                                <span className="navbar-toggler-icon icon-bar"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-end">

                                <ul className="navbar-nav">

                                    {temp_navbaritems}

                                </ul>

                            </div>

                        </div>

                    </nav>

                    <div className="content">

                        <div className="container-fluid">

                            <div className="row">

                                <Route path="/admin/dashboard" component={DashboardPage} />
                                <Route path="/admin/media" component={FileManagerPage} />
                                <Route path="/admin/users/profile" component={UserProfilePage} />
                                <Route path="/admin/users/all_users" component={AllUsersPage} />
                                <Route path="/admin/users/new_user" component={NewUserPage} />
                                <Route path="/admin/configuration/post_types" component={PostTypesPage} />
                                <Route path="/admin/ap_type/postsList" component={postsListPage} />
                                <Route path="/admin/ap_type/newPost" component={newPostPage} />
                                <Route path="/admin/ap_type/categoriesList" component={categoriesListPage} />

                            </div>

                        </div>

                    </div>


                </div>

            ) : null
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);