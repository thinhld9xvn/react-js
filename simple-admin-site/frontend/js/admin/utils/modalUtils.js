import React from 'react';

import {isUndefined} from 'utils/libUtils.js';
import Popbox from 'libraries/popbox/popbox';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'css/react-alert-modal.min.css';

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

export function showAlertDialog(options) {   

    confirmAlert({

        customUI: ({ onClose }) => {

            return (

                <div className='popbox'>

                    <div className='popbox_container'>

                        <div className="heading">{options.title}</div>

                        <div className="text">

                            <div className="message">
                                <div className={"icon ".concat(options['icon'] || 'information' )}></div>
                                <div className="content">{options.message}</div>
                            </div>

                        </div>
                            
                        <div className="footer">

                            <button className="btn btn-primary" 
                                    onClick={() => {

                                    onClose();

                                    options.ok_callback();                                    

                                }}>
                                {options.ok_label}
                            </button>

                        </div>                        

                    </div>                

                </div>

            );

        }

    });

}

export function showConfirmDialog(options) {

    confirmAlert({

        customUI: ({ onClose }) => {

            return (

                <div className='popbox'>

                    <div className='popbox_container'>

                        <div className="heading">{options.title}</div>

                        <div className="text">

                            <div className="message">
                                <div className={"icon information"}></div>
                                <div className="content">{options.message}</div>
                            </div>

                        </div>
                            
                        <div className="footer">
                            <button className="btn btn-primary" 
                                    onClick={() => {

                                    onClose();

                                    options.yes_callback();                                    

                                }}>
                                {options.yes_label}
                            </button>

                            <button className="btn btn-default" 
                                    onClick={() => {

                                    onClose();

                                    options.no_callback();                                    

                                }}>
                                {options.no_label}
                            </button>
                        </div>                        

                    </div>                

                </div>

            );

        }

    });

}