import { z } from "zod";

export const UpdateUserSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female", "other"]).default("male"),
    dob: z.string().min(1, "Date of birth is required"), // You can use z.date() if you want to validate as a Date object
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    residentalAddress: z.string().optional(),
    mobileNumber: z.string().optional(),
});

export const AddPatient = z
  .object({
    patientName: z.string().min(1, "Patient Name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    dob: z.date({ required_error: "Date of birth is required" }),
    gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
    doctor: z.string().min(1, "Doctor is required"),
    bloodGroup: z.string().min(1, "Blood group is required"),
    heightFeet: z.number().min(1, "Height (feet) is required"),
    heightInches: z.number().min(0),
    weightFeet: z.number().min(1, "Weight (kg) is required"),
    weightInches: z.number().min(0),
    patientAddress: z.string().min(1, "Patient address is required"),
    disease: z.string().min(1, "Disease is required"),
    password: z.string().min(6, "Password is required"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
