import React, { Component, Fragment } from 'react';

import { TextField } from 'office-ui-fabric-react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import reactCSS from 'reactcss';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import { SketchPicker } from 'react-color';

import { Editor } from '@tinymce/tinymce-react';

import {
    OnClick_ColorPickerToggleState, OnClick_ColorPickerClose, handleTextFieldChanged,
    OnChange_ColorPickerChooseColor, handleEditorChange,
    handleGroupChoiceChanged, handleSpinButtonControlChanged, handleDropDownChanged
} from 'handleEvents/CTextBlockEvents';

import { addComponentInst } from 'utils/componentUtils';
import { tinyMCEAPI } from 'constants/tinyMCEAPI';

import * as _ from 'libraries/libUtils.js';
import { getStyledComponent } from 'utils/componentUtils';

import { shadowCompareColorPicker, shadowCompareState } from 'utils/componentUtils';

import 'css/fabric.min.css';

const headingTypesList = [

    {
        key: 'h1', text: 'H1'
    },

    {
        key: 'h2', text: 'H2'
    },

    {
        key: 'h3', text: 'H3'
    }

];

const headingAllCapitalizeList = [
    { key: 'true', text: 'Có' },
    { key: 'false', text: 'Không' }
];

const dropdownStyles = {
    dropdown: { width: 300 }
};

const headingFontSizeData = {

    min : 1,
    max : 50,
    step : 1

};

class TextBlockComponent extends Component {

    constructor(props) {

        super(props);

        const defaultSettings = {
            headingText: '',
            headingType: 'h1',
            headingFontSize: 30,
            headingAllCapitalize: 'false',
            headingColorPicker: {

                display: false,
                color: {
                    r: '0',
                    g: '0',
                    b: '0',
                    a: '1',
                }

            },
            contentBlockHTML: '<p>Mời nhập một vài nội dung ...</p>',
            previewContent: '',
            componentName: 'TextBlock'
        };

        this.state = {

            settings: _.getCopiedJsonObject(defaultSettings),
            _settings: _.getCopiedJsonObject(defaultSettings),

            instName: props.instName

        }

    }

    shouldComponentUpdate(nextProps, nextState) {

        const settings = this.state.settings,
            nextSettings = nextState.settings;

        if (shadowCompareState(settings.headingText, nextSettings.headingText)) return true;
        if (shadowCompareState(settings.headingType, nextSettings.headingType)) return true;
        if (shadowCompareState(settings.headingFontSize, nextSettings.headingFontSize)) return true;
        if (shadowCompareState(settings.headingAllCapitalize, nextSettings.headingAllCapitalize)) return true;
        if (shadowCompareState(settings.contentBlockHTML, nextSettings.contentBlockHTML)) return true;
        if (shadowCompareState(settings.previewContent, nextSettings.previewContent)) return true;

        if (shadowCompareColorPicker(settings.headingColorPicker, nextSettings.headingColorPicker)) return true;

        return false;

    }

    componentDidMount() {

        addComponentInst({
            name: this.state.instName,
            instance: this
        });

        this.ChoiceGroupLabelClick();

    }

    ChoiceGroupLabelClick() {

        document.querySelectorAll('label.ms-ChoiceField-field')
            .forEach(element => {

                element.addEventListener('click', (e) => {

                    document.getElementById(e.currentTarget.getAttribute('for')).click();

                });

            });

    }

    render() {

        const { headingText, headingType, headingFontSize,
            headingAllCapitalize, contentBlockHTML, previewContent, headingColorPicker } = this.state.settings;

        const colorPickerStyles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${headingColorPicker.color.r}, ${headingColorPicker.color.g}, ${headingColorPicker.color.b}, ${headingColorPicker.color.a})`,
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

                        <div className="inputBlock headingBlock">

                            <TextField label="Tiêu đề heading"
                                value={headingText}                                
                                onChange={handleTextFieldChanged.bind(this, 'headingText')} />

                        </div>

                        <div className="inputBlock headingBlock_Type">

                            <ChoiceGroup options={headingTypesList}
                                onChange={handleGroupChoiceChanged.bind(this, 'headingType')}
                                selectedKey={headingType}
                                label="Loại thẻ heading" />


                        </div>

                        <div className="inputBlock ms-spinButton headingBlock_Size">

                            <SpinButton label="Kích thước heading (px)"
                                min={headingFontSizeData.min}
                                max={headingFontSizeData.max}
                                step={headingFontSizeData.step}
                                value={headingFontSize}
                                onIncrement={handleSpinButtonControlChanged.bind(this, headingFontSizeData, 'increment', 'headingFontSize')}
                                onDecrement={handleSpinButtonControlChanged.bind(this, headingFontSizeData, 'decrement', 'headingFontSize')}
                                showValue
                                snapToStep />

                        </div>

                        <div className="inputBlock headingBlock_Color">
                            <label>Màu sắc cho heading</label>
                            <div className="mtop10 padleft10" style={{ position: 'relative' }}>

                                <div>
                                    <div style={colorPickerStyles.swatch} onClick={OnClick_ColorPickerToggleState.bind(this, 'headingColorPicker')}>
                                        <div style={colorPickerStyles.color} />
                                    </div>
                                    {headingColorPicker.display ? <div style={colorPickerStyles.popover}>
                                        <div style={colorPickerStyles.cover} onClick={OnClick_ColorPickerClose.bind(this, 'headingColorPicker')} />
                                        <SketchPicker color={headingColorPicker.color} onChange={OnChange_ColorPickerChooseColor.bind(this, 'headingColorPicker')} />
                                    </div> : null}

                                </div>

                            </div>
                        </div>

                        <div className="inputBlock headingBlock_Capitalize">

                            <Dropdown
                                placeholder="Mời chọn một mục"
                                label="Viết hoa toàn bộ"
                                options={headingAllCapitalizeList}
                                selectedKey={headingAllCapitalize}
                                onChange={handleDropDownChanged.bind(this, 'headingAllCapitalize')}                             
                                styles={dropdownStyles}
                            />


                        </div>

                        <div className="inputBlock headingBlock">

                            <label>Nội dung khối văn bản</label>

                            <Editor
                                apiKey={tinyMCEAPI}
                                value={contentBlockHTML}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    content_css: "/css/tinymce_content.min.css",
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | image | removeformat | help'
                                }}
                                onEditorChange={handleEditorChange.bind(this)}
                            />

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
export default connect(mapStateToProps, mapDispatchToProps)(TextBlockComponent);