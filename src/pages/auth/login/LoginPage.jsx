import "../AuthStyle.css"; // Import the CSS file for styling

import { Button, InputWithIcon } from "../../../components";
import { getUserDetail, loginAction } from "@src/redux/actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { LoginSchema } from "./LoginSchema";
import ROUTES from "../../../routes";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { getRoutePath } from "@src/utils/routeUtils";
import { toast } from "react-toastify";
import { togglePasswordVisibility } from "../../../helper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
    const { loading } = useSelector((state) => state.auth);
    const [loginRole, setLoginRole] = useState("2");
    const dispatch = useDispatch();

    // Initialize React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: "onBlur",
        shouldUseNativeValidation: false,
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
            loginRole: loginRole,
        },
    });

    const handleLoginRoleChange = (role) => {
        setLoginRole(role);
        setValue("loginRole", role);
    };

    const onSubmit = (data) => {
        dispatch(loginAction({ email: data.email, password: data.password, loginRole: data.loginRole }))
            .unwrap()
            .then(() => {
                toast("Login successful", { type: "success" });
                dispatch(getUserDetail());
            })
            .catch((error) => {
                toast(error, { type: "error" });

                setValue("password", "");
            });
    };

    const onSubmitError = (errors) => {
        if (errors.email) {
            toast(`${errors.email.message}`, { type: "error" });
            return;
        }

        if (errors.password) {
            toast(`${errors.password.message}`, { type: "error" });
            return;
        }
        if (errors.loginRole) {
            toast(`${errors.loginRole.message}`, { type: "error" });
            return;
        }
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
                        <h1 className="2xl:text-3xl font-semibold">Log in to Your Account</h1>
                        <span className="text-muted">Enter your email address and password to log in your account</span>
                    </div>
                    {/* Role Selection */}
                    <div className="flex justify-around mb-6">
                        <Button
                            onClick={() => handleLoginRoleChange("1")}
                            color={loginRole === "1" ? "primary" : "grey"}
                            className="font-normal px-8">
                            Admin
                        </Button>
                        <Button
                            onClick={() => handleLoginRoleChange("2")}
                            color={loginRole === "2" ? "primary" : "grey"}
                            className="font-normal px-8">
                            Doctor
                        </Button>
                        <Button
                            onClick={() => handleLoginRoleChange("3")}
                            color={loginRole === "3" ? "primary" : "grey"}
                            className="font-normal px-8">
                            Nurse
                        </Button>
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
                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-blue-600"
                                    {...register("rememberMe")}
                                    // onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="ml-2 text-primary">Remember Me</span>
                            </label>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        {/* Login Button */}
                        <Button
                            type="submit"
                            color="primary"
                            size="medium"
                            isBold={true}
                            className="w-full">
                            {loading ? <SpinnerComponent color="white" /> : "Log In"}
                        </Button>
                    </form>
                    {/* Don't have an account? */}
                    <p className="text-center text-gray-500 mt-4">
                        Don't have an account?{" "}
                        <Link
                            to={getRoutePath("register", {role: loginRole})}
                            onClick={(e) => {
                                dispatch({
                                    type: "SET_HIDDEN_PARAMS",
                                    payload: { registerRole: loginRole, path: getRoutePath("register", {role: loginRole}) },
                                });
                            }}
                            className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
