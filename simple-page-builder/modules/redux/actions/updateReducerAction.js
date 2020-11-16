export const mapDispatchToProps = dispatch => {

    return {

        updateUIComponents : (ui) => {

            //console.log(ui);

            dispatch({

                reducer : 'UIComponentsReducer',
                type : "UPDATE_UI_COMPONENTS",            
                payload : ui

            });

        },

        updateCRowIndex : (index) => {

            dispatch({

                reducer : 'UIComponentsReducer',
                type : "UPDATE_CROW_INDEX",            
                index : index

            });

        },

        updateCColumnIndex : (index) => {

            dispatch({

                reducer : 'UIComponentsReducer',
                type : "UPDATE_CCOLUMN_INDEX",            
                index : index

            });

        },

        updateCComponentIndex : (index) => {

            dispatch({

                reducer : 'UIComponentsReducer',
                type : "UPDATE_CCOMPONENT_INDEX",            
                index : index

            });


        },

        updateSplitColumnsRowSettings : (settings) => {

            //console.log(ui);

            dispatch({

                reducer : 'SplitColumnsRowReducer',
                type : "UPDATE_SETTINGS",            
                payload : settings

            });

        },

        updateSplitColumnsRowNumCols : (numCols) => {

            //console.log(ui);

            dispatch({

                reducer : 'SplitColumnsRowReducer',
                type : "UPDATE_NUM_COLS",            
                numCols : numCols

            });

        },

        updateSplitColumnsRowColsPercent : (colsPercent) => {

            //console.log(ui);

            dispatch({

                reducer : 'SplitColumnsRowReducer',
                type : "UPDATE_COLS_PERCENT",            
                colsPercent : colsPercent

            });

        }


    }

};