import { CardComponent, SquareAvatar } from "@src/components";
import { useSelector } from "react-redux";

const DoctorCard = ({ user, userName }) => {
  const authUser = useSelector((state) => state.auth.user);
  const currentUser = user || authUser;
  const displayName =
    userName ||
    (currentUser
      ? `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim()
      : "Loading...");

  return (
    <CardComponent className="pe-12 col-span-2">
      <div className="flex gap-3">
        <div className="relative">
          <SquareAvatar
            src={currentUser?.profile_picture || "/assets/images/johnson.png"}
          />
          <div className="absolute cursor-pointer bg-white h-5 w-5 right-1 bottom-2 text-center rounded-full">
            <i className="material-icons text-gray-500 text-sm cursor-pointer">
              edit
            </i>
          </div>
        </div>
        <div className="text-start">
          <h6 className="text-2xl text-darkBlue font-medium">
            {displayName || "Unknown Doctor"}
          </h6>
          <div className="flex gap-1 ">
            <span>Doctor ID :</span>
            <span className="text-muted">
              #{currentUser?.id?.slice(0, 6) || "111111"}
            </span>
          </div>
          <div className="flex gap-1 ">
            <span>Department :</span>
            <span className="text-muted">
              {currentUser?.department || "Cardiology"}
            </span>
          </div>
        </div>
      </div>
    </CardComponent>
  );
};

export default DoctorCard;
