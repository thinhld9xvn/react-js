import Popbox from 'modules/popbox/popbox';

var popboxModal = null;

function initializePopboxSettings() {

    if ( popboxModal === null ) {

        popboxModal = { 
                        instance : null, 
                        ids : [] 
                    };

    }

}

function getActiveInstacePopboxModal() {

    let popbox = popboxModal.instance;    

    if ( popbox === null ) {

        popbox = new Popbox({

            blur : true
    
        });

    }

    return popbox;

}

/*function setOverflowHiddenBody() {

    document.body.style.overflow = 'hidden'; 

}

function removeOverflowHidenBody() {

    document.body.style.overflow = '';

}*/

function saveInstancePopboxModal(popbox) {

    if ( popboxModal.instance === null ) {

        popboxModal.instance = popbox;

    }

}

function saveIdPopboxModal(id) {

    popboxModal.ids.push( id );

}

function removeIdPopboxModal(id) {

    const ids = getListIdsPopboxModal(),
          pid = ids.findIndex(v => v == id);

    //console.log(pid);

    if ( pid !== -1 ) {

        ids.splice(pid, 1);

        saveListPopboxModal( ids );

    }

    return ids;

}

export function getListIdsPopboxModal(id) {

    return popboxModal ? popboxModal.ids : [];    

}

function saveListPopboxModal(ids) {

    popboxModal.ids = ids;

}

export function openPopboxModal(id) {

    initializePopboxSettings();

    const popbox = getActiveInstacePopboxModal();

    //setOverflowHiddenBody();   
   
    //open a popbox
    popbox.open(id);

    saveIdPopboxModal(id);

    saveInstancePopboxModal(popbox);

    //console.log(popboxModal);

}

export function closePopboxModal(id) {

    const popbox = getActiveInstacePopboxModal(); 

    popbox.close(id);    

    removeIdPopboxModal(id);

    /*if ( ids.length === 0 ) {

        removeOverflowHidenBody();

    } */   

    saveInstancePopboxModal(popbox);  

}

export function closeAllPopboxModal() {

    const popbox = getActiveInstacePopboxModal();

    popbox.clear();

    saveInstancePopboxModal(popbox);

}