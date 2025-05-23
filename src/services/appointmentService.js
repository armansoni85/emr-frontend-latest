import apiClient from "@src/utils/apiClient"
import { convertToFormData } from "@src/utils/handleForm"

export const getAppointments = async ( params = {} ) => {
    try {
        const response = await apiClient.get( "/appointments/", { params } )
        return response.data
    } catch ( error ) {
        console.error( "Error fetching appointments:", error )
        throw error
    }
}


export const getAppointmentById = async ( id ) => {
    try {
        const response = await apiClient.get( `/appointments/${ id }/` )
        return response.data
    } catch ( error ) {
        console.error( "Error fetching appointment:", error )
        throw error
    }
}

export const createAppointment = async ( data ) => {
    try {
        const formData = convertToFormData( data )

        const response = await apiClient.post( "/appointments/", formData )
        return response.data
    } catch ( error ) {
        console.error( "Error creating appointment:", error )
        throw error
    }
}
export const updateAppointment = async ( id, data ) => {
    try {
        const formData = convertToFormData( data )

        const response = await apiClient.put( `/appointments/${ id }/`, formData )
        return response.data
    } catch ( error ) {
        console.error( "Error updating appointment:", error )
        throw error
    }
}

export const deleteAppointment = async ( id ) => {
    try {
        const response = await apiClient.delete( `/appointments/${ id }/` )
        return response.data
    } catch ( error ) {
        console.error( "Error deleting appointment:", error )
        throw error
    }
}
