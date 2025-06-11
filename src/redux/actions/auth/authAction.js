import apiClient from "@src/utils/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
    "auth/login",
    async ({ email, password, loginRole }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/users/login/", { email, password });

            if (response.status !== 200) {
                throw new Error("Login failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Login failed");
            }

            var { role } = response.data.data;
            const { email: userEmail, access: token, refresh: refreshToken, } = response.data.data;

            if (typeof role === 'string') {

                if (role.includes("[") && role.includes("]")) {
                    try {
                        role = JSON.parse(role.replace(/'/g, '"'));
                        if (Array.isArray(role)) {
                            role = role[0]; // Fallback to array if not an array
                        }
                    } catch (error) {
                        console.error("Failed to parse role:", error.message);
                        role = []; // Fallback value
                    }
                }
            }

            if (role !== loginRole) {
                return rejectWithValue("Login Failed, User Not Found");
            }

            return {
                user: { email: userEmail, role },
                token,
                refreshToken,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
)

export const registerAction = createAsyncThunk(
    "auth/register",
    async ({ email, password, confirmPassword, fullName, role = 3, dob = "1993-10-14", gender = "male" }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("confirm_password", confirmPassword);
            formData.append("first_name", fullName);
            formData.append("hospital", import.meta.env.VITE_HOSPITAL_UUID);
            formData.append("role", role);
            formData.append("country", "IN");
            formData.append("work_email", "work3@grr.la");
            formData.append("gender", gender);
            formData.append("dob", dob);

            // Check if a token is already logged in, otherwise use SUPERADMIN token
            let token;
            const state = typeof window !== "undefined" && window.store
                ? window.store.getState()
                : undefined;
            if (state && state.auth && state.auth.token) {
                token = state.auth.token;
            } else if (import.meta.env.VITE_SUPERADMIN_TOKEN) {
                token = import.meta.env.VITE_SUPERADMIN_TOKEN;
            }

            const response = await apiClient.post("/users/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status !== 201) {
                throw new Error("Registration failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Registration failed");
            }

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
)


export const getUserDetail = createAsyncThunk(
    "auth/getUserDetail",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/users/profile/");

            if (response.status !== 200) {
                throw new Error("Failed to fetch user details");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Failed to fetch user details");
            }

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
)

export const updatePasswordAction = createAsyncThunk(
    "auth/updatePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put("/users/password/", { old_password: oldPassword, password: newPassword });

            if (response.status !== 200) {
                throw new Error("Update Password failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Update Password failed");
            }

            return null
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Update Password failed");
        }
    }
)

export const registerPatientAction = createAsyncThunk(
    "auth/registerPatient",
    async (payload, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("email", payload.email);
            formData.append("password", payload.password);
            formData.append("confirm_password", payload.confirmPassword);
            formData.append("first_name", payload.first_name);
            formData.append("last_name", payload.last_name || "");
            formData.append("hospital", payload.hospital);
            formData.append("role", payload.role || 3);
            formData.append("country", payload.country || "IN");
            
            // Hanya append jika ada value yang valid
            if (payload.work_email && payload.work_email.trim()) {
                formData.append("work_email", payload.work_email);
            }
            if (payload.gender && payload.gender.trim()) {
                formData.append("gender", payload.gender);
            }
            if (payload.address && payload.address.trim() && payload.address !== "-") {
                formData.append("address", payload.address);
            }
            
            formData.append("dob", payload.dob);
            
            if (payload.phone_number && payload.phone_number.trim()) {
                formData.append("phone_number", payload.phone_number);
            }
            if (payload.blood_group && payload.blood_group.trim()) {
                formData.append("blood_group", payload.blood_group);
            }
            if (payload.height_feet !== undefined && payload.height_feet !== "") {
                formData.append("height_feet", payload.height_feet);
            }
            if (payload.height_inches !== undefined && payload.height_inches !== "") {
                formData.append("height_inches", payload.height_inches);
            }
            if (payload.weight_kilo !== undefined && payload.weight_kilo !== "") {
                formData.append("weight_kilo", payload.weight_kilo);
            }
            if (payload.weight_grams !== undefined && payload.weight_grams !== "") {
                formData.append("weight_grams", payload.weight_grams);
            }
            if (payload.disease && payload.disease.trim() && payload.disease !== "-") {
                formData.append("disease", payload.disease);
            }

            let token;
            const state = typeof window !== "undefined" && window.store
                ? window.store.getState()
                : undefined;
            if (state && state.auth && state.auth.token) {
                token = state.auth.token;
            } else if (import.meta.env.VITE_SUPERADMIN_TOKEN) {
                token = import.meta.env.VITE_SUPERADMIN_TOKEN;
            }

            const response = await apiClient.post("/users/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status !== 201) {
                throw new Error("Registration failed");
            }

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Registration failed");
            }

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);