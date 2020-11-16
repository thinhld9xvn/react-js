import React from 'react';
import styled from 'styled-components'
import { asyncComponent } from 'components/asyncComponent';
import { DefaultButton } from 'office-ui-fabric-react';

var componentsLoadedList = null,
    registeredComponents = [];

function getComponentsList() {

    return componentsLoadedList ? componentsLoadedList : [];

}

function getComponentId(name) {       

    return getComponentsList().findIndex(c => c.name.toLowerCase() === name.toLowerCase());
    
}

function saveComponentsList(list) {

    componentsLoadedList = list;

}

export function addComponentInst(c) {

    const componentsList = getComponentsList(),
         component = {
            name : c.name,
            instance : c.instance
         },
         id = getComponentId(c.name);    

    if ( id !== -1  ) {

        componentsList[id] = component;        
        

    } else {

        componentsList.push(component);        

    }

    saveComponentsList(componentsList);

}

export function getComponentInst(name) {    

    return getComponentsList().find(c => c.name.toLowerCase() === name.toLowerCase()).instance;

}

function addComponentButton(data) {

    registeredComponents.push(

        <DefaultButton key={data.className}
                       className={"btnCreateComponent ".concat(data.className || '')}
                       onClick={data.handleChooseButton || null}>

            <span className="fa fa-th-large"></span> 
            <span className="padleft5">{data.text || ''}</span>

        </DefaultButton>
        

    );

}

export function registerComponent(name, data) {

    asyncComponent(() => {

        return import('components/' + name);
        
    });    

    addComponentButton(data);

}

export function getRegisteredBComponentsList() {

    return registeredComponents;

}

export function getStyledComponent(reactComponent, styleCss) {

    const C = reactComponent ? reactComponent : null,
          CStyled = styleCss ? styled.div`${styleCss}` : null;
          
    return CStyled && C ? <CStyled>{C}</CStyled> : C;

    

}

export function shadowCompareColorPicker(pickerState, pickerNextState) {

    if (pickerState.display !== pickerNextState.display) return true;

    if (pickerState.color.r !== pickerNextState.color.r ||
        pickerState.color.g !== pickerNextState.color.g ||
        pickerState.color.b !== pickerNextState.color.b ||
        pickerState.color.a !== pickerNextState.color.a) return true;

    return false;

}

export function shadowCompareState(state, _state) {

    return state !== _state;

}