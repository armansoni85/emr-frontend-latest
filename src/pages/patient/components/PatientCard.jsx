import { CardComponent, SquareAvatar } from "@src/components";

import { useSelector } from "react-redux";

const PatientCard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <CardComponent className="col-span-2">
            <div className="bg-white p-3 rounded-2xl col-span-2">
                <div className="flex gap-3">
                    <div className="relative">
                        <SquareAvatar src={user?.profile_picture || "/assets/images/johnson.png"} />
                        <div className="absolute cursor-pointer bg-white h-5 w-5 right-1 bottom-2 text-center rounded-full">
                            <i className="material-icons text-gray-500 text-sm cursor-pointer">edit</i>
                        </div>
                    </div>
                    <div className="text-start">
                        <h6 className="text-2xl text-darkBlue font-medium">
                            {user?.first_name} {user?.last_name}
                        </h6>
                        <div className="flex gap-1 ">
                            <span>Date of Birth :</span>
                            <span className="text-muted">May 20, 2000</span>
                        </div>
                        <div className="flex gap-1 ">
                            <span>Last Visit :</span>
                            <span className="text-muted">August 12, 2025 - 2:00PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardComponent>
    );
};

export default PatientCard;
