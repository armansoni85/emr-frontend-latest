import apiClient from "@src/utils/apiClient"
import { convertToFormData } from "@src/utils/handleForm"


export const createConsultation = async (data) => {
    try {
        const formData = convertToFormData(data)

        const response = await apiClient.post("/consultations/", formData)
        return response.data
    } catch (error) {
        console.error("Error creating appointment:", error)
        throw error
    }
}

export const getConsultation = async (id) => {
    try {
        const response = await apiClient.get(`/consultations/${id}`)
        return response.data.data
    } catch (error) {
        console.error("Error getting consultation:", error)
        throw error
    }
}

