import * as _ from 'libraries/libUtils';

const initialStates = {

    _RowComponent : {

        rowIndex : -1,
        className : 'rowFluid',       
        columns : [{

            className : 'columnFluid',
            widthPercent : 100,
            UIHtmls : []

        }]               

    },

    currentRowIndex : -1,
    currentColumnIndex : -1,
    currentComponentIndex : -1,

    UIComponents : []

};

export const UIComponentsReducer = (state = initialStates, action) => {

    if ( action.reducer === 'UIComponentsReducer' ) {

        switch ( action.type ) {

            case 'UPDATE_UI_COMPONENTS' :

                state.UIComponents = action.payload;

                //console.log( JSON.parse( JSON.stringify(state) ) );

                return _.getCopiedJsonObject(state);

            case 'UPDATE_CROW_INDEX' :

                state.currentRowIndex = action.index;

                return _.getCopiedJsonObject(state);

            case 'UPDATE_CCOLUMN_INDEX' :

                state.currentColumnIndex = action.index;

                return _.getCopiedJsonObject(state);

            case 'UPDATE_CCOMPONENT_INDEX' :

                state.currentComponentIndex = action.index;

                return _.getCopiedJsonObject(state);

            default :

                break;

        }

    }

    return _.getCopiedJsonObject(state);

}