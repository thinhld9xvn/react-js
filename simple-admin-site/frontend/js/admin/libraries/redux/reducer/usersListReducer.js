const initialStates = {

    usersList : [],   

    deactiveUsersList : [],    

    editUserModalProps : {

        userProfile : null       

    }    

};

export const usersListReducer = (state = initialStates, action) => {

    if ( action.reducer === 'usersListReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_USERS_LIST' :

                state.usersList = action.payload;

                return JSON.parse( JSON.stringify(state) );
            
            case 'UPDATE_DEACTIVE_USERS_LIST' :

                state.deactiveUsersList = action.payload;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_EDIT_USER_MODAL_PROPS' :

                state.editUserModalProps = action.payload;                

                return JSON.parse( JSON.stringify(state) );            

            default :

                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}