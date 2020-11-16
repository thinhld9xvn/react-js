export const authorData = [
    {
        name: 'Tất cả tác giả',
        value: '-1',
        selected: true
    },
    {
        name: 'ldthinh9xvn',
        value: '1',
        display_name: 'Lưu Đức Thịnh',
        selected: false
    },
    {
        name: 'daoduchuy',
        value: '2',
        display_name: 'Đào Đức Huy',
        selected: false
    },
    {
        name: 'tranduytien',
        value: '3',
        display_name: 'Trần Duy Tiến',
        selected: false
    },
    {
        name: 'nguyenthidung',
        value: '4',
        display_name: 'Nguyễn Thị Dung',
        selected: false
    },
    {
        name: 'trandangkhoa',
        value: '5',
        display_name: 'Trần Đăng Khoa',
        selected: false
    }
];

export const postModifiedData = [

    {
        name: 'Tất cả ngày đăng',
        value: '-1',
        selected: true
    },

    {
        name: 'Lọc theo ngày hiện tại',
        value: 'filter_by_date_now',
        selected: false

    },

    {
        name: 'Lọc theo tuần này',
        value: 'filter_by_this_week',
        selected: false

    },

    {
        name: 'Lọc theo tháng 8',
        value: 'filter_by_month_8',
        selected: false

    },

    {
        name: 'Lọc theo tháng 7',
        value: 'filter_by_month_7',
        selected: false

    },

];

export const categoriesData = [

    {
        name: 'Tất cả danh mục',
        value: '-1',
        selected: true
    },

    {
        name: 'Khám phá Châu Âu',
        value: '1',
        selected: false,
        childrens : [

            {
                name: 'Khám phá nước Đức',
                value: '11',
                selected: false,

                childrens : [

                    {
                        name: 'Lâu đài Neuschwanstein',
                        value: '111',
                        selected: false
                    },

                    {
                        name: 'Thành phố cảng HamBurg',
                        value: '112',
                        selected: false
                
                    },

                ]
        
            },

            {
                name: 'Khám phá nước Ba Lan',
                value: '12',
                selected: false
        
            },

            {
                name: 'Khám phá nước Thụy Sĩ',
                value: '13',
                selected: false
        
            },

            {
                name: 'Khám phá nước Thụy Điển',
                value: '14',
                selected: false
        
            },

        ]

    },

    {
        name: 'Khám phá Châu Á',
        value: '2',
        selected: false,
        childrens : [

            {
                name: 'Khám phá Nhật Bản',
                value: '21',
                selected: false
        
            },

            {
                name: 'Khám phá Trung Quốc',
                value: '22',
                selected: false
        
            },

            {
                name: 'Khám phá Malaysia',
                value: '23',
                selected: false
        
            },

            {
                name: 'Khám phá Việt Nam',
                value: '24',
                selected: false
        
            },

            {
                name: 'Khám phá Singapore',
                value: '25',
                selected: false
        
            },

        ]

    },

    {
        name: 'Khám phá châu Mỹ',
        value: '3',
        selected: false

    },

    {
        name: 'Khám phá châu Đại Dương',
        value: '4',
        selected: false

    },


    {
        name: 'Khám phá châu Phi',
        value: '5',
        selected: false

    },

];

export const tagsPostSuggestionsData = [
    { id: 'Khám phá Châu Âu', text: 'Khám phá Châu Âu' },
    { id: 'Khám phá nước Đức', text: 'Khám phá nước Đức' },
    { id: 'Khám phá Châu Á', text: 'Khám phá Châu Á' },
    { id: 'Khám phá Châu Phi', text: 'Khám phá Châu Phi' },
    { id: 'Khám phá nước Ba Lan', text: 'Khám phá nước Ba Lan' },
    { id: 'Khám phá nước Thụy Sĩ', text: 'Khám phá nước Thụy Sĩ' }
];

export function generateSampleData() {

    const postsList = [],
        size = Math.pow(1000, 1);

    // sample 1.000 records
    for (let i = 0; i < size; i++) {

        const username = authorData[Math.floor(Math.random() * 5) + 1],
            category = categoriesData[Math.floor(Math.random() * 5) + 1],
            date = Math.floor(Math.random() * 30) + 1,
            month = Math.floor(Math.random() * 12) + 1,
            year = 2020;

        const post = {
            id: i,
            post_title: i.toString() + '_Nền giáo dục Đảo Síp (Cyprus) có tuyệt như báo chí thường nói_' + i.toString(),
            username: {

                id: username.value,
                name: username.name,
                display_name: username.display_name

            },
            post_modified_date: `${date}/${month}/${year}`,
            post_categories: [
                {
                    id: category.value,
                    name: category.name
                }


            ],
            post_featured_image: 'https://gig.com.vn/wp-content/uploads/2020/07/gig-viet-nam-giao-duc-dao-sip-co-chat-luong-khong-dinh-cu-quoc-te-150x150.jpg'

        };

        postsList.push(post);

    }

    return postsList;

}


