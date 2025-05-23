import "../AuthStyle.css"; // Import the CSS file for styling

import { Button, InputWithIcon } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../../routes";
import { RegisterSchema } from "./RegisterSchema";
import { registerAction } from "@src/redux/actions/auth/authAction";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../helper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hiddenParams } = useSelector((state) => state.params);

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(RegisterSchema),
        mode: "onBlur",
        shouldUseNativeValidation: false,
        defaultValues: {
            email: "",
            hospital: "93b2ebf5-72dd-4e10-8997-b6d48007b42f",
            password: "",
            confirmPassword: "",
            role: hiddenParams.registerRole || "2",
            country: "IN",
            workEmail: "work3@grr.la",
            gender: "male",
            dob: "1993-10-14",
        },
    });

    const onSubmit = (data) => {
        dispatch(registerAction(data))
            .unwrap()
            .then(() => {
                toast("Registration successful", { type: "success" });
                navigate(ROUTES.public.login.path);
            })
            .catch((error) => {
                toast(error, { type: "error" });
            });
    };

    const onSubmitError = (errors) => {
        console.log(errors); // Handle form errors here
    };

    return (
        <>
            {/* Left Side - Illustration */}
            <div className="w-1/2 justify-center items-center hidden md:flex">
                <img
                    src="./assets/images/login-bg.png"
                    alt="Doctors Illustration"
                    className="max-w-full h-auto"
                />
            </div>
            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-[url('./assets/images/login-vector.png')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-white opacity-[0.95]" />
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10">
                    {/* Title and Subtitle aligned left */}
                    <div className="mb-6">
                        <div className="flex gap-3">
                            <img
                                src="./assets/images/LogoIcon.png"
                                alt=""
                            />
                            <h1 className="text-3xl font-bold text-primary mb-2">MEDAIPRO</h1>
                        </div>
                        <h1 className="2xl:text-3xl font-semibold">Create a New Account</h1>
                        <span className="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, ut.</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                        {/* Email Address */}
                        <InputWithIcon
                            icon="email"
                            type="email"
                            id="email"
                            placeholder="Email Address*"
                            register={register("email")}
                            errors={errors.email}
                            dirtyField={dirtyFields.email}
                        />
                        {/* Full Name */}
                        <InputWithIcon
                            icon="person"
                            type="text"
                            id="fullName"
                            placeholder="Full Name*"
                            register={register("fullName")}
                            errors={errors.fullName}
                            dirtyField={dirtyFields.fullName}
                        />

                        {/* Password */}
                        <InputWithIcon
                            icon="visibility_off"
                            type="password"
                            id="password"
                            placeholder="Password*"
                            register={register("password")}
                            errors={errors.password}
                            dirtyField={dirtyFields.password}
                            onClickIcon={togglePasswordVisibility}
                        />
                        {/* Confirm Password */}
                        <InputWithIcon
                            icon="visibility_off"
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password*"
                            register={register("confirmPassword")}
                            errors={errors.confirmPassword}
                            dirtyField={dirtyFields.confirmPassword}
                            onClickIcon={togglePasswordVisibility}
                        />
                        {/* Create Account Button */}
                        <Button
                            type="submit"
                            color="primary"
                            size="medium"
                            isBold={true}
                            className="w-full">
                            Create an Account
                        </Button>
                    </form>
                    {/* Already have an account */}
                    <p className="text-center text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link
                            to={ROUTES.public.login.path}
                            className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
