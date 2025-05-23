import { z } from "zod";

export const AddAppointmentSchema = z.object({
    patient: z.string().min(1, "Patient is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z
        .string()
        .min(10, "Mobile number must be at least 10 digits"),
    date: z.date({ required_error: "Appointment date is required" }),
    time: z.string().regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Appointment time must be a valid time in HH:mm format"
    ),
    disease: z.string().min(1, "Disease is required"),
    // doctor: z.string().min( 1, "Doctor is required" ),
    reasonOfVisit: z.string().min(1, "Reason of Visit is required"),
});