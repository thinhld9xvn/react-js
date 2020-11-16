import React, { Component } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

import { connect } from 'react-redux';

import {onClick_CloseModal} from 'handleEvents/AddElementModalEvents';

import { mapStateToProps } from "modules/redux/actions/getReducerAction";
import { mapDispatchToProps } from "modules/redux/actions/updateReducerAction";

import { getRegisteredBComponentsList } from 'utils/componentUtils';

class AddElementModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            modal_id : 'AddElementModal',
            registeredCButtonsList : [],
            loading : true

        };

    }
    
    componentDidMount() {

        const lists = getRegisteredBComponentsList();

        this.setState({

            registeredCButtonsList : lists,
            loading : false

        });
        
    }

    render() {

        const { registeredCButtonsList } = this.state;        

        return (

            ! this.state.loading && (        

                <div id={this.state.modal_id}
                    data-popbox-id={this.state.modal_id}
                    className="popbox AddElementModal">

                    <div className="popbox_container">

                        <div className="heading">{this.props.heading}</div>
                        <div className="text">

                            {registeredCButtonsList}
                            
                        </div>

                        <div className="footer">    
                            <DefaultButton text={this.props.closeText}
                                           onClick={onClick_CloseModal.bind(this)} />
                        </div>

                    </div>                    

                </div>

            )

        );

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddElementModal);