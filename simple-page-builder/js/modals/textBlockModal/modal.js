import React, { Component, Fragment } from 'react';

import NewTextBlockModal from './newModal';
import EditTextBlockModal from './editModal';

/*const NewTextBlockModal = asyncComponent(() => {

    return import('./newModal');
    
});

const EditTextBlockModal = asyncComponent(() => {

    return import('./editModal');
    
});*/

class TextBlockModal extends Component {

    render() {

        return (           

            <Fragment>

                <NewTextBlockModal heading="Hộp thoại tạo khối văn bản"
                            chooseText="Tạo khối văn bản"                           
                            closeText="Đóng hộp thoại" /> 
                            
                <EditTextBlockModal heading="Hộp thoại sửa khối văn bản"
                            chooseText="Sửa khối văn bản"                           
                            closeText="Đóng hộp thoại" /> 

            </Fragment>

           
        );
    }
}

export default TextBlockModal;
