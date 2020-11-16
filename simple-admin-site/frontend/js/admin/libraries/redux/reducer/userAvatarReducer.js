const initialStates = {

    userAvatarSrc : null,

    avatars_list : [],

    selected_avatar : 0,
    new_user_selected_avatar : 0,

    avatarTimeStamp : 0,   

    is_ajax_loading : false

};

export const userAvatarReducer = (state = initialStates, action) => {

    if ( action.reducer === 'userAvatarReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_USER_AVATAR_SRC' :

                state.userAvatarSrc = action.avatarSrc;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_USER_AVATARS_LIST' :

                state.avatars_list = action.avatars_list;

                return JSON.parse( JSON.stringify(state) );   

            case 'UPDATE_USER_SELECTED_AVATAR' :

                state.selected_avatar = action.id;

                return JSON.parse( JSON.stringify(state) ); 

            case 'UPDATE_NEW_USER_SELECTED_AVATAR' :

                state.new_user_selected_avatar = action.id;
    
                return JSON.parse( JSON.stringify(state) ); 
                     
            case 'UPDATE_USER_AVATAR_LOADING' :

                state.is_ajax_loading = action.status;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_USER_AVATAR_TIMESTAMP' :

                state.avatarTimeStamp = action.timeStamp;

                return JSON.parse( JSON.stringify(state) );

            default :

                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}