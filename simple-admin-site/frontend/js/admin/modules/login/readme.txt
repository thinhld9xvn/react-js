Quy trình thực hiện ở trang login:
    - Nhập '/admin/login' : 
        + Đang trong trạng thái đăng nhập => đăng xuất
        + Kiểm tra xem có tham số 'redirect_url' hay không ?

            Chưa có => thêm tham số 'redirect_url=/admin/dashboard' để chuyển hướng đến url này khi đăng nhập xong

        + Vào trang đăng Nhập 

    - Nhập một url tồn tại bất kỳ khác '/admin/login' :

        + Kiểm tra xem đã đăng nhập chưa ?

            Chưa => {
                - Truy cập vào trang đăng nhập
                - Thêm tham số 'redirect_url' với giá trị là url hiện tại vào đường link đăng nhập
            }

            Rồi => truy cập bình thường