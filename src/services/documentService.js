import apiClient from "@src/utils/apiClient";
import { convertToFormData } from "@src/utils/handleForm";

export const getMedicalDocuments = async (params = {}) => {
    try {
        const response = await apiClient.get("/medical-documents/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching medical documents:", error);
        throw error;
    }
};

export const createMedicalDocument = async (data) => {
    try {
        const formData = convertToFormData(data);
        const response = await apiClient.post("/medical-documents/", formData);
        return response.data;
    } catch (error) {
        console.error("Error creating medical document:", error);
        throw error;
    }
};

export const updateMedicalDocument = async (id, data) => {
    try {
        const formData = convertToFormData(data);
        const response = await apiClient.put(`/medical-documents/${id}/`, formData);
        return response.data;
    } catch (error) {
        console.error("Error updating medical document:", error);
        throw error;
    }
};

export const deleteMedicalDocument = async (id) => {
    try {
        const response = await apiClient.delete(`/medical-documents/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error deleting medical document:", error);
        throw error;
    }
};

export const getMedicalDocumentById = async (id) => {
    try {
        const response = await apiClient.get(`/medical-documents/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching medical document:", error);
        throw error;
    }
};
