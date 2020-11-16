
const initialStates = {

   navbarInfo : {

        navbar_brand : 'Bảng điều khiển',
        navbar_items : [
            {
                name : 'actions',
                label : 'Hành động gần nhất',
                icon : 'notifications',
                show : false,
                items_list : [
                    {
                        label : "Mike John responded to your email",
                        url : "#"
                    },
                    {
                        label : "You have 5 new tasks",
                        url : "#"
                    },
                    {
                        label : "You're now friend with Andrew",
                        url : "#"
                    },
                    {
                        label : "Another Notification",
                        url : "#"
                    },
                    {
                        label : "Another One",
                        url : "#"
                    }
                ]
            },
            {
                name : 'account',
                label : 'Tài khoản',
                icon : 'person',
                show : false,
                items_list : [
                    {
                        label : "Hồ sơ thành viên",
                        url : "#"

                    },
                    {
                        label : "Cài đặt",
                        url : "#"

                    },
                    {
                        label : "Đăng xuất",
                        url : "#"

                    }
                ]
            }
        ],
        navbar_item_active : null

    }

};

export const navbarInfoReducer = (state = initialStates, action) => {

    //console.log(action);

    if ( action.reducer === 'navbarInfoReducer' ) {       

        switch ( action.type ) {

            case 'UPDATE_BRAND_NAME' :

                state.navbarInfo.navbar_brand = action.name;
            
                //console.log( JSON.parse( JSON.stringify(_state) ) );

                return JSON.parse( JSON.stringify( state ) );

            case 'UPDATE_NAV_STATE_ITEMS' :
                
                state.navbarInfo = action.payload;

                return JSON.parse( JSON.stringify( state ) );

            default : 
                
                break;

        }

    }

    return JSON.parse( JSON.stringify(state) );

}