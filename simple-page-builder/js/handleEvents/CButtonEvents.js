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

import {handleValidationUrl as _handleValidationUrl} from './CImageEvents';

function getSettings__HTML() {

    let wrapperElement = {},
        styleCss = '';

    const { buttonBorderWidth, buttonBorderColorPicker, buttonHoverBorderColorPicker,
            buttonHoverBackgroundColorPicker, buttonBackgroundColorPicker, buttonTextColorPicker,
            buttonHoverTextColorPicker, 
            buttonPaddingTop, buttonPaddingBottom, buttonPaddingLeft, buttonPaddingRight,
            buttonFontSize, buttonAllCapitalize, buttonLink, buttonText } = this.state.settings;

    const _buttonBorderColor = buttonBorderColorPicker.color,
          buttonBorderColor = _buttonBorderColor.r + ',' + _buttonBorderColor.g + ',' + _buttonBorderColor.b + ',' + _buttonBorderColor.a,

          _buttonHoverBorderColor = buttonHoverBorderColorPicker.color,
          buttonHoverBorderColor = _buttonHoverBorderColor.r + ',' + _buttonHoverBorderColor.g + ',' + _buttonHoverBorderColor.b + ',' + _buttonHoverBorderColor.a,

          _buttonBackgroundColor = buttonBackgroundColorPicker.color,
          buttonBackgroundColor = _buttonBackgroundColor.r + ',' + _buttonBackgroundColor.g + ',' + _buttonBackgroundColor.b + ',' + _buttonBackgroundColor.a,

          _buttonHoverBackgroundColor = buttonHoverBackgroundColorPicker.color,
          buttonHoverBackgroundColor = _buttonHoverBackgroundColor.r + ',' + _buttonHoverBackgroundColor.g + ',' + _buttonHoverBackgroundColor.b + ',' + _buttonHoverBackgroundColor.a,

          _buttonTextColor = buttonTextColorPicker.color,
          buttonTextColor = _buttonTextColor.r + ',' + _buttonTextColor.g + ',' + _buttonTextColor.b + ',' + _buttonTextColor.a,

          _buttonHoverTextColor = buttonHoverTextColorPicker.color,
          buttonHoverTextColor = _buttonHoverTextColor.r + ',' + _buttonHoverTextColor.g + ',' + _buttonHoverTextColor.b + ',' + _buttonHoverTextColor.a,

          buttonTextTransformProperty = buttonAllCapitalize === 'true' ? 'uppercase' : 'unset';

    if ( buttonText ) {

        styleCss = `
            .pb-button {

                border: ${buttonBorderWidth}px solid rgba(${buttonBorderColor});
                font-size: ${buttonFontSize}px;
                background-color: rgba(${buttonBackgroundColor});
                color: rgba(${buttonTextColor});
                text-transform: ${buttonTextTransformProperty};
                padding: ${buttonPaddingTop}px ${buttonPaddingRight}px ${buttonPaddingBottom}px ${buttonPaddingLeft}px;


            }
            .pb-button:hover {

                border-color: rgba(${buttonHoverBorderColor}) !important;
                background-color: rgba(${buttonHoverBackgroundColor});
                color: rgba(${buttonHoverTextColor});

            }
        `;

        wrapperElement.UIHtmls = <div className="__ui_buttonWrapper">

                                    <a className="pb-button --default"
                                        href={buttonLink}
                                        target="_blank">

                                        {buttonText}

                                    </a>

                                </div>;

        wrapperElement.UIStyled = styleCss;

        return wrapperElement;

    }

    return null;

}

function handlePreview() {

    const html = getSettings__HTML.call(this);    

    _handlePreview.call(this, html);

}

function validateInputComponent() {

    const {settings} = this.state;

    if ( settings.buttonText.trim().length === 0 ) return false;
    if ( settings.buttonLink !== '#' && ! handleValidationUrl( settings.buttonLink ) ) return false;

    return true;

}

export function onClick_ShowButtonModal(e) {

    e.preventDefault();  

    const inst = getComponentInst(COMPONENTREFS.NEW_BUTTON_COMPONENT_REF);

    modalUtils.closePopboxModal(MODALIDS.ADD_ELEMENT_MODAL_ID);    
    modalUtils.openPopboxModal(MODALIDS.NEW_BUTTON_MODAL_ID);

    handlePreview.call(inst);

    _.scrollModalToTop(); 

}

export function OnClick_handleComponentUI(e) {

    e.preventDefault();    

    const inst = getComponentInst(this.state.instName);

    if ( ! validateInputComponent.call(inst) ) return;

    const html = getSettings__HTML.call(inst);

    handleComponentUI.call(inst, html);   

    modalUtils.closePopboxModal(this.state.modal_id);

    resetSettings.call(this);

}

export function OnClick_closeModal(e) {

    e.preventDefault();

    resetSettings.call(this);

    modalUtils.closePopboxModal(this.state.modal_id);

}

export function handleValidationUrl(v) {

    return _handleValidationUrl(v);
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

