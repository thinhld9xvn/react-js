import React, { Component } from 'react';

import { loadTheme, createTheme } from 'office-ui-fabric-react';
import { registerIcons } from '@uifabric/styling';

import "regenerator-runtime/runtime";
import "core-js/stable"; // or a more selective import such as "core-js/es/array"

import RenderComponents from 'components/renderComponents';
import { registerComponent } from 'utils/componentUtils';

import { onClick_ShowTextBlockModal } from 'handleEvents/CTextBlockEvents';
import { onClick_ShowImageModal } from 'handleEvents/CImageEvents';
import { onClick_ShowButtonModal } from 'handleEvents/CButtonEvents';

class PageBuilder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true
        };

    }

    registerTextBlockComponent() {

        const data = {

            className: 'btnCreateTextBlock',
            text: 'Text Block',
            handleChooseButton: onClick_ShowTextBlockModal

        };

        registerComponent('TextBlockComponent', data);

    }

    registerImageComponent() {

        const data = {

            className: 'btnCreateImage',
            text: 'Image',
            handleChooseButton: onClick_ShowImageModal

        };

        registerComponent('ImageComponent', data);

    }

    registerButtonComponent() {

        const data = {

            className: 'btnCreateButton',
            text: 'Button',
            handleChooseButton: onClick_ShowButtonModal

        };

        registerComponent('ButtonComponent', data);

    }

    componentDidMount() {    
        
        registerIcons({
            icons: {
                ChevronUpSmall: <span className="fa fa-angle-up"></span>,
                ChevronDownSmall: <span className="fa fa-angle-down"></span>,
                ChevronDown: <span className="fa fa-angle-down"></span>,
            }
          });
        

        loadTheme(createTheme({
            defaultFontStyle: { fontFamily: 'Tahoma', fontWeight: 400 },
            fonts: {
              small: { fontSize: 14 }
            }
          }));

        this.registerTextBlockComponent();
        this.registerImageComponent();
        this.registerButtonComponent();

        this.setState({
            loading: false
        });

    }

    render() {

        return (

            !this.state.loading && (

                <div>

                    <RenderComponents />

                </div>

            )

        );
    }
}

export default PageBuilder;