import React, { Component } from 'react';

import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import {handleTextFieldChanged, handleDropDownChanged, onClick_saveSplitColumnsSettings, 
        onClick_discardSplitColumnsSettings} from 'handleEvents/SplitColumnsModalEvents';

import { connect } from 'react-redux';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

const dropdownStyles = {
    dropdown: { width: 300 }
};

const downDownCaretIcon = () => {
    return <span className="fa fa-angle-down"></span>;
};

const columnsList = [

    { key : 1, text : '1' },
    { key : 2, text : '2' },
    { key : 3, text : '3' },
    { key : 4, text : '4' },

];

class SplitColumnsModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            modal_id : "SplitColumnsModal"
        }

        //console.log( this.props.splitColumnsRow );
        
    }   
    
    render() {

        //console.log( this.props.splitColumnsRow.numCols._value );

        return (
            <div data-popbox-id={this.state.modal_id} className="popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>

                    <div className="text">

                        <div className="inputBlock">

                            <Dropdown
                                placeholder="Mời chọn một mục"
                                label="Số cột"
                                options={columnsList}                           
                                selectedKey={this.props.splitColumnsRow.numCols._value}                                 
                                onChange={(e, option) => handleDropDownChanged.call(this, e, option, 'numCols')}
                                onRenderCaretDown={downDownCaretIcon}
                                styles={dropdownStyles}
                            />  
                              
                        </div>

                        <div className={"inputBlock ".concat(this.props.splitColumnsRow.numCols._value == 1 ? "none" : "")}>                           

                            <TextField className="txtColsPercent"    
                                        label="Tỷ lệ"                               
                                        value={this.props.splitColumnsRow.colsPercent._value.length > 0 ? this.props.splitColumnsRow.colsPercent._value.join('-') : ''}                                   
                                        onChange={(e, newValue) => handleTextFieldChanged.call(this, e, newValue, 'colsPercent')} /> 

                        </div>
                        
                    </div>

                    <div className="footer">

                        <PrimaryButton className="btnSave" 
                                        onClick={onClick_saveSplitColumnsSettings.bind(this)} 
                                        text={this.props.SaveText} />

                        <DefaultButton  onClick={onClick_discardSplitColumnsSettings.bind(this)} 
                                        text={this.props.closeText} />                       
                        
                    </div>

                </div>                    

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitColumnsModal);