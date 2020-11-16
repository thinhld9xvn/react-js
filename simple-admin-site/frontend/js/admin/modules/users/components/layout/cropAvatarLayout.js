import React, { PureComponent } from "react";
import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { init_CropAvatarModal, onClick_CloseCropAvatarModal } from 'handleEvents/userProfileHandleEvents';

class CropAvatarLayout extends PureComponent {

    constructor(props) {

        super(props); 

        this.state = {
            croppedImageUrl : null,
            blob : null,
            crop: {}         
            
        };

        this.onImageLoaded = this.onImageLoaded.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.makeClientCrop = this.makeClientCrop.bind(this);
        this.getCroppedImg = this.getCroppedImg.bind(this);

    }

    componentDidMount() {

        init_CropAvatarModal.call(this);

    }

    // If you setState the crop in here you should return false.
    onImageLoaded(image) {

        this.imageRef = image;

    };
    
    onCropComplete(crop) {

        this.makeClientCrop(crop);

    };
    
    onCropChange(crop, percentCrop) {

        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });        

    };
    
    async makeClientCrop(crop) {

        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            "avatar.jpg"
            );

            this.setState({ croppedImageUrl });

        }

    }
    
    getCroppedImg(image, crop, fileName) {

        const self = this;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );        

        return new Promise((resolve, reject) => {

            canvas.toBlob(blob => {                

                if ( ! blob ) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Canvas is empty");
                    return;
                }

                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);

                resolve(this.fileUrl);

                self.setState({ blob });

            }, "image/jpeg");
        });

    }
    
    render() {
        
        const { userAvatarSrc, events } = this.props,
              { crop, croppedImageUrl } = this.state;        
    
        return (

            <div>
                <div style={{ display: 'flex' }}>
                    {userAvatarSrc && (
                    <ReactCrop
                        src={userAvatarSrc}
                        crop={crop}
                        ruleOfThirds                            
                        locked={true}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                    )}
                    {croppedImageUrl && (
                        <div style={{paddingLeft : 20}}>
                            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                        </div>
                    )}                

                </div> 

                <div className="navigation" style={{ marginTop : 40 }}>
                    <button className="btn btn-primary"   
                            onClick={events.handleCropAvatar.bind(this)}                              
                            data-popbox-close={this.props.modal_id}>{this.props.chooseText}</button>

                    <button className="btn btn-default"
                            onClick={onClick_CloseCropAvatarModal.bind(this)}
                            data-popbox-close={this.props.modal_id}>{this.props.closeText}</button>
                </div>

            </div>                          
                
        );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(CropAvatarLayout);