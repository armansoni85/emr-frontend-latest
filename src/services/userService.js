import apiClient from "@src/utils/apiClient"

export const getUsers = async ( params = {} ) => {
    try {
        const response = await apiClient.get( "/users/", { params } )
        return response.data
    } catch ( error ) {
        console.error( "Error fetching users:", error )
        throw error
    }
}

export const getUserById = async ( id ) => {
    try {
        const response = await apiClient.get( `/users/${ id }/` )
        return response.data
    } catch ( error ) {
        console.error( "Error fetching user by ID:", error )
        throw error
    }
}

export const updateUser = async ( id, userData ) => {
    try {
        const formData = new FormData()
        for ( const key in userData ) {
            if ( userData[ key ] !== null && userData[ key ] !== undefined ) {
                formData.append( key, userData[ key ] )
            }
        }
        
        const response = await apiClient.put( `/users/${ id }/`, formData )
        return response.data
    } catch ( error ) {
        console.error( "Error updating user:", error )
        throw error
    }
}