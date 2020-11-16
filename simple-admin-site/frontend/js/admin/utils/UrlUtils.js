export function getParameterFromUrl(url, parameter) {

    let location = new URL(url);
    
    return location.searchParams.get(parameter);

}

export function hasParameterFromUrl(url, parameter) {

    let location = new URL(url);

    return location.searchParams.has(parameter);

}

export function addParameterToUrl(url, para_name, para_value) {

    let location = new URL(url);

    location.searchParams.set(para_name, para_value);

    return location;

}

// @params : array || json object
export function redirectToUrl(url, params) {

    let location = new URL(url);

    if ( Array.isArray(params) ) {

        params.map(p => {

            location.searchParams.set(p.name, p.value);

        });    

    }

    else {

        location.searchParams.set(params.name, params.value);

    }

    window.location.href = location.href;

}

export function isUserProfilePage() {

    return isUserChildPage('profile');

}

export function isAllUsersPage() {

    return isUserChildPage('all_users');

}

export function isNewUserPage() {

    return isUserChildPage('new_user');

}

function isUserChildPage(route) {

    const pathname = window.location.pathname;
    
    if ( pathname.startsWith('/admin/users/') ) {

        const last_route = pathname.split('/').pop();

        return last_route == route;

    }

    return false;

}

// xóa dấu tiếng việt của chuỗi
function removeAccents(str) {

	return str.normalize('NFD')
        	  .replace(/[\u0300-\u036f]/g, '')
        	  .replace(/đ/g, 'd').replace(/Đ/g, 'D');

}

export function convertStrToSlug(str) {

	return removeAccents(str).replace(/\s/g, '-').toLowerCase();

}