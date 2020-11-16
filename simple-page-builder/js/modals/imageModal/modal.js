import React, { Component, Fragment } from 'react';

import NewImageModal from './newModal';
import EditImageModal from './editModal';

class ImageModal extends Component {

    render() {

        return (           

            <Fragment>

                <NewImageModal heading="Hộp thoại tạo ảnh"
                            chooseText="Tạo ảnh"                           
                            closeText="Đóng hộp thoại" /> 
                            
                <EditImageModal heading="Hộp thoại sửa ảnh"
                            chooseText="Sửa ảnh"                           
                            closeText="Đóng hộp thoại" /> 

            </Fragment>

           
        );
    }
}

export default ImageModal;
