import ROUTES from "../routes";

export function resolveFullPath( routes, baseKey = "", parentPath = "" ) {
    const result = {};


    for ( const [ key, value ] of Object.entries( routes ) ) {
        const currentKey = baseKey ? `${ baseKey }.${ key }` : key;

        if ( value.path ) {
            result[ currentKey ] = `${ [ parentPath, value.path ]
                .filter( Boolean )
                .join( "/" ) }`;
        }

        if ( value.childRoutes ) {

            Object.assign( result, resolveFullPath( value.childRoutes, currentKey, parentPath ? ( parentPath + "/" + value.path ) : value.path ) );
        } else if ( key === 'public' || key === 'private' ) {
            const childPaths = resolveFullPath( value, "" );
            Object.assign( result, childPaths );
        }
    }

    return result;
}

export function getRoutePath( routeKey, params = {} ) {
    const fullMapPath = resolveFullPath( ROUTES );
    var resolvePath = fullMapPath[ routeKey ];

    if ( Object.prototype.hasOwnProperty.call( fullMapPath, routeKey ) ) {
        if ( Object.keys( params ).length > 0 ) {

            const routePath = resolvePath;
            const requiredParams = routePath.match( /:\w+\b(?!\?)/g )?.map( param => param.substring( 1 ) ) || [];
            const missingParams = requiredParams.filter( param => !Object.hasOwn( params, param ) );

            if ( missingParams.length > 0 ) {
                console.warn( `Missing required parameters for route "${ routeKey }": ${ missingParams.join( ", " ) }` );
                return null; // or handle the error as needed
            }

            const resolvedPath = Object.entries( params ).reduce( ( path, [ key, value ] ) => {
                return path.replace( new RegExp( `:${ key }\\b(?!\\?)`, 'g' ), value );
            }, routePath );

            resolvePath = resolvedPath.replace( /\/?:\w+\?/g, "" ); // Remove optional params not provided
        }
        return resolvePath;
    } else {
        console.warn( `Route key "${ routeKey }" not found.` );
        return null; // or return a default path
    }
}