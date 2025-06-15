import { PersonalDetailForm } from "@src/components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById } from "@src/services/userService";
import SpinnerComponent from "@src/components/SpinnerComponent";

const PatientProfilePage = () => {
  const { patientId } = useParams();

  const {
    data: patientData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getUserById(patientId),
    enabled: !!patientId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerComponent />
      </div>
    );
  }

  if (isError || !patientData?.success) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading patient data
      </div>
    );
  }

  return (
    <>
      <PersonalDetailForm
        isReadOnly={true}
        wrapperClassName="bg-white"
        userData={patientData.data}
      />
    </>
  );
};

export default PatientProfilePage;
