// str có định dạng chuỗi là ngày / tháng / năm hoặc ngày - tháng - năm
export function convertStringtoDateObj(str) {

    let strDate = str.replace(/\//g, '-'),
        splices = strDate.split('-');

    strDate = `${splices[1]}-${splices[0]}-${splices[2]}`;

    return new Date(strDate);

}

// so sánh ngày tháng năm của 2 date obj
export function compareTwoDateObj(d1, d2) {

    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear();

}

export function betweenRangeDate(d, dateRange1, dateRange2) {

    return d >= dateRange1 && d <= dateRange2;

}

export function compareDateMonth(d, month) {

    return d.getMonth() + 1 === parseInt( month );

}

export function subtractDate(d, dateOffset) {
   
    const myDate = new Date();
          myDate.setTime(d.getTime() - dateOffset);

    return myDate;

}


