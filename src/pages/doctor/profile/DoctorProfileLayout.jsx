import { Button, NavLinkButton, TabBarLayout } from "@src/components";
import { useDispatch, useSelector } from "react-redux";

import { DoctorCard } from "../components";
import { Outlet } from "react-router-dom";
import SpinnerComponent from "@src/components/SpinnerComponent";
import { getRoutePath } from "@src/utils/routeUtils";

const DoctorProfileLayout = () => {
    const isSubmitted = useSelector((state) => state.submission.isSubmitted);
    const dispatch = useDispatch();

    // const [form, setForm] = useState({});

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <div>
                        <div
                            className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                            onclick="goBack()">
                            <i className="material-icons">chevron_left</i>
                        </div>
                    </div>
                    <DoctorCard />
                </div>
                <div>
                    <div className="flex justify-end mb-4 gap-2">
                        <Button
                            color="danger"
                            isOutline={true}
                            className="px-8"
                            onClick={() => dispatch({ type: "SUBMISSION/RESET" })}>
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            className="px-8"
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
                    </div>
                </div>
            </div>
            <TabBarLayout>
                <NavLinkButton
                    to={getRoutePath("doctor.profile.personal_details")}
                    color="primary"
                    className="px-5">
                    Personal Details
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.profile.professional_information")}
                    color="primary"
                    className="px-5">
                    Professional Information
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.profile.schedule_availability")}
                    color="primary"
                    className="px-5">
                    Work Schedule &amp; Availability
                </NavLinkButton>
            </TabBarLayout>
            <Outlet />
        </>
    );
};

export default DoctorProfileLayout;
