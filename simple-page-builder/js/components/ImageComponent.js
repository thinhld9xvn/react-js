import React, { Component, Fragment } from 'react';

import { TextField } from 'office-ui-fabric-react';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import * as _ from 'libraries/libUtils.js';

import { addComponentInst } from 'utils/componentUtils';
import { handleInputControlChanged, handleValidationUrl } from 'handleEvents/CImageEvents';
import {getStyledComponent} from 'utils/componentUtils';

const getImageSrcErrorMessage = (src) => {
    
    return handleValidationUrl(src) ? '' : 'URL ảnh không hợp lệ, mời nhập một url khác.';

};

class ImageComponent extends Component {

    constructor(props) {

        super(props);

        const settings = {

            image_src: '',
            imageSrcError : '',
            image_description : '',
            width: 0,
            height: 0,
            previewContent: '',
            componentName : 'Image'

        };

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

    render() {

        const { image_src, width, height, 
                image_description, previewContent } = this.state.settings;

        const PreviewComponent = getStyledComponent(previewContent.UIHtmls, null);

        return (

            <Fragment>

                <div className="wrapperPanel">

                    <div className="settingsPanel">

                        <div className="inputBlock imageBlock">

                            <TextField label="Đường dẫn ảnh"
                                value={image_src}
                                onChange={(e, newValue) => handleInputControlChanged.call(this, e, newValue, 'image_src')}
                                onGetErrorMessage={getImageSrcErrorMessage} />

                        </div>

                        <div className="inputBlock widthBlock">

                            <TextField label="Chiều dài của ảnh (px)"
                                readOnly
                                value={width} />

                        </div>

                        <div className="inputBlock heightBlock">

                            <TextField label="Chiều cao của ảnh (px)"
                                readOnly
                                value={height} />

                        </div>

                        <div className="inputBlock imageBlock">

                            <TextField label="Mô tả của ảnh"
                                value={image_description}
                                onChange={(e, newValue) => handleInputControlChanged.call(this, e, newValue, 'image_description')} />

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageComponent);