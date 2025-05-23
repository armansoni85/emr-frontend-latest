import { PersonalDetailForm } from "@src/components";

const PatientProfilePage = () => {
    return (
        <>
            <PersonalDetailForm isReadOnly={true} wrapperClassName="bg-white" />
        </>
    );
};

export default PatientProfilePage;
