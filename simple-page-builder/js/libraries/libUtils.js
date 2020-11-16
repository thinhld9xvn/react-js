export function isUndefined(o) {

    return typeof( o ) === 'undefined';

}

export function getCopiedJsonObject(o) {

    let asString = JSON.stringify(o, (k, v) =>
        typeof v === 'symbol' ? `$$Symbol:${Symbol.keyFor(v)}` : v,
    );            

    const jsonResult = JSON.parse(asString, (k, v) => {

        const matches = v && v.match && v.match(/^\$\$Symbol:(.*)$/);
      
        return matches ? Symbol.for(matches[1]) : v;

      }); 
      
    return jsonResult;

    //return JSON.parse( JSON.stringify( o ) );
    //return Object.assign({}, o, {});

}

export function mapObject(o, callback) {

    let keys = Object.keys(o),
        length = keys.length;

    for ( let i = 0; i < length; i++ ) {

        callback( o[keys[i]], i );

    }

}

function waitElementShow(n, callback) {

    const element = document.querySelector(n);

    if (  element !== null ) {

        const container = element.querySelector('.popbox_container > .text');

        callback(container);

    }

    else {

        setTimeout(() => {

            waitElementShow(n, callback);

        }, 200);

    }

}

export function scrollModalToTop() {

    waitElementShow(".popbox.opened.visible", container => {

        container.scrollTop = 0;

    });    

}