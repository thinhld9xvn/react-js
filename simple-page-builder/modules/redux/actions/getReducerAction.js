export const mapStateToProps = state => {    

    return {       
      
        UIComponents : state.UIComponentsReducer.UIComponents,

        CRowIndex : state.UIComponentsReducer.currentRowIndex,
        CColumnIndex : state.UIComponentsReducer.currentColumnIndex,
        CComponentIndex : state.UIComponentsReducer.currentComponentIndex,
        
        RowComponent : state.UIComponentsReducer._RowComponent,
        splitColumnsRow : state.SplitColumnsRowReducer.splitColumnsRow  

    }

};