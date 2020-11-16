import React from 'react';

import * as _ from 'libraries/libUtils';
import * as modalUtils from 'utils/modalUtils';

import { getComponentInst } from 'utils/componentUtils';

import { MODALIDS, COMPONENTREFS } from 'constants/constants';
import { handleComponentUI, resetSettings, handlePreview as _handlePreview } from './PBuilderHandleEvents';

import {handleTextFieldChanged as _handleTextFieldChanged, 
        handleSpinButtonControlChanged as _handleSpinButtonControlChanged,
        handleGroupChoiceChanged as _handleGroupChoiceChanged,
        handleDropDownChanged as _handleDropDownChanged} from './global/handleChangedEvents';

import {OnClick_ColorPickerToggleState as _OnClick_ColorPickerToggleState,
        OnClick_ColorPickerClose as _OnClick_ColorPickerClose,
        OnChange_ColorPickerChooseColor as _OnChange_ColorPickerChooseColor} from './global/colorPickerEvents';

function getSettings__HTML() {

    let wrapperElement = {},
        headingElement = null,
        contentElement = null;

    const { headingText, headingType, headingFontSize, headingAllCapitalize,
        headingColorPicker, contentBlockHTML }  = this.state.settings,

        headingTextTransformProperty = headingAllCapitalize === 'true' ? 'uppercase' : 'unset',

        _headingColor = headingColorPicker.color,
        headingColor = _headingColor.r + ',' + _headingColor.g + ',' + _headingColor.b + ',' + _headingColor.a;

    let styleCss = '';

    if ( headingText ) {

        switch ( headingType ) {

            case 'h1' :

                headingElement = <h1 className="__ui_headingElement">{headingText}</h1>;

                break;

            case 'h2' :

                headingElement = <h2 className="__ui_headingElement">{headingText}</h2>;

                break;

            case 'h3' :

                headingElement = <h3 className="__ui_headingElement">{headingText}</h3>;
                break;

            default :
                break;

        } 

        styleCss = `

            .__ui_headingElement {

                font-size : ${headingFontSize}px;
                text-transform : ${headingTextTransformProperty};
                color : rgba(${headingColor})

            }

        `;
        
    }    
    
    if ( contentBlockHTML ) {

        contentElement = <div className="__ui_textBlockContent"
                               dangerouslySetInnerHTML={{__html : contentBlockHTML}} ></div>;

    }    

    if ( headingElement || contentElement ) {

        wrapperElement.UIHtmls = <div className="__ui_textBlockWrapper">

                                        {headingElement}
                                        {contentElement}
                                    
                                </div>; 

        wrapperElement.UIStyled = styleCss || null;

        return wrapperElement;

    }

    //console.log(html);

    return null;


}

function handlePreview() {
    
    const html = getSettings__HTML.call(this);

    _handlePreview.call(this, html);

}

export function onClick_ShowTextBlockModal(e) {

    e.preventDefault();  

    const inst = getComponentInst(COMPONENTREFS.NEW_TEXT_BLOCK_COMPONENT_REF);

    modalUtils.closePopboxModal(MODALIDS.ADD_ELEMENT_MODAL_ID);    
    modalUtils.openPopboxModal(MODALIDS.NEW_TEXT_BLOCK_MODAL_ID);

    handlePreview.call(inst);

    _.scrollModalToTop();   

}

export function OnClick_handleComponentUI(e) {

    e.preventDefault();

    const inst = getComponentInst(this.state.instName),
          html = getSettings__HTML.call(inst);

    handleComponentUI.call(inst, html);   

    modalUtils.closePopboxModal(this.state.modal_id);

    resetSettings.call(this);

}

export function OnClick_closeModal(e) {

    e.preventDefault();

    //const inst = document.myReactPB.textBlockComponentRef;

    resetSettings.call(this);

    modalUtils.closePopboxModal(this.state.modal_id);

    //console.log(this.state);

}

export function handleEditorChange(content, editor) {

    const settings = _.getCopiedJsonObject( this.state.settings );
         
    settings.contentBlockHTML = content;

    this.setState({ settings : _.getCopiedJsonObject(settings) });

    handlePreview.call(this);
}

//#region global handle Changed

export function handleTextFieldChanged(field, e, newValue) { 

    _handleTextFieldChanged.call(this, field, handlePreview, e, newValue);  

}

export function handleSpinButtonControlChanged(data, action, field, value) {

    _handleSpinButtonControlChanged.call(this, data, action, field, handlePreview, value);

}

export function handleGroupChoiceChanged(field, e, option) {  

   _handleGroupChoiceChanged.call(this, field, handlePreview, e, option);

}

export function handleDropDownChanged(field, e, option) {  

    handleGroupChoiceChanged.call(this, field, e, option);

}

export function OnClick_ColorPickerToggleState(field, e) {   

    _OnClick_ColorPickerToggleState.call(this, field, e);

}

export function OnClick_ColorPickerClose(field, e) {   
    
    _OnClick_ColorPickerClose.call(this, field, e);

}

export function OnChange_ColorPickerChooseColor(field, color, e) {    

    _OnChange_ColorPickerChooseColor.call(this, field, handlePreview, color, e);

}

//#endregion

