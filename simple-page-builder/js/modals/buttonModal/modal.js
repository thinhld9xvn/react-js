import React, { Component, Fragment } from 'react';

import NewButtonModal from './newModal';
import EditButtonModal from './editModal';

class ButtonModal extends Component {

    render() {

        return (           

            <Fragment>

                <NewButtonModal heading="Hộp thoại tạo button"
                            chooseText="Tạo button"                           
                            closeText="Đóng hộp thoại" /> 
                            
                <EditButtonModal heading="Hộp thoại sửa button"
                            chooseText="Sửa button"                           
                            closeText="Đóng hộp thoại" /> 

            </Fragment>

           
        );
    }
}

export default ButtonModal;
