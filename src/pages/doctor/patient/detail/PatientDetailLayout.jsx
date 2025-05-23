import { Button, CardComponent, NavLinkButton, TabBarLayout } from "../../../../components";

import { Outlet } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";
import johnsonImage from "@src/assets/images/johnson.png";

const PatientDetailLayout = () => {
    return (
        <>
            <div className="grid lg:grid-cols-5 gap-4 mb-4">
                <CardComponent className="col-span-2">
                    <div className="flex gap-3">
                        <div className="relative">
                            <img
                                src={johnsonImage}
                                className="rounded-xl h-20"
                                alt=""
                            />
                            <div className="absolute cursor-pointer bg-white h-5 w-5 right-1 bottom-2 text-center rounded-full">
                                <i className="material-icons text-gray-500 text-sm cursor-pointer">edit</i>
                            </div>
                        </div>
                        <div className="text-start">
                            <h6 className="text-2xl text-darkBlue font-medium">Henry Johnson</h6>
                            <div className="flex gap-1">
                                <span>Date of Birth :</span>
                                <span className="text-muted">May 20, 2000</span>
                            </div>
                            <div className="flex gap-1">
                                <span>Last Visit :</span>
                                <span className="text-muted">August 12, 2025 - 2:00PM</span>
                            </div>
                        </div>
                    </div>
                </CardComponent>
                <CardComponent className="col-span-2">
                    <div className="flex gap-3">
                        <div className="text-start w-full">
                            <div className="flex justify-between mb-2">
                                <h6 className="font-medium text-lg">Next Appointment: </h6>
                                <a
                                    href=""
                                    className="text-darkBlue text-sm">
                                    Edit
                                </a>
                            </div>
                            <table className="w-full text-nowrap">
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
                </CardComponent>
                <div>
                    <Button
                        color="primary"
                        size="medium"
                        className="px-8"
                        isOutline={true}>
                        Edit Details
                    </Button>
                </div>
            </div>
            <TabBarLayout>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Personal Details
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.notes", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Notes
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.allergies", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Allergies
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.medical_history", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Medical History
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.lab_reports", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Lab Reports
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.current_medication", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Current Medications
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.appointment", { patientId: 1 })}
                    color="primary"
                    className={"px-5"}>
                    Appointment &amp; AI Visit Notes
                </NavLinkButton>
            </TabBarLayout>
            <Outlet />
        </>
    );
};

export default PatientDetailLayout;
