import * as modalUtils from 'utils/modalUtils';
import * as _ from 'libraries/libUtils';

import { MODALIDS } from 'constants/constants';

export function OnClick_ShowDialogSplitColumns(e) {

    e.preventDefault();     

    let rowIdx = parseInt( e.currentTarget.dataset.keyItem ),

        _numCols = {
            value : 1,
            _value : 1
        },

        _colsPercent = {
            value : [],
            _value : []
        },

        numCols = {},
        colsPercent = _colsPercent,

        row = this.props.UIComponents.filter((e, i) => i === rowIdx);
       
        if ( row.length > 0 ) {

            row = row[0];

            numCols.value = numCols._value = row.columns.length;

            row.columns.map((e, i) => {

                colsPercent.value.push( e.widthPercent );

            });

            colsPercent._value = colsPercent.value.slice();            

            this.props.updateSplitColumnsRowSettings({

                numCols : numCols,
                colsPercent : colsPercent

            });

        }  

        else {           

            this.props.updateSplitColumnsRowSettings({

                numCols : _numCols,
                colsPercent : _colsPercent

            });

        }

        this.props.updateCRowIndex(rowIdx);

    modalUtils.openPopboxModal(MODALIDS.SPLIT_COLUMNS_MODAL_ID);

}

export function onClick_saveSplitColumnsSettings(e) {

    e.preventDefault();

    //console.log( this.props );

    const splitColumnsRow = this.props.splitColumnsRow,
          currentRIndex = this.props.CRowIndex,
          splitColumns = (n, p) => { // @param array p

            let num = parseInt( n ),
                UIComponents = this.props.UIComponents,
                RowComponent = this.props.RowComponent,
        
                row = UIComponents.filter((elem, index) => elem['rowIndex'] === currentRIndex)[0],
                columns = [],
                column = _.getCopiedJsonObject( RowComponent.columns[0] ),
                getUniqueColumn = function( c, k ) {
        
                    return JSON.parse( JSON.stringify( c ) );
        
                };            
        
            while ( num > 0 ) {
        
                columns.push( getUniqueColumn( column ) );
                num--;
        
            }
           
            row.columns = columns;    

            //console.log( row.columns );

            if ( row.columns.length > 1 ) {

                row.columns.map((e, i) => {

                    const widthPercent = parseInt( p[i] );                   

                    e.widthPercent = widthPercent;

                });                

            }      

            this.props.updateUIComponents(UIComponents); 
            
        
        };
        
    
    _.mapObject( splitColumnsRow, (e, i) => {

        if ( ! _.isUndefined( e.value ) && ! _.isUndefined( e._value ) ) {

            e.value = e._value;

        }

    });        

    const numCols = splitColumnsRow['numCols']['value'],
          percents = splitColumnsRow['colsPercent']['value'];

    //console.log( splitColumnsRow['colsPercent'] );

    splitColumns(numCols, percents);

    this.props.updateSplitColumnsRowSettings(splitColumnsRow);

    modalUtils.closePopboxModal(MODALIDS.SPLIT_COLUMNS_MODAL_ID);

}

export function onClick_discardSplitColumnsSettings(e) {

    e.preventDefault();

    const splitColumnsRow = this.props.splitColumnsRow;
    
    _.mapObject( splitColumnsRow, (e, i) => {        

        if ( e.value && e._value ) {

            e._value = e.value;            

        }

    });   
    
    this.props.updateSplitColumnsRowSettings(splitColumnsRow);

    //console.log( this.props.splitColumnsRow.numCols._value );

    modalUtils.closePopboxModal(MODALIDS.SPLIT_COLUMNS_MODAL_ID);

}

function resetColsPercent(v) {

    const colsPercent = this.props.splitColumnsRow['colsPercent'];

    colsPercent._value = [];

    if ( v ) {

        switch ( parseInt( v ) ) {

            case 2 :

                colsPercent._value = [50, 50];
                
                break;

            case 3 :

                colsPercent._value = [40, 30, 30];
                
                break;

            case 4 :

                colsPercent._value = [25, 25, 25, 25];
                
                break;
                
            default :                

                break;

        }         

    }    

    this.props.updateSplitColumnsRowColsPercent(colsPercent);

    //console.log( this.props.splitColumnsRow );

}

export function handleDropDownChanged(e, option, keyState) {         

    const numCols = this.props.splitColumnsRow[keyState];

    numCols._value = option.key;

    this.props.updateSplitColumnsRowNumCols(numCols);    

    resetColsPercent.call(this, option.key);

}

export function handleTextFieldChanged(e, newValue, keyState) {

    const colsPercent = this.props.splitColumnsRow[keyState],            
          val = newValue.split('-');

    if ( val.length > 0 ) {

        val.map(v => parseInt( v.toString().trim() ));

        colsPercent._value = val;

        this.props.updateSplitColumnsRowColsPercent(colsPercent);

    }

}
 