import React, { Component } from 'react';

import { connect } from 'react-redux';

import { mapStateToProps } from "libraries/redux/actions/getReducerAction";
import { mapDispatchToProps } from "libraries/redux/actions/updateReducerAction";

import {getUserAvatarsList} from 'utils/membershipUtils';

import {FPROFILE_AVATAR_DIR_URL} from 'constants/urlConstants';

import { isUserProfilePage, isNewUserPage, isAllUsersPage } from 'utils/UrlUtils';

import AjaxLoading from '../userprofile/ajaxLoading';

class AvatarsListLayout extends Component {

    constructor(props) {

        super(props); 

    }

    componentDidMount() {

        const self = this;

        getUserAvatarsList.call(self)
                          .then(response => {                                

            this.props.updateUserAvatarsList(response.data.avatars);            

        });

    }    

    render() {  
        
        const { userAvatarsList, userAvatarTimeStamp, userProfile, events } = this.props,
              avatars = [],
              self = this;     

        userAvatarsList.forEach((v,i)=> {

            let avatarSrc = '';

            const name = v.split('.')[0],
                  getAvatarSrc = () => {

                    return FPROFILE_AVATAR_DIR_URL.concat(v, `?t=${userAvatarTimeStamp}`);

                  };
            
            if ( ! isNaN( parseInt( name ) ) ) {

                avatarSrc = getAvatarSrc();

            }

            else {

                if ( isUserProfilePage() ) {

                    if ( v.startsWith( userProfile.username.concat('/') ) ) {

                        avatarSrc = getAvatarSrc();

                    }

                }

                else {

                    if ( isAllUsersPage() ) {

                        const { editUserModalProps } = self.props;                             

                        if ( editUserModalProps.userProfile && v.startsWith( editUserModalProps.userProfile.username.concat('/') ) ) {

                            avatarSrc = getAvatarSrc();
    
                        }                       


                    }

                    else if ( isNewUserPage() ) {

                        if ( v.startsWith('blob:') ) {

                            avatarSrc = v;

                        }

                    }

                }

            }
           
            avatarSrc ? avatars.push(

                <li key={i} 
                    data-avatar-id={i}
                    onClick={events.handleChooseAvatar.bind(self)}
                    className={self.props.userSelectedAvatar === i ? 'active' : ''}>

                    <a href="#">
                        <img src={avatarSrc} alt={v} />
                    </a>

                </li>

            ) : null;

        });

        return (

            <div>

                <p>
                    Mời chọn một ảnh dưới đây làm ảnh đại diện
                </p>

                <ul>
                    {avatars}
                </ul>

                <div className="upload_avatar">

                    <button className="btn btn-success btnUpload"
                            onClick={events.handleUploadOtherAvatar.bind(this)}>Tải avatar từ máy tính</button>

                    {this.props.userAvatarIsAjaxLoading ? <AjaxLoading message="Đang upload, xin chờ ..." /> : null}

                </div>

            </div>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarsListLayout);