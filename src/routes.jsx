import {
  AIChatSupportPage,
  AIVisitNotesPage,
  ChatWithAgentPage,
  EmailSupportPage,
  PatientAddPage,
  PatientListPage,
} from "./pages/doctor";
import {
  AppointmentAddPage,
  AppointmentPage,
} from "./pages/doctor/appointment";
import {
  AppointmentForm,
  PastPage,
  UpComingPage,
} from "./pages/patient/appointment";
import { ChangePassword, PrivateLayout } from "./components";
import {
  CustomColorThemePage,
  CustomIntegrationPage,
  CustomNotificationPage,
} from "./pages/doctor/cusomization";
import {
  EFaxDeliveryPage,
  EmailDeliveryPage,
} from "./pages/doctor/consultation";
import {
  EditProfilePage,
  PatientProfileLayout,
  ProfilePage,
} from "./pages/patient/profile";
import {
  HippaCompliancePage,
  UserAccessControlPage,
} from "./pages/doctor/security";
import { LoginPage, RegisterPage } from "./pages/auth";
import {
  PatientAppointmentPage,
  PatientCurrentMedicationPage,
  PatientLabReportPage,
  PatientMedicalHistoryPage,
  PatientNotesPage,
  PatientProfilePage,
  PatientVitalsPage,
} from "./pages/doctor/patient";
import {
  PersonalDetailPage,
  ProfessionalInformationPage,
  ScheduleAndAvailabilityPage,
} from "./pages/doctor/profile";
import {
  PrescriptionAddPage,
  PrescriptionListPage,
} from "./pages/doctor/prescription";

import BillingPaymentPage from "./pages/patient/billing/BillingPaymentPage";
import ChatAIPage from "./pages/patient/chat/ChatAIPage";
import DashboardPage from "./pages/doctor/dashboard/DashboardPage";
import DiagnosisInfoPage from "./pages/patient/diagnosis/DiagnosisInfoPage";
import DoctorPage from "./pages/doctor/DoctorPage";
import DoctorProfileLayout from "./pages/doctor/profile/DoctorProfileLayout";
import DocumentPage from "./pages/patient/document/DocumentPage";
import HealthProfilePage from "./pages/patient/health/HealthProfilePage";
import LabResultsPage from "./pages/patient/lab/LabResultsPage";
import { LabsRadiologyPage } from "./pages/doctor/labs-radiology";
import MedicalRecordsPage from "./pages/patient/medic/MedicalRecordsPage";
import PatientAllergiesPage from "./pages/doctor/patient/detail/PatientAllergiesPage";
import PatientDetailLayout from "./pages/doctor/patient/detail/PatientDetailLayout";
import PrescriptionPage from "./pages/patient/prescription/PrescriptionPage";
import RecordingPage from "./pages/doctor/recordings/RecordingPage";
import SecurityPage from "./pages/patient/security/SecurityPage";
import { SuperBillsPage } from "./pages/doctor/super-bills";
import AppointmentEditPage from "./pages/doctor/appointment/AppointmentEditPage";

const privateRoutes = {
  patient: {
    path: "/patient",
    element: <PrivateLayout />,
    childRoutes: {
      dashboard: {
        index: true,
        element: <DashboardPage />,
      },
      appointments: {
        path: "appointments",
        childRoutes: {
          past: {
            index: true,
            path: "past",
            element: <PastPage />,
          },
          upcoming: {
            path: "upcoming",
            element: <UpComingPage />,
          },
          schedule: {
            path: "schedule",
            element: <AppointmentForm />,
          },
        },
      },
      health_profile: {
        path: "health-profile",
        element: <HealthProfilePage />,
      },
      medical_records: {
        path: "medical-records",
        element: <MedicalRecordsPage />,
      },
      lab_results: {
        path: "lab-results",
        element: <LabResultsPage />,
      },
      prescription: {
        path: "prescription",
        element: <PrescriptionPage />,
      },
      documents: {
        path: "documents",
        element: <DocumentPage />,
      },
      diagnosis_info: {
        path: "diagnosis-info",
        element: <DiagnosisInfoPage />,
      },
      ai_supports: {
        path: "ai-supports",
        childRoutes: {
          chat: {
            index: true,
            path: "chat",
            element: <ChatAIPage />,
          },
          chat_with_agent: {
            path: "chat-with-agent",
            element: <ChatWithAgentPage />,
          },
        },
      },
      billing_payments: {
        path: "billing-payments",
        element: <BillingPaymentPage />,
      },
      security: {
        path: "security",
        element: <SecurityPage />,
      },
      profile: {
        path: "profile",
        element: <PatientProfileLayout />,
        childRoutes: {
          personal_details: {
            path: "personal-details",
            element: <ProfilePage />,
          },
          edit_details: {
            path: "edit-details",
            element: <EditProfilePage />,
          },
          change_password: {
            path: "change-password",
            element: <ChangePassword />,
          },
        },
      },
    },
  },
  doctor: {
    path: "/doctor",
    element: <PrivateLayout />,
    childRoutes: {
      dashboard: {
        index: true,
        element: <DashboardPage />,
      },
      recordings: {
        path: "recordings",
        element: <RecordingPage />,
      },
      patients: {
        path: "patients",
        childRoutes: {
          list: {
            index: true,
            path: "list",
            element: <PatientListPage />,
          },
          add: {
            path: "add",
            element: <PatientAddPage />,
          },
          edit: {
            path: "edit/:patientId",
            element: <PatientAddPage />,
          },
          detail: {
            path: ":patientId",
            element: <PatientDetailLayout />,
            childRoutes: {
              personal_details: {
                index: true,
                element: <PatientProfilePage />,
              },
              notes: {
                path: "notes",
                element: <PatientNotesPage />,
              },
              vitals: {
                path: "vitals",
                element: <PatientVitalsPage />,
              },
              allergies: {
                path: "allergies",
                element: <PatientAllergiesPage />,
              },
              medical_history: {
                path: "medical_history",
                element: <PatientMedicalHistoryPage />,
              },
              lab_reports: {
                path: "lab_reports",
                element: <PatientLabReportPage />,
              },
              current_medication: {
                path: "current_medication",
                element: <PatientCurrentMedicationPage />,
              },
              appointment: {
                path: "appointment",
                element: <PatientAppointmentPage />,
              },
            },
          },
        },
      },
      appointments: {
        path: "appointments",
        childRoutes: {
          list: {
            index: true,
            path: "list",
            element: <AppointmentPage />,
          },
          add: {
            path: "add",
            element: <AppointmentAddPage />,
          },
          edit: {
            path: "edit/:id",
            element: <AppointmentEditPage />,
          },
        },
      },
      consultation: {
        path: "consultation",
        childRoutes: {
          efax: {
            index: true,
            path: "efax-delivery",
            element: <EFaxDeliveryPage />,
          },
          email: {
            path: "email-delivery",
            element: <EmailDeliveryPage />,
          },
        },
      },
      prescriptions: {
        path: "prescription",
        childRoutes: {
          list: {
            index: true,
            path: "list",
            element: <PrescriptionListPage />,
          },
          add: {
            path: "add",
            element: <PrescriptionAddPage />,
          },
        },
      },
      labs_radiology: {
        path: "labs-radiology",
        element: <LabsRadiologyPage />,
      },
      ai_supports: {
        path: "ai-support",
        childRoutes: {
          visit_notes: {
            path: "visit-notes",
            index: true,
            element: <AIVisitNotesPage />,
          },
          chat: {
            path: "chat",
            element: <AIChatSupportPage />,
          },
          chat_with_agent: {
            path: "chat-with-agent",
            element: <ChatWithAgentPage />,
          },
          email: {
            path: "email-support",
            element: <EmailSupportPage />,
          },
        },
      },
      doctors: {
        path: "doctors",
        element: <DoctorProfileLayout />,
        childRoutes: {
          personal_details: {
            index: true,
            element: <PersonalDetailPage />,
          },
          professional_information: {
            path: "professional-information",
            element: <ProfessionalInformationPage />,
          },
          schedule_availability: {
            path: "work-schedule",
            element: <ScheduleAndAvailabilityPage />,
          },
          change_password: {
            path: "change-password",
            element: <ChangePassword />,
          },
        },
      },
      super_bills: {
        path: "super-bills",
        element: <SuperBillsPage />,
      },
      customizations: {
        path: "customizations",
        childRoutes: {
          color_theme: {
            index: true,
            path: "color-theme",
            element: <CustomColorThemePage />,
          },
          notification_preferences: {
            path: "notification-preferences",
            element: <CustomNotificationPage />,
          },
          integration: {
            path: "integration",
            element: <CustomIntegrationPage />,
          },
        },
      },
      hippa_compliance: {
        path: "hippa-compliance",
        element: <HippaCompliancePage />,
      },
      user_access_control: {
        path: "user-access-control",
        element: <UserAccessControlPage />,
      },
      profile: {
        path: "profile",
        element: <DoctorProfileLayout />,
        childRoutes: {
          personal_details: {
            path: "personal-details",
            element: <PersonalDetailPage />,
          },
          professional_information: {
            path: "professional-information",
            element: <ProfessionalInformationPage />,
          },
          schedule_availability: {
            path: "work-schedule",
            element: <ScheduleAndAvailabilityPage />,
          },
          change_password: {
            path: "change-password",
            element: <ChangePassword />,
          },
        },
      },
    },
  },
};

const publicRoutes = {
  login: {
    path: "/login",
    element: <LoginPage />,
  },
  register: {
    path: "/register",
    element: <RegisterPage />,
  },
};

const ROUTES = {
  private: privateRoutes,
  public: publicRoutes,
};

export default ROUTES;
