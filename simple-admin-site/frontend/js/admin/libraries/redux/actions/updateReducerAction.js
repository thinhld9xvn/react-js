export const mapDispatchToProps = dispatch => {

    return {

        updateNavBrandName : (name) => {

            dispatch({

                reducer : 'navbarInfoReducer',
                type : "UPDATE_BRAND_NAME",            
                name : name

            });

        },

        updateNavStateItems : (navinfo) => {

            dispatch({

                reducer : 'navbarInfoReducer',
                type : "UPDATE_NAV_STATE_ITEMS",            
                payload : navinfo

            });


        },
        
        updateSidebarMenu : (info) => {

            dispatch({

                reducer : 'sidebarMenuReducer',
                type : "UPDATE_SIDEBAR_MENU",            
                payload : info

            });


        },
        updateUserProfile : (userprofile) => {

            dispatch({

                reducer : 'userProfileReducer',
                type : "UPDATE_USER_PROFILE",            
                payload : userprofile

            });


        },
        updateUser_Profile : (userprofile) => {

            dispatch({

                reducer : 'userProfileReducer',
                type : "UPDATE_USER__PROFILE",            
                payload : userprofile

            });


        },
        updateUserRolesList : (rolesList) => {

            dispatch({

                reducer : 'userProfileReducer',
                type : "UPDATE_USER_ROLES_LIST",            
                payload : rolesList

            });


        },
        updateUserAvatarSrc : (avatarSrc) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_SRC",            
                avatarSrc : avatarSrc

            });


        },
        updateUserAvatarsList : (avatars_list) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATARS_LIST",            
                avatars_list : avatars_list

            });


        },
        updateUserSelectedAvatar : (id) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_SELECTED_AVATAR",            
                id : id

            });


        },        
        updateNewUserSelectedAvatar : (id) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_NEW_USER_SELECTED_AVATAR",            
                id : id

            });


        },
        updateUserAvatarLoading : (status) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_LOADING",
                status : status

            });


        },
        updateUserAvatarTimeStamp : (timeStamp) => {

            dispatch({

                reducer : 'userAvatarReducer',
                type : "UPDATE_USER_AVATAR_TIMESTAMP",
                timeStamp : timeStamp

            });


        },
        updateUsersList : (payload) => {

            dispatch({

                reducer : 'usersListReducer',
                type : "UPDATE_USERS_LIST",
                payload : payload

            });


        },        
        updateDeactiveUsersList : (payload) => {

            dispatch({

                reducer : 'usersListReducer',
                type : "UPDATE_DEACTIVE_USERS_LIST",
                payload : payload

            });


        },        
        updateEditUserModalProps : (payload) => {

            dispatch({

                reducer : 'usersListReducer',
                type : "UPDATE_EDIT_USER_MODAL_PROPS",
                payload : payload

            });


        },
        updateCurrentModeComponent : (mode) => {

            dispatch({

                reducer : 'componentReducer',
                type : "UPDATE_CURRENT_MODE_STATE",
                mode : mode

            });

        },      
        updatePostTypesList : (payload) => {

            dispatch({

                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPES_LIST",
                payload : payload

            });

        },
         updateDeactivePostTypesList : (payload) => {

            dispatch({

                reducer : 'postTypesReducer',
                type : "UPDATE_DEACTIVE_POST_TYPES_LIST",
                payload : payload

            });

        },
        updatePostTypeEditing : (payload) => {

            dispatch({

                reducer : 'postTypesReducer',
                type : "UPDATE_POST_TYPE_EDITING",
                payload : payload

            });

        }
       
    }

};