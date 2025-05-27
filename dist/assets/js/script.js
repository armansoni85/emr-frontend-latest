function toggleSidebar() {
    const sidebar = document.getElementById( 'sidebar' );
    const mainContent = document.getElementById( 'main-content' );
    const sidebarTextElements = document.querySelectorAll( '.sidebar-text' ); // All text elements in sidebar

    sidebar.classList.toggle( 'sidebar-hidden' );
    sidebar.classList.toggle( 'sidebar-visible' );

    mainContent.classList.toggle( 'main-content-expanded' );
    mainContent.classList.toggle( 'main-content-collapsed' );

    // Hide or show text depending on the sidebar state
    sidebarTextElements.forEach( text => {
        text.classList.toggle( 'hide-text' );
    } );
}

function changeTab( tabName ) {
    const tabElement = tabName == 'index' ? 'dashboard' : tabName;

    window.location.href = `${ window.location.origin }/${ tabName }.html`;
    // Remove the 'active' class from all tabs

}

function getActiveClass( tabElement ) {
    document.querySelectorAll( '.tab' ).forEach( tab => {
        tab.classList.remove( 'active' );
    } );

    // Add 'active' class to the clicked tab
    console.log( tabElement )
    if ( document.getElementById( `tab-${ tabElement.split( '_' )[ 0 ] }` ) )
        document.getElementById( `tab-${ tabElement.split( '_' )[ 0 ] }` ).classList.add( 'active' );
    if ( document.getElementById( `tab-${ tabElement }` ) )
        document.getElementById( `tab-${ tabElement }` ).classList.add( 'active' );

    // Hide all tab content sections
    // document.querySelectorAll('.tab-content').forEach(tabContent => {
    //     tabContent.classList.add('hidden');
    // });


    // Show the content of the clicked tab
    document.getElementById( tabElement ).classList.remove( 'hidden' );
}

let page = window.location.pathname.split( '/' )[ 1 ]
if ( page == 'patient' ) page = window.location.pathname.split( '/' )[ 2 ]
if ( page && page != 'index.html' ) {
    setTimeout( () => {
        getActiveClass( page.replace( '.html', '' ) )
    }, 1 )
} else {
    setTimeout( () => {
        getActiveClass( 'dashboard' )
    }, 1 )
}

function toggleSubTabs( subTabId ) {
    document.getElementById( subTabId ).classList.toggle( 'hidden' );
}

window.onresize = function () {
    console.log( window.innerWidth )
    const sidebar = document.getElementById( 'sidebar' );
    const mainContent = document.querySelector( '.main-content' );

    if ( window.innerWidth < 768 ) {

        if ( sidebar.classList.contains( 'sidebar-visible' ) ) {
            toggleSidebar();
        }
    } else {
        if ( sidebar.classList.contains( 'sidebar-hidden' ) ) {
            toggleSidebar();
        }
        // sidebar.classList.remove('sidebar-collapsed');
        // mainContent.classList.remove('main-content-expanded');
    }
};

function goBack() {
    window.history.back();
}

setTimeout( () => {
    window.onresize();
}, 1 )


