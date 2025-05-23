import { RoleId } from "@src/constant/enumRole";
import { createSlice } from "@reduxjs/toolkit";
import sideMenuDoctor from "../../constant/sideMenuDoctor";
import sideMenuPatient from "../../constant/sideMenuPatient";

const initialState = {
    activeMenu: null,
    activeSubMenu: null,
    isSidebarOpen: true,
    menus: [],
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            const { payload } = action;
            if (payload !== undefined) {
                state.isSidebarOpen = payload;
            } else {
                state.isSidebarOpen = !state.isSidebarOpen;
            }
        },
        setActiveMenu: (state, action) => {
            const { parentId, childId = null } = action.payload;

            if (!parentId) {
                state.activeMenu = null; // Reset activeMenu if no parentId is provided
                state.activeSubMenu = null; // Reset activeSubMenu
                return;
            };

            // Find the parent menu immutably
            const menuIndex = state.menus.findIndex((menu) => menu.id === parentId);
            if (menuIndex === -1) {
                state.activeMenu = null; // Reset activeMenu if no parentId is provided
                state.activeSubMenu = null; // Reset activeSubMenu
                return;
            };

            const menu = state.menus[menuIndex];

            // Create a copy of the menu
            const updatedMenu = { ...menu };

            if (childId === null) {
                // Toggle childState if no childId is provided
                if (updatedMenu.children) {
                    updatedMenu.childState = !updatedMenu.childState;
                }
                state.activeSubMenu = null; // Reset activeSubMenu
            } else {
                // Find the child menu immutably
                const childMenuIndex = updatedMenu.children?.findIndex((child) => child.id === childId);
                if (childMenuIndex !== -1) {
                    const childMenu = updatedMenu.children[childMenuIndex];
                    updatedMenu.childState = true; // Ensure the parent is expanded
                    state.activeSubMenu = { ...childMenu }; // Set the active sub-menu
                }
            }

            // Update the activeMenu immutably
            state.activeMenu = { ...updatedMenu };
            delete state.activeMenu.children; // Remove children from the activeMenu

            // Update the menus array immutably
            state.menus = [
                ...state.menus.slice(0, menuIndex), // Copy elements before the updated menu
                updatedMenu, // Insert the updated menu
                ...state.menus.slice(menuIndex + 1), // Copy elements after the updated menu
            ];
        },
        toggleSubMenu: (state, action) => {
            const { id } = action.payload;
            const menu = state.menus.find((menu) => menu.id === id);
            if (menu) {
                menu.childState = !menu.childState;
            }
        },
        setMenuByRole: (state, action) => {
            var { role } = action.payload;

            if (role?.includes("[") && role?.includes("]")) {
                try {
                    role = JSON.parse(role?.replace(/'/g, '"'));
                    if (Array.isArray(role)) {
                        role = role[0]; // Fallback to array if not an array
                    }
                } catch (error) {
                    console.error("Failed to parse role:", error.message);
                    role = "-1"; // Fallback value
                }
            }

            if (role === RoleId.ADMIN || role === RoleId.DOCTOR) {
                state.menus = sideMenuDoctor; // Set menu for admin or doctor
            } else if (role === RoleId.PATIENT) {
                state.menus = sideMenuPatient;
            } else {
                state.menus = sideMenuPatient;
            }
        }
    }
});

export const { toggleSidebar, setActiveMenu, toggleSubMenu, setMenuByRole } = sidebarSlice.actions;
export default sidebarSlice.reducer;