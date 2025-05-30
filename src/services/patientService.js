import apiClient from "@src/utils/apiClient"

export const getMonthlyPatient = async () => {
    try {
        const response = await apiClient.get("/dashboard/doctor/monthly-patients/")
        return response.data
    } catch (error) {
        console.error("Error fetching monthly patients:", error)
        throw error
    }
}

export const getPatientStatistics = async () => {
    try {
        const response = await apiClient.get("/dashboard/patient-status")
        return response.data
    } catch (error) {
        console.error("Error fetching patient statistics:", error)
        throw error
    }
}