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

export const getConsultations = async (params) => {
    try {
        const response = await apiClient.get("/consultations/", { params })
        return response.data.data
    } catch (error) {
        console.error("Error getting consultations:", error)
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

export const updateConsultation = async (id, data) => {
    try {
        const response = await apiClient.put(`/consultations/${id}/`, data)
        return response.data
    } catch (error) {
        console.error("Error updating consultation:", error)
        throw error
    }
}


export const uploadRecording = async (data) => {
    try {
        // const formData = convertToFormData(data)
        const response = await apiClient.post(`/consultations/recordings/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 60000 // 60 seconds timeout for large file uploads
        })
        return response.data.data
    } catch (error) {
        console.error("Error getting consultation:", error)
        throw error
    }
}

export const analyzeRecording = async (consultationId) => {
    try {
        const response = await apiClient.get(`/consultations/recordings/analyze/${consultationId}/`)
        return response.data
    } catch (error) {
        console.error("Error analyzing recording:", error)
        throw error
    }
}

export const sendConsultationEmail = async (data) => {
    try {
        const formData = new FormData();
        formData.append("recipient_email", data.recipient_email);
        formData.append("recipient_name", data.recipient_name);
        formData.append("subject", data.subject);
        formData.append("custom_message", data.custom_message);
        if (data.document) {
            formData.append("document", data.document);
        }

        const response = await apiClient.post(
            "/emailconsultation/consultation-emails/",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending consultation email:", error);
        throw error;
    }
}
