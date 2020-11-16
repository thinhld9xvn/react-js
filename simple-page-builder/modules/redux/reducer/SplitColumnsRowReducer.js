const initialStates = {  

    splitColumnsRow : {       

        numCols : {

            _value : 1,
            value : 1

        },

        colsPercent : {

            _value : [],
            value : []

        }

    }

};

export const SplitColumnsRowReducer = (state = initialStates, action) => {

    if ( action.reducer === 'SplitColumnsRowReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_SETTINGS' :

                state.splitColumnsRow = action.payload;              

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_NUM_COLS' :

                state.splitColumnsRow.numCols = action.numCols;

                return JSON.parse( JSON.stringify(state) );

            case 'UPDATE_COLS_PERCENT' :

                state.splitColumnsRow.colsPercent = action.colsPercent;              

                return JSON.parse( JSON.stringify(state) );

            default :

                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}