const initialStates = {

    postTypesList : [],   

    deactivePostTypesList : [],    

    postTypeEditing : null    

};

export const postTypesReducer = (state = initialStates, action) => {

    if ( action.reducer === 'postTypesReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_POST_TYPES_LIST' :

                state.postTypesList = action.payload;

                return JSON.parse( JSON.stringify(state) );
            
            case 'UPDATE_DEACTIVE_POST_TYPES_LIST' :

                state.deactivePostTypesList = action.payload;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_POST_TYPE_EDITING' :

                state.postTypeEditing = action.payload;                

                return JSON.parse( JSON.stringify(state) );            

            default :

                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}