import React, { Component, Fragment } from 'react';

import { SketchPicker } from 'react-color';

import { TextField } from 'office-ui-fabric-react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import reactCSS from 'reactcss';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import * as _ from 'libraries/libUtils.js';
import { getStyledComponent } from 'utils/componentUtils';

import { addComponentInst } from 'utils/componentUtils';
import {
    handleTextFieldChanged,
    handleDropDownChanged,
    handleSpinButtonControlChanged,
    OnClick_ColorPickerToggleState,
    OnClick_ColorPickerClose,
    OnChange_ColorPickerChooseColor,
    handleValidationUrl
} from 'handleEvents/CButtonEvents';

import { shadowCompareColorPicker, shadowCompareState } from 'utils/componentUtils';

import 'css/pbButton.min.css';
import 'css/fabric.min.css';

const settings = {

    buttonBorderWidth: 2,
    buttonBorderColorPicker: {

        display: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        }

    },
    buttonHoverBorderColorPicker: {

        display: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        }

    },
    buttonBackgroundColorPicker: {

        display: false,
        color: {
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        }

    },
    buttonHoverBackgroundColorPicker: {

        display: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        }

    },
    buttonTextColorPicker: {

        display: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
            a: '1',
        }

    },
    buttonHoverTextColorPicker: {

        display: false,
        color: {
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        }

    },
    buttonFontSize: 14,
    buttonAllCapitalize: 'false',
    buttonText: 'demo button',
    buttonLink: '#',
    buttonPaddingTop : 10,
    buttonPaddingBottom : 10,
    buttonPaddingLeft : 20,
    buttonPaddingRight : 20,
    previewContent: '',
    componentName: 'Button'

};

const buttonAllCapitalizeList = [
    { key: 'true', text: 'Có' },
    { key: 'false', text: 'Không' }
];

const dropdownStyles = {
    dropdown: { width: 300 }
};

const buttonFontSizeData = {

    min : 1,
    max : 50,
    step : 1

};

const buttonBorderWidthData = {

    min : 1,
    max : 10,
    step : 1

};

const buttonPaddingData = {

    min : 1,
    max : 50,
    step : 1

};

const buttonPaddingTopStyles = {

    root : {

        width: "50px",
        position: "absolute",
        top: "0",
        left: "86px"

    }

};

const buttonPaddingBottomStyles = {

    root : {

        width: "50px",
        position: "absolute",
        top: "100px",
        left: "86px"

    }

};

const buttonPaddingLeftStyles = {

    root : {

        width: "50px",
        position: "absolute",
        top: "50px",
        left: "0"

    }

};

const buttonPaddingRightStyles = {

    root : {

        width: "50px",
        position: "absolute",
        top: "50px",
        left: "172px"

    }

};

class ButtonComponent extends Component {

    constructor(props) {

        super(props);

        this.state = {

            settings: _.getCopiedJsonObject(settings),
            _settings: _.getCopiedJsonObject(settings),
            instName: props.instName

        };

    }

    componentDidMount() {

        addComponentInst({
            name: this.state.instName,
            instance: this
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        
        const settings = this.state.settings,
            nextSettings = nextState.settings;

        if (shadowCompareState(settings.buttonBorderWidth, nextSettings.buttonBorderWidth)) return true;

        if (shadowCompareState(settings.buttonText, nextSettings.buttonText)) return true;
        if (shadowCompareState(settings.buttonLink, nextSettings.buttonLink)) return true;

        if (shadowCompareState(settings.buttonFontSize, nextSettings.buttonFontSize)) return true;

        if (shadowCompareState(settings.buttonAllCapitalize, nextSettings.buttonAllCapitalize)) return true;

        if (shadowCompareState(settings.previewContent, nextSettings.previewContent)) return true;

        if (shadowCompareColorPicker(settings.buttonBorderColorPicker, nextSettings.buttonBorderColorPicker)) return true;

        if (shadowCompareColorPicker(settings.buttonHoverBorderColorPicker, nextSettings.buttonHoverBorderColorPicker)) return true;

        if (shadowCompareColorPicker(settings.buttonBackgroundColorPicker, nextSettings.buttonBackgroundColorPicker)) return true;

        if (shadowCompareColorPicker(settings.buttonHoverBackgroundColorPicker, nextSettings.buttonHoverBackgroundColorPicker)) return true;

        if (shadowCompareColorPicker(settings.buttonTextColorPicker, nextSettings.buttonTextColorPicker)) return true;

        if (shadowCompareColorPicker(settings.buttonHoverTextColorPicker, nextSettings.buttonHoverTextColorPicker)) return true;       


        return false;

    }    

    getButtonLinkErrorMessage(href) {        
 
        if ( href === '#' || handleValidationUrl(href) ) { 
    
            return '';
    
        }        
        
        return 'URL không hợp lệ, mời nhập một url khác.';
    
    }

    getButtonTextErrorMessage(v) {        

        if ( v.trim().length > 0 ) {
            
            return '';
    
        }
        
        return 'Nội dung button không được bỏ trắng.';
    
    }

    render() {

        const { buttonText, buttonLink, buttonFontSize, buttonAllCapitalize, buttonBorderWidth,
            buttonPaddingTop, buttonPaddingBottom, buttonPaddingLeft, buttonPaddingRight,
            buttonBorderColorPicker, buttonHoverBorderColorPicker,
            buttonBackgroundColorPicker, buttonHoverBackgroundColorPicker,
            buttonTextColorPicker, buttonHoverTextColorPicker, previewContent } = this.state.settings;

        const colorPickerStyles = reactCSS({
            'default': {
                buttonBorderColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonBorderColorPicker.color.r}, ${buttonBorderColorPicker.color.g}, ${buttonBorderColorPicker.color.b}, ${buttonBorderColorPicker.color.a})`,
                },
                buttonHoverBorderColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonHoverBorderColorPicker.color.r}, ${buttonHoverBorderColorPicker.color.g}, ${buttonHoverBorderColorPicker.color.b}, ${buttonHoverBorderColorPicker.color.a})`,
                },
                buttonBackgroundColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonBackgroundColorPicker.color.r}, ${buttonBackgroundColorPicker.color.g}, ${buttonBackgroundColorPicker.color.b}, ${buttonBackgroundColorPicker.color.a})`,
                },
                buttonHoverBackgroundColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonHoverBackgroundColorPicker.color.r}, ${buttonHoverBackgroundColorPicker.color.g}, ${buttonHoverBackgroundColorPicker.color.b}, ${buttonHoverBackgroundColorPicker.color.a})`,
                },
                buttonTextColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonTextColorPicker.color.r}, ${buttonTextColorPicker.color.g}, ${buttonTextColorPicker.color.b}, ${buttonTextColorPicker.color.a})`,
                },
                buttonHoverTextColorPicker: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${buttonHoverTextColorPicker.color.r}, ${buttonHoverTextColorPicker.color.g}, ${buttonHoverTextColorPicker.color.b}, ${buttonHoverTextColorPicker.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'fixed',
                    zIndex: '2',
                    top: 'calc(50% - 160px)',
                    top: '-webkit-calc(50% - 160px)'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        const PreviewComponent = previewContent ? getStyledComponent(previewContent.UIHtmls, previewContent.UIStyled) : null;

        return (

            <Fragment>

                <div className="wrapperPanel">

                    <div className="settingsPanel">

                        <div className="inputBlock buttonTextBlock">

                            <TextField label="Nội dung button"
                                value={buttonText}
                                onChange={handleTextFieldChanged.bind(this, 'buttonText')} 
                                onGetErrorMessage={this.getButtonTextErrorMessage.bind(this)}

                                />

                        </div>

                        <div className="inputBlock buttonLinkBlock">

                            <TextField label="Đường dẫn (Link) button"
                                value={buttonLink}
                                onChange={handleTextFieldChanged.bind(this, 'buttonLink')} 
                                onGetErrorMessage={this.getButtonLinkErrorMessage.bind(this)}
                                />

                        </div>

                        <div className="inputBlock ms-spinButton buttonBlock_fontSize">

                            <SpinButton label="Kích cỡ font chữ button (px)"
                                min={buttonFontSizeData.min}
                                max={buttonFontSizeData.max}                          
                                step={buttonFontSizeData.step}
                                value={buttonFontSize}
                                onIncrement={handleSpinButtonControlChanged.bind(this, buttonFontSizeData, 'increment', 'buttonFontSize')}
                                onDecrement={handleSpinButtonControlChanged.bind(this, buttonFontSizeData, 'decrement', 'buttonFontSize')}
                                 />

                        </div>

                        <div className="inputBlock ms-spinButton buttonBlock_borderWidth">

                            <SpinButton label="Kích cỡ độ rộng đường viền (border width) button (px)" 
                                min={buttonBorderWidthData.min}
                                max={buttonBorderWidthData.max}
                                step={buttonBorderWidthData.step}                             
                                value={buttonBorderWidth}
                                onIncrement={handleSpinButtonControlChanged.bind(this,  buttonBorderWidthData, 'increment', 'buttonBorderWidth')}
                                onDecrement={handleSpinButtonControlChanged.bind(this, buttonBorderWidthData, 'decrement', 'buttonBorderWidth')}
                                />

                        </div>

                        <div className="inputBlock buttonBlock_borderWidth">

                            <label>
                                Khoảng cách giữa text và các cạnh của button (padding - px)
                            </label>

                            <div style={{ position: 'relative', marginTop: 10, height: 132 }}>

                                <SpinButton
                                    styles={buttonPaddingTopStyles}
                                    min={buttonPaddingData.min}
                                    max={buttonPaddingData.max}
                                    step={buttonPaddingData.step}                             
                                    value={buttonPaddingTop}
                                    onIncrement={handleSpinButtonControlChanged.bind(this,  buttonPaddingData, 'increment', 'buttonPaddingTop')}
                                    onDecrement={handleSpinButtonControlChanged.bind(this, buttonPaddingData, 'decrement', 'buttonPaddingTop')}
                                    />

                                <SpinButton
                                    styles={buttonPaddingBottomStyles}
                                    min={buttonPaddingData.min}
                                    max={buttonPaddingData.max}
                                    step={buttonPaddingData.step}                             
                                    value={buttonPaddingBottom}
                                    onIncrement={handleSpinButtonControlChanged.bind(this,  buttonPaddingData, 'increment', 'buttonPaddingBottom')}
                                    onDecrement={handleSpinButtonControlChanged.bind(this, buttonPaddingData, 'decrement', 'buttonPaddingBottom')}
                                    />

                                <SpinButton
                                    styles={buttonPaddingLeftStyles}
                                    min={buttonPaddingData.min}
                                    max={buttonPaddingData.max}
                                    step={buttonPaddingData.step}                             
                                    value={buttonPaddingLeft}
                                    onIncrement={handleSpinButtonControlChanged.bind(this,  buttonPaddingData, 'increment', 'buttonPaddingLeft')}
                                    onDecrement={handleSpinButtonControlChanged.bind(this, buttonPaddingData, 'decrement', 'buttonPaddingLeft')}
                                    />

                                <SpinButton
                                    styles={buttonPaddingRightStyles}
                                    min={buttonPaddingData.min}
                                    max={buttonPaddingData.max}
                                    step={buttonPaddingData.step}                             
                                    value={buttonPaddingRight}
                                    onIncrement={handleSpinButtonControlChanged.bind(this,  buttonPaddingData, 'increment', 'buttonPaddingRight')}
                                    onDecrement={handleSpinButtonControlChanged.bind(this, buttonPaddingData, 'decrement', 'buttonPaddingRight')}
                                    />

                            </div>

                           

                        </div>

                        <div className="inputBlock buttonBlock_Capitalize">

                            <Dropdown
                                placeholder="Mời chọn một mục"
                                label="Viết hoa toàn bộ nội dung button"
                                options={buttonAllCapitalizeList}
                                selectedKey={buttonAllCapitalize}
                                onChange={handleDropDownChanged.bind(this, 'buttonAllCapitalize')}                                
                                styles={dropdownStyles}
                            />


                        </div>

                        <div className="inputBlock buttonBorderBlock_Color">

                            <label>Màu sắc đường viền (border) button</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonBorderColorPicker')}>
                                        <div style={colorPickerStyles.buttonBorderColorPicker} />
                                    </div>
                                    {buttonBorderColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonBorderColorPicker')} />
                                        <SketchPicker color={buttonBorderColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonBorderColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>

                        <div className="inputBlock buttonBorderHoverBlock_Color">

                            <label>Màu sắc đường viền (border) button khi di chuột vào</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonHoverBorderColorPicker')}>
                                        <div style={colorPickerStyles.buttonHoverBorderColorPicker} />
                                    </div>
                                    {buttonHoverBorderColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonHoverBorderColorPicker')} />
                                        <SketchPicker color={buttonHoverBorderColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonHoverBorderColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>

                        <div className="inputBlock buttonBackgroundBlock_Color">

                            <label>Màu sắc nền (background) button</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonBackgroundColorPicker')}>
                                        <div style={colorPickerStyles.buttonBackgroundColorPicker} />
                                    </div>
                                    {buttonBackgroundColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonBackgroundColorPicker')} />
                                        <SketchPicker color={buttonBackgroundColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonBackgroundColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>

                        <div className="inputBlock buttonHoverBackgroundBlock_Color">

                            <label>Màu sắc nền (background) button khi di chuột vào</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonHoverBackgroundColorPicker')}>
                                        <div style={colorPickerStyles.buttonHoverBackgroundColorPicker} />
                                    </div>
                                    {buttonHoverBackgroundColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonHoverBackgroundColorPicker')} />
                                        <SketchPicker color={buttonHoverBackgroundColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonHoverBackgroundColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>

                        <div className="inputBlock buttonTextBlock_Color">

                            <label>Màu sắc chữ (foreground) button</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonTextColorPicker')}>
                                        <div style={colorPickerStyles.buttonTextColorPicker} />
                                    </div>
                                    {buttonTextColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonTextColorPicker')} />
                                        <SketchPicker color={buttonTextColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonTextColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>

                        <div className="inputBlock buttonTextBlock_Color">

                            <label>Màu sắc chữ (foreground) button khi di chuột vào</label>

                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'buttonHoverTextColorPicker')}>
                                        <div style={colorPickerStyles.buttonHoverTextColorPicker} />
                                    </div>
                                    {buttonHoverTextColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'buttonHoverTextColorPicker')} />
                                        <SketchPicker color={buttonHoverTextColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'buttonHoverTextColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>

                        </div>


                    </div>

                    <div className="previewPanel">

                        {PreviewComponent}

                    </div>

                </div>

            </Fragment>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);