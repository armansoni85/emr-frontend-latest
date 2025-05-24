import { Button, CardComponent, NavLinkButton, TabBarLayout } from "../../../../components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";
import johnsonImage from "@src/assets/images/johnson.png";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@src/services/userService";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

const PatientDetailLayout = () => {
    const { patientId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: patient, isLoading } = useQuery({
        queryKey: ["patient", patientId],
        queryFn: () => getUserById(patientId),
        enabled: !!patientId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const patientData = patient?.data;

    return (
        <>
            <div className="grid lg:grid-cols-5 gap-4 mb-4">
                <CardComponent className="col-span-2">
                    <div className="flex gap-3">
                        <div className="relative">
                            <img
                                src={patientData?.profile_picture || johnsonImage}
                                className="rounded-xl h-20"
                                alt=""
                            />
                            <div className="absolute cursor-pointer bg-white h-5 w-5 right-1 bottom-2 text-center rounded-full">
                                <i className="material-icons text-gray-500 text-sm cursor-pointer">edit</i>
                            </div>
                        </div>
                        <div className="text-start">
                            <h6 className="text-2xl text-darkBlue font-medium">
                                {patientData?.first_name} {patientData?.last_name}
                            </h6>
                            <div className="flex gap-1">
                                <span>Date of Birth :</span>
                                <span className="text-muted">
                                    {patientData?.dob ? (
                                        <Moment format="MMMM D, YYYY">{patientData.dob}</Moment>
                                    ) : (
                                        "-"
                                    )}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <span>Last Visit :</span>
                                <span className="text-muted">
                                    {patientData?.last_visit ? (
                                        <Moment format="MMMM D, YYYY - h:mmA">
                                            {patientData.last_visit}
                                        </Moment>
                                    ) : (
                                        "-"
                                    )}
                                </span>
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
                                        <td className="text-muted">
                                            {patientData?.next_appointment?.date ? (
                                                <Moment format="MMMM D, YYYY">
                                                    {patientData.next_appointment.date}
                                                </Moment>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="text-muted">
                                            {patientData?.next_appointment?.time || "-"}
                                        </td>
                                        <td className="text-muted">
                                            {patientData?.next_appointment?.doctor || "-"}
                                        </td>
                                        <td className="text-muted">
                                            {patientData?.next_appointment?.reason || "-"}
                                        </td>
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
                        isOutline={true}
                        onClick={() => navigate(getRoutePath("doctor.patients.edit", { patientId }))}>
                        Edit Details
                    </Button>
                </div>
            </div>
            <TabBarLayout>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Personal Details
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.notes", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Notes
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.allergies", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Allergies
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.medical_history", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Medical History
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.lab_reports", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Lab Reports
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.current_medication", { patientId })}
                    color="primary"
                    className={"px-5"}>
                    Current Medications
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.patients.detail.appointment", { patientId })}
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
