export function initWindowResize() {    

    const MyTabContainer = document.querySelector('.tabLists .tab-pane.active .myTabContainer');         

    let h = 0;

    //console.log( MyTabContainer );

    window.scroll(0,0);
    
    if ( MyTabContainer ) {

        const mainHeader = MyTabContainer && MyTabContainer.querySelector('.mainHeader'),
            mainContent = MyTabContainer && MyTabContainer.querySelector('.mainContent'),
            mainFooter = MyTabContainer && MyTabContainer.querySelector('.mainFooter'),

            isFullScreen = MyTabContainer && MyTabContainer.classList.contains('fullscreen'),

            mainHeaderClientHeight = mainHeader ? mainHeader.clientHeight : 0,
            mainFooterClientHeight = mainFooter ? mainFooter.clientHeight : 0;

        if ( ! isFullScreen ) {   

            h = `${window.innerHeight - 120 - mainHeaderClientHeight - mainFooterClientHeight}px`;   

        }

        else {

            h = `${window.innerHeight - mainHeaderClientHeight - mainFooterClientHeight}px`;    

        }

        mainContent.style.height = h;

        //const btnZoomReset = document.querySelector('.btnZoomReset');

        //btnZoomReset && btnZoomReset.click();

    }

    else {

        setTimeout(() => {

            initWindowResize();

        }, 200);

    }


}

export function resetWindowResize() {

    const elements = document.querySelectorAll('.tabLists .mainContent');

    elements.forEach(element => {

        element.style.height = '';
        element.style.maxHeight = '';

    });    

}

export function windowResizeEvent(e) {

    initWindowResize();

}

export function onKeyDownShortcut(e) {

    const keyCode = e.which || e.keyCode,
          SPACE_KEY = 32,
          X_KEY = 88,
          ESC_KEY = 27,
          F_KEY = 102,
          isCtrlKey = e.ctrlKey;        

    if ( isCtrlKey && keyCode === SPACE_KEY ) {     

        document.querySelector('.tabLists .tab-pane.active .searchUserNameKey').focus();

        document.execCommand('selectAll', false, null);

    }

    else if ( isCtrlKey && keyCode === X_KEY ) {

        document.querySelector('.btnClearFilter').click();

    }
   

    else if ( keyCode === ESC_KEY ) {

        const myTabContainer = document.querySelector('.tabLists .tab-pane.active .myTabContainer');

        if ( myTabContainer.classList.contains('fullscreen') ) {

            myTabContainer.querySelector('.btnToggleFullScreen')
                          .click();

        }

    }

}