import {getListIdsPopboxModal} from 'utils/modalUtils';
import {getComponentInst} from 'utils/componentUtils';

export function isUndefined(o) {

    return typeof( o ) === 'undefined';

}

export function getCopiedJsonObject(o) {

    return JSON.parse( JSON.stringify( o ) );

}

export function mapObject(o, callback) {

    let keys = Object.keys(o),
        length = keys.length;

    for ( let i = 0; i < length; i++ ) {

        callback( o[keys[i]], i );

    }

}

export function setUnFocusForm(form) {

    let X = window.scrollX,
        Y = window.scrollY,
        ids = getListIdsPopboxModal(),

        hasPopboxModalShow = ids.length > 0,

        popboxBodyModal = null,
        mainContent = null;

    if ( hasPopboxModalShow ) {

        let popboxModals = document.querySelectorAll('.popbox.opened.visible'),
            popboxModal = popboxModals[popboxModals.length - 1];

        popboxBodyModal = popboxModal.querySelector('.popbox_container > .text');

        X = popboxBodyModal.scrollLeft;
        Y = popboxBodyModal.scrollTop;

    }

    else {

        mainContent = form.querySelector('.mainContent');

        if ( mainContent !== null ) {

            X = mainContent.scrollLeft;
            Y = mainContent.scrollTop;

        }

    }

    form.querySelectorAll('input, textarea')
                .forEach(e => {          
        
        e.focus();

        setTimeout(() => {

            e.blur();

        }, 100);

    });

    if ( hasPopboxModalShow ) {

        popboxBodyModal.scrollTo(X, Y);

    }

    else {

        if ( mainContent !== null ) {

            mainContent.scrollTo(X, Y);

        }

        else {

            window.scroll(X, Y);

        }

    }

}

export function scrollPageToTop() {

    window.scrollTo(0, 0);

}

export function showLoadingOverlay() {

    const loaderInst = getComponentInst('loaderRef');    

    loaderInst.setState({ loaderState : true });

}

export function closeLoadingOverlay() {

    const loaderInst = getComponentInst('loaderRef');

    loaderInst.setState({ loaderState : false });
    
}