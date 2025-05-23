import ROUTES from "../routes"
import { getRoutePath } from "@src/utils/routeUtils"

const { patient } = ROUTES.private


const sideMenuPatient = [
    {
        id: "tab-dashboard",
        icon: "Dashboard.svg",
        iconType: "image",
        text: "Dashboard",
        path: getRoutePath( "patient" ),
    },
    {
        id: "tab-appointments",
        icon: "Appointments.svg",
        iconType: "image",
        text: "Appointments",
        path: getRoutePath( "patient.appointments.past" ),
    },
    {
        id: "tab-health_profile",
        icon: "Health Profile.svg",
        iconType: "image",
        text: "Health Profile",
        path: getRoutePath( "patient.health_profile" ),
    },
    {
        id: "tab-medical_records",
        icon: "Medical Records.svg",
        iconType: "image",
        text: "Medical Records",
        path: getRoutePath( "patient.medical_records" ),
    },
    {
        id: "tab-lab_results",
        icon: "Labs Results.svg",
        iconType: "image",
        text: "Labs Results",
        path: getRoutePath( "patient.lab_results" ),
    },
    {
        id: "tab-prescriptions",
        icon: "Prescriptions.svg",
        iconType: "image",
        text: "Prescriptions",
        path: getRoutePath( "patient.prescription" ),
    },
    {
        id: "tab-diagnosis_info",
        icon: "Diagnosis & Info.svg",
        iconType: "image",
        text: "Diagnosis & Info",
        path: getRoutePath( "patient.diagnosis_info" ),
    },
    {
        id: "tab-documents",
        icon: "Documents.svg",
        iconType: "image",
        text: "Documents",
        path: getRoutePath( "patient.documents" ),
    },
    {
        id: "tab-chat_support",
        icon: "chat",
        iconType: "material-icon",
        text: "AI Support",
        childState: false,
        children: [
            {
                id: "tab-ai-chat-support",
                parentId: "tab-chat_support",
                icon: "fiber_manual_record",
                iconType: "material-icon",
                text: "AI Chat Support",
                path: getRoutePath( "patient.ai_supports.chat" ),
            },
            {
                id: "tab-chat-with-agent",
                parentId: "tab-chat_support",
                icon: "fiber_manual_record",
                iconType: "material-icon",
                text: "Chat With Agent",
                path: getRoutePath( "patient.ai_supports.chat_with_agent" ),
            },
        ],
    },

    {
        id: "tab-billing_payments",
        icon: "Billing & Payments.svg",
        iconType: "image",
        text: "Billing & Payments",
        path: getRoutePath( "patient.billing_payments" ),
    },
    {
        id: "tab-security",
        icon: "Security.svg",
        iconType: "image",
        text: "Security",
        path: getRoutePath( "patient.security" ),
    },
]

export default sideMenuPatient