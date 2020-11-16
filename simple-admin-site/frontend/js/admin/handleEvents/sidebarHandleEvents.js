export function onClick_toggleSidebar(e) {

    e.preventDefault();

    const sidebar = document.getElementById('sidebar');
    
    if ( sidebar.classList.contains('-minimize') ) {

        sidebar.classList.remove('-minimize');

    }

    else {

        sidebar.classList.add('-minimize');

    }

    //

    if ( e.target.classList.contains('-expand') ) {

        e.target.classList.remove('-expand');

    }

    else {

        e.target.classList.add('-expand');

    }

}