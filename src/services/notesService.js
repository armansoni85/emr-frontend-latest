import apiClient from "@src/utils/apiClient"

export const getNotes = async (params = {}) => {
    try {
        const response = await apiClient.get("/Notes/notes/", { params })
        return response.data
    } catch (error) {
        console.error("Error fetching notes:", error)
        throw error
    }
}

export const createNote = async (data) => {
    try {
        const response = await apiClient.post("/Notes/notes/", data)
        return response.data
    } catch (error) {
        console.error("Error creating note:", error)
        throw error
    }
}

export const updateNote = async (id, data) => {
    try {
        const response = await apiClient.patch(`/Notes/notes/${id}/`, data)
        return response.data
    } catch (error) {
        console.error("Error updating note:", error)
        throw error
    }
}

export const deleteNote = async (id) => {
    try {
        const response = await apiClient.delete(`/Notes/notes/${id}/`)
        return response.data
    } catch (error) {
        console.error("Error deleting note:", error)
        throw error
    }
}
