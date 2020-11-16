import * as _ from 'libraries/libUtils';
import * as modalUtils from 'utils/modalUtils';
//import {resetCTextBlockState} from './TextBlockModalEvents';
import { MODALIDS } from 'constants/constants';

export function OnClick_ShowAddElementModal(e) {

    e.preventDefault();

    const rowIndex = parseInt( e.currentTarget.dataset.rowIndex ),
          columnIndex = parseInt( e.currentTarget.dataset.columnIndex );

    this.props.updateCRowIndex(rowIndex);
    this.props.updateCColumnIndex(columnIndex);
    
    modalUtils.openPopboxModal(MODALIDS.ADD_ELEMENT_MODAL_ID);   

    _.scrollModalToTop();
    
    
}

export function onClick_CloseModal(e) {

    e.preventDefault();

    modalUtils.closePopboxModal(this.state.modal_id);

}