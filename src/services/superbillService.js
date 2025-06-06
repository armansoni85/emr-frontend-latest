import apiClient from "@src/utils/apiClient";

export const getIcd = async (search = '') => {
    try {
        const params = search ? { search } : {};
        const response = await apiClient.get('/icd-codes/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching ICD codes:', error);
        throw error;
    }
};

export const getCpt = async (code, search = '') => {
    try {
        if (search) {
            const params = { search, icd_code: code };
            const response = await apiClient.get('/cpt-codes/', { params });
            return response.data;
        } else {
            const response = await apiClient.get(`/cpt-codes/${code}`);
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching CPT code:', error);
        throw error;
    }
};