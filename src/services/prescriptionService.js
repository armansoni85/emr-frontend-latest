import apiClient from "@src/utils/apiClient"
// import { convertToFormData } from "@src/utils/handleForm"

export const getPrescriptions = async () => {
    try {
        const response = await apiClient.get( "/prescriptions/prescriptions/" )
        return response.data
    } catch ( error ) {
        console.error( "Error fetching prescriptions:", error )
        throw error
    }
}

export const createPrescription = async ( data ) => {
    try {
        const response = await apiClient.post( "/prescriptions/prescriptions/", data )
        return response.data
    } catch ( error ) {
        console.error( "Error creating appointment:", error )
        throw error
    }
}