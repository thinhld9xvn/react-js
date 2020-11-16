import React from 'react';
import {convertFileSize, getURLUploadPath} from 'utils/filemanager/fileUtils';
import {closePopboxModal} from 'utils/modalUtils';
 
class FileInfoModal extends React.Component {
    constructor(props) {

        super(props);          

        this.state = {
            modal_id : 'FileInfoModal'           
        };     

    }

    render() { 

        const fileSize = this.props.file_item !== null ? convertFileSize(this.props.file_item.length) : 0;

        return (            
        
            <div data-popbox-id={this.state.modal_id} className="popbox">

                <div className="popbox_container">

                    <div className="heading">{this.props.heading}</div>
                    <div className="text">
                        <div className="info-wrap overflow-hidden">

                            <div className="infoColLeft col-md-6 col-sm-6 col-xs-12">

                                <div className="file-thumbnail">
                                    <img src={this.props.file_item !== null ? getURLUploadPath().concat(this.props.file_item.thumbnail) : ''} alt={this.props.file_item !== null ? this.props.file_item.info.alt : ''} />
                                </div>

                                <div className="file-name mtop10">
                                    <strong>Tên tập tin: </strong> 
                                    {this.props.file_item !== null ? this.props.file_item.name : null}
                                </div>

                                <div className="file-type mtop10">
                                    <strong>Loại tập tin: </strong>
                                    {this.props.file_item !== null ? this.props.file_item.type.label : null}
                                </div>

                                <div className="file-image-size mtop10">
                                    <strong>Kích thước: </strong> 
                                    {this.props.file_item !== null ? ''.concat(this.props.file_item.sizes.full[0], 'x', this.props.file_item.sizes.full[1]) : null}
                                </div>

                                <div className="file-length mtop10">
                                    <strong>Dung lượng: </strong>                                  
                                    {this.props.file_item !== null ? ''.concat(fileSize.size, ' ' ,fileSize.unit) : null}
                                </div>	

                                <div className="file-datecreated mtop10">					
                                    <strong>Ngày tạo: </strong> 
                                    {this.props.file_item !== null ? this.props.file_item.datecreated : null}
                                </div>                                 
                            </div>

                            <div className="infoColRight col-md-6 col-sm-6 col-xs-12 mtop20-xs">                            

                                <div className="info-input">

                                    <label>
                                        Tiêu đề
                                    </label>  

                                    <input id="ifile-title" 
                                        type="text" 
                                        className="form-control"
                                        data-property="title"
                                        value={this.props.file_item !== null ? this.props.file_item.info.title : ''}
                                        onChange={this.props.onChange_InfoFileChanged} />

                                </div>

                                <div className="info-input mtop10">

                                    <label>
                                        Chú thích
                                    </label>

                                    <textarea id="ifile-alt" 
                                            className="form-control" 
                                            rows="3"
                                            data-property="alt"
                                            value={this.props.file_item !== null ? this.props.file_item.info.alt : ''}
                                            onChange={this.props.onChange_InfoFileChanged} />
                                
                                </div>

                                <div className="info-input mtop10">

                                    <label>
                                        Mô tả
                                    </label>

                                    <textarea id="ifile-description" 
                                            className="form-control" 
                                            rows="3"
                                            data-property="description"
                                            value={this.props.file_item !== null ? this.props.file_item.info.description : ''}
                                            onChange={this.props.onChange_InfoFileChanged} />
                                
                                </div>                           
                                
                            </div>                          

                        </div>

                    </div>

                    <div className="footer">

                        <button className="btn btn-default"
                                onClick={() => closePopboxModal(this.state.modal_id)}>{this.props.closeText}</button>

                    </div>

                </div>

            </div>
               
           
        );
    }
}

export default FileInfoModal;