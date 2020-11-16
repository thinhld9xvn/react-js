export function attachDomFixedPosListener(parentSelector, DomListener, callback) {

    const t = setInterval(() => {

        const parent = document.querySelector(parentSelector),
              dom = parent ? parent.querySelector(DomListener) : null;

        if ( dom !== null && parent !== null ) {            

            let   clientRect = parent.getBoundingClientRect(),
                X = clientRect.x,
                Y = clientRect.y,
                dom_height = dom.clientHeight,
                dom_width = dom.clientWidth,
                top_distance = Y - dom_height,
                left_distance = X - dom_width,
                top = Y - dom_height + parent.clientHeight,
                left = X - dom_width - 20;           

            if ( top_distance < 0 ) {

                top = Y;

            }

            if ( left_distance < 0 ) {

                left = X + parent.clientWidth + 20;

            }

            if ( dom.style.getPropertyValue('position') !== 'fixed' ) {
                
                dom.style.setProperty('position', 'fixed', 'important');

            }           

            if ( parseInt( dom.style.getPropertyValue('top') ) !== parseInt(top) ) {
                
                dom.style.setProperty('top', top + 'px', 'important');

            }

            if ( parseInt( dom.style.getPropertyValue('left') ) !== parseInt(left) ) {
                
                dom.style.setProperty('left', left + 'px', 'important');

            }
        

            if ( callback ) {

                callback();

            }            

        }    

    }, 10);

}