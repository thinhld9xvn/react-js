import React from "react";

class AjaxLoading extends React.Component {    

    render() {        

        return(

            <div className="ajax_loading">

            <span className="ajax_img"></span>
            <span className="ajax_msg">Đang tải dữ liệu, xin chờ ...</span>

            </div>
            
        )

    }

}

export default AjaxLoading;