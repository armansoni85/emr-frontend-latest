import { z } from "zod";

export const RegisterSchema = z.object( {
    email: z.string().email( { message: 'Invalid email address' } ),
    password: z
        .string()
        .min( 6, { message: 'Password must be at least 6 characters long' } )
        .max( 20, { message: 'Password must be at most 20 characters long' } ),
    confirmPassword: z
        .string()
        .min( 6, { message: 'Password must be at least 6 characters long' } )
        .max( 20, { message: 'Password must be at most 20 characters long' } ),
    fullName: z.string().min( 1, { message: 'Full name is required' } ),
    role: z.enum( [ '2', '3' ], {
        errorMap: () => ( { message: 'Invalid Data' } ),
    } ),
} ).refine( data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: [ 'confirmPassword' ],
} );