import React from "react";

class AjaxLoading extends React.Component {    

    render() {        

        return(

            <span className="ajax_loading">

                <span className="ajax_img"></span>
                <span className="ajax_msg">{this.props.message}</span>

            </span>
            
        )

    }

}

export default AjaxLoading;