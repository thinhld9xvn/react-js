import React from 'react';

import * as _ from 'libraries/libUtils';
import * as modalUtils from 'utils/modalUtils';

import { getComponentInst } from 'utils/componentUtils';
import { MODALIDS, COMPONENTREFS } from 'constants/constants';

import { handleComponentUI, resetSettings, handlePreview as _handlePreview } from './PBuilderHandleEvents';

function getSettings__HTML() {

    const settings = _.getCopiedJsonObject( this.state.settings ),
          { image_src, image_description, width, height } = settings;

    const wrapperElement = {};

    wrapperElement.UIHtmls = <div className="__ui_single_image">

                                <img src={image_src} width={width} height={height} alt={image_description} />

                            </div>;

    wrapperElement.UIStyled = null;
          
    return wrapperElement;

}

function handlePreview() {
    
    const html = getSettings__HTML.call(this);

    _handlePreview.call(this, html);

}

export function handleValidationUrl(v) {

    const reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig;    

    return v.match(reg);

}

function onLoad_handleLoadedImage(image) {

    const settings = _.getCopiedJsonObject(this.state.settings);

    settings['width'] = image.width;
    settings['height'] = image.height;

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        image.remove();

        handlePreview.call(this);

    });  

}

export function onClick_ShowImageModal(e) {

    e.preventDefault();  

    const inst = getComponentInst(COMPONENTREFS.NEW_IMAGE_COMPONENT_REF);

    modalUtils.closePopboxModal(MODALIDS.ADD_ELEMENT_MODAL_ID);    
    modalUtils.openPopboxModal(MODALIDS.NEW_IMAGE_MODAL_ID);    

    handlePreview.call(inst);

    _.scrollModalToTop();   

}

export function OnClick_closeModal(e) {

    e.preventDefault(); 

    resetSettings.call(this);

    modalUtils.closePopboxModal(this.state.modal_id);

}

export function OnClick_handleComponentUI(e) {

    e.preventDefault();

    const inst = getComponentInst(this.state.instName),
          html = getSettings__HTML.call(inst);

    handleComponentUI.call(inst, html);   

    modalUtils.closePopboxModal(this.state.modal_id);

    resetSettings.call(this);

}

export function handleInputControlChanged(e, newValue, keyState) {

    const settings = _.getCopiedJsonObject(this.state.settings);

    settings[keyState] = newValue;   

    if ( keyState === 'image_src' ) { 

        settings['width'] = 0;
        settings['height'] = 0;
        settings['previewContent'] = '';

    }

    this.setState({ settings : _.getCopiedJsonObject(settings) }, () => {

        if ( keyState === 'image_src' ) {

            if ( ! handleValidationUrl(newValue) ) {
                
                return;
    
            }
    
            const image = new Image();
    
            image.src = newValue;
    
            image.addEventListener('load', () => onLoad_handleLoadedImage.call(this, image ));
    
        }

        else {

            handlePreview.call(this);

        }

    });    

}