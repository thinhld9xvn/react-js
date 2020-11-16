import React, { Component } from 'react';

import { PrimaryButton } from 'office-ui-fabric-react';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import {OnClick_CreateRow, OnClick_removeRow,
        OnClick_editComponentUI, OnClick_removeComponentUI} from 'handleEvents/PBuilderHandleEvents';
        
import {OnClick_ShowDialogSplitColumns} from 'handleEvents/SplitColumnsModalEvents';
import {OnClick_ShowAddElementModal} from 'handleEvents/AddElementModalEvents';

import SplitColumnsModal from 'modals/SplitColumnsModal';
import AddElementModal from 'modals/AddElementModal';

import TextBlockModal from 'modals/textBlockModal/modal';
import ImageModal from 'modals/imageModal/modal';
import ButtonModal from 'modals/buttonModal/modal';

import * as _ from 'libraries/libUtils';
import {getStyledComponent} from 'utils/componentUtils';

class RenderComponents extends Component {

    constructor(props) {

        super(props); 
        
    }

    componentDidMount() {

        const UIComponents = [];

        if ( this.props.UIComponents.length === 0 ) {

            const rowComponent = _.getCopiedJsonObject( this.props.RowComponent );

            rowComponent.rowIndex = 0;           
        
            UIComponents.push( rowComponent );            

            this.props.updateUIComponents( UIComponents );

            //console.log( UIComponents );

        }

    }    

    render() {

        const UIComponents = [],
              self = this,

            getComponentRow = (r, i) => {

                  return (

                    <div key={i} className="rowFluid">

                        <div className="rowToolbar">

                            <div className="editRow" title="Chia cột" 
                                data-key-item={i} onClick={OnClick_ShowDialogSplitColumns.bind(self)}>
                                <span className="fa fa-th"></span>
                            </div>

                            {i > 0 && (

                                <div className="removeRow" title="Xóa cột" 
                                      onClick={OnClick_removeRow.bind(self, i)}>
                                    <span className="fa fa-remove"></span>
                                </div>
                            )}

                        </div>

                        <div className="rowContainer">

                            {
                                r.columns.map((c,j) => {

                                    const styleObj = {

                                        width : c.widthPercent + '%'

                                    };

                                    let UIHtmls = [];
                                    
                                    /* 
                                        [
                                            {
                                                id : 0,
                                                state : {},
                                                html : ''
                                            },
                                            ...
                                        ]
                                    */
                                    c.UIHtmls.map(e => {

                                        //console.log(e);

                                        const _UIComponent = getStyledComponent(e.html, e.styled);

                                        UIHtmls.push( 

                                            <div key={e.id} className="_ui_component">

                                                <div className="_ui_toolbar">

                                                    <a className="__edit_component" href="#"                                                         
                                                        data-component-id={e.id}
                                                        data-column-id={j}
                                                        data-row-id={i}
                                                        onClick={OnClick_editComponentUI.bind(self)}>
                                                        
                                                        <span className="fa fa-pencil"></span>

                                                    </a>

                                                    <a className="__remove_component" href="#"                                                         
                                                        data-component-id={e.id}
                                                        data-column-id={j}
                                                        data-row-id={i}
                                                        onClick={OnClick_removeComponentUI.bind(self)}>
                                                        
                                                        <span className="fa fa-trash"></span>

                                                    </a>
                                                    
                                                </div>

                                                <div className="_ui_content">                                                   
                                                    {_UIComponent}
                                                </div>

                                            </div>

                                        );

                                    });

                                    return (
                                        <div key={"".concat("column_", i, j)} 
                                             className={c.className}
                                             style={styleObj}>
                                            {
                                                UIHtmls.length > 0 ?
                                                    <div className="components">                                                
                                                        {UIHtmls}
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <span className="addElement"
                                                  data-row-index={i}
                                                  data-column-index={j}
                                                  onClick={OnClick_ShowAddElementModal.bind(this)}></span>
                                        </div>
                                    )

                                })
                            }

                        </div>

                    </div>

                );

            };        
  
        this.props.UIComponents.map((e,i) => {

            UIComponents.push( getComponentRow(e, i) );

        }); 

        //console.log( UIComponents );

        return (

            <div>

                <div className="fluidContainerToolbar">

                    <div className="container">

                        <PrimaryButton className="btnTNavigation btnTextBlock" 
                                       onClick={OnClick_CreateRow.bind(this)}>

                            <span className="fa fa-text-height"></span>
                            <span className="caption">Tạo hàng</span>
                            
                        </PrimaryButton>                    

                    </div>                

                </div>

                <div className="fluidContainerMain">

                    <div className="container">

                        {UIComponents}

                    </div>

                </div>

                <SplitColumnsModal heading="Hộp thoại chia cột"
                               SaveText="Chia cột"
                               closeText="Đóng hộp thoại" />

                <AddElementModal heading="Hộp thoại thêm phần tử"
                               closeText="Đóng hộp thoại" />

                <TextBlockModal />                
                <ImageModal />
                <ButtonModal />

            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponents);