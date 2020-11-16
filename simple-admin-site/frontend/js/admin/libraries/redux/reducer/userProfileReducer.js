const initialStates = {

    userProfile : {},
    _userProfile : null,

    userRolesList : []

};

export const userProfileReducer = (state = initialStates, action) => {

    if ( action.reducer === 'userProfileReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_USER_PROFILE' :

                state.userProfile = action.payload;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_USER__PROFILE' :

                state._userProfile = action.payload;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_USER_ROLES_LIST' :

                state.userRolesList = action.payload;

                return JSON.parse( JSON.stringify(state) );

            default :

                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}