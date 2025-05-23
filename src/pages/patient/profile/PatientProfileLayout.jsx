import { Button, NavLinkButton } from "@src/components";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { PatientCard } from "../components";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { getRoutePath } from "@src/utils/routeUtils";

const PatientProfileLayout = () => {
    const [isShowSubmitBtn, setIsShowSubmitBtn] = useState(true);
    const location = useLocation();
    const isSubmitted = useSelector((state) => state.submission.isSubmitted);
    const dispatch = useDispatch();
    const { pathname } = location;

    useEffect(() => {
        if (pathname.includes("personal-details")) {
            setIsShowSubmitBtn(false);
        } else {
            setIsShowSubmitBtn(true);
        }
    }, [pathname]);

    return (
        <>
            <div className="flex justify-between mb-4 w-full">
                <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 mb-4 w-full">
                    <PatientCard />
                    <div className="bg-white p-3 rounded-2xl col-span-2">
                        <div className="flex gap-3">
                            <div className="text-start w-full">
                                <div className="flex justify-between mb-2">
                                    <h6 className="font-medium text-lg">Next Appointment: </h6>
                                    <a
                                        href=""
                                        className="text-darkBlue text-sm">
                                        Request to Edit
                                    </a>
                                </div>
                                <table className=" w-full text-wrap">
                                    <tbody>
                                        <tr>
                                            <td>Date:</td>
                                            <td>Time:</td>
                                            <td>Doctor:</td>
                                            <td>Reason or Disease:</td>
                                        </tr>
                                        <tr>
                                            <td className="text-muted">August 21, 2024</td>
                                            <td className="text-muted">12:00PM</td>
                                            <td className="text-muted">John Smith</td>
                                            <td className="text-muted">Jaundice</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {isShowSubmitBtn ? (
                        <>
                            <div className="flex flex-col gap-1">
                                <Button
                                    className="md:px-8 md:py-3 px-6 py-2"
                                    size="small"
                                    color="primary"
                                    onClick={() => dispatch({ type: "SUBMISSION/SUBMIT" })}>
                                    {isSubmitted ? (
                                        <SpinnerComponent
                                            color="white"
                                            className="mr-2"
                                        />
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                                <NavLinkButton
                                    to={getRoutePath("patient.profile.personal_details")}
                                    className="md:px-8 md:py-3 px-6 py-2 text-center"
                                    size="small"
                                    color="danger">
                                    Cancel
                                </NavLinkButton>
                            </div>
                        </>
                    ) : (
                        <div>
                            <NavLinkButton
                                to={getRoutePath("patient.profile.edit_details")}
                                className="md:px-8 md:py-3 px-6 py-2"
                                size="small"
                                color="primary">
                                Edit Details
                            </NavLinkButton>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-2xl px-3 py-3">
                <Outlet />
            </div>
        </>
    );
};

export default PatientProfileLayout;
