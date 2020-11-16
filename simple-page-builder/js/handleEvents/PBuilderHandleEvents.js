import * as _ from 'libraries/libUtils';
import * as modalUtils from 'utils/modalUtils';

import { getComponentInst } from 'utils/componentUtils';

export function resetSettings() {

    const inst = getComponentInst(this.state.instName);

    inst.setState((prevState) => ({
        settings : _.getCopiedJsonObject(prevState._settings)
    }));   
    
    this.props.updateCComponentIndex(-1);

}

export function handlePreview(html) {

    const settings = _.getCopiedJsonObject(this.state.settings);

    settings.previewContent = html;

    //console.log(settings);

    this.setState({ settings : _.getCopiedJsonObject( settings ) });   

}

export function OnClick_CreateRow() {

    const UIComponents = this.props.UIComponents;
   
    UIComponents.push({

        rowIndex : UIComponents.length,
        className : 'rowFluid',        
        columns : [
            {
                className : 'columnFluid',
                widthPercent : 100,
                UIHtmls : []
            }
        ]

    });

    this.props.updateUIComponents(UIComponents);

}

export function OnClick_removeRow(rowIndex, e) {

    e.preventDefault();

    const UIComponents = this.props.UIComponents;   

    UIComponents.splice(rowIndex, 1);
    this.props.updateUIComponents(UIComponents);

    //console.log(UIComponents);
        
}

export function handleComponentUI(html) { 

    let UIComponents = this.props.UIComponents,

        CRowIndex = this.props.CRowIndex,
        CColumnIndex = this.props.CColumnIndex,
        CComponentIndex = this.props.CComponentIndex,

        /*console.log( UIComponents );
        console.log( CRowIndex );
        console.log( CColumnIndex );
        console.log( CComponentIndex );*/

        CRow = UIComponents.filter(e => e['rowIndex'] == CRowIndex )[0],
        CColumn = CRow.columns.filter((e,i) => i == CColumnIndex)[0],
        
        CComponent = {};
        
    if ( CComponentIndex == -1 ) {
        
        CComponent.id = CColumn.UIHtmls.length;
        CComponent.state = {};

    }    

    // edit component
    else { 

        CComponent = CColumn.UIHtmls.filter(e => e['id'] == CComponentIndex)[0];

        this.setState({ settings : _.getCopiedJsonObject( CComponent.state.settings ) });

    }

    
    /*console.log( CRow );
    console.log( CColumn );*/    

    //CComponent.id = CColumn.UIHtmls.length;
    //console.log(html);
    CComponent.state.settings = _.getCopiedJsonObject( this.state.settings );    
    
    CComponent.html = html.UIHtmls || null;
    CComponent.styled = html.UIStyled || null;

    if ( CComponentIndex == -1 ) {

        CColumn.UIHtmls.push( CComponent );

    }   

    //console.log( UIComponents );

    this.props.updateUIComponents( UIComponents );        

}

export function OnClick_editComponentUI(e) {

    e.preventDefault();

    const row_id = parseInt( e.currentTarget.dataset.rowId ),
          column_id = parseInt( e.currentTarget.dataset.columnId ),
          component_id = parseInt( e.currentTarget.dataset.componentId ); 
    
    this.props.updateCRowIndex(row_id);
    this.props.updateCColumnIndex(column_id);
    this.props.updateCComponentIndex(component_id);    

    let UIComponents = this.props.UIComponents,
          CRow = UIComponents.filter(e => e['rowIndex'] == row_id )[0],          
          CColumn = CRow.columns.filter((e,i) => i == column_id)[0],
          CComponent = CColumn.UIHtmls.filter(e => e['id'] == component_id)[0],
          CName = CComponent.state.settings.componentName;

    const inst = getComponentInst(`EditC${CName}Ref`);
          
    inst.setState({ settings : _.getCopiedJsonObject( CComponent.state.settings ) });      
 
    modalUtils.openPopboxModal(`Edit${CName}Modal`);

    _.scrollModalToTop();

}

export function OnClick_removeComponentUI(e) {

    e.preventDefault();

    const row_id = parseInt( e.currentTarget.dataset.rowId ),
          column_id = parseInt( e.currentTarget.dataset.columnId ),
          component_id = parseInt( e.currentTarget.dataset.componentId );
          
    let UIComponents = this.props.UIComponents,
        CRow = UIComponents.filter(e => e['rowIndex'] == row_id )[0],          
        CColumn = CRow.columns.filter((e,i) => i == column_id)[0],

        UIHtmls = CColumn.UIHtmls,

        c_index = UIHtmls.findIndex(e => e['id'] == component_id);

    if ( c_index != -1 ) {

        UIHtmls.splice(c_index, 1);

        this.props.updateUIComponents(UIComponents);

    }    

}

