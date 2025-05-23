import { PersonalDetailForm } from "@src/components";

const PersonalDetailPage = () => {
    return (
        <>
            <PersonalDetailForm
                isReadOnly={false}
                wrapperClassName="bg-white rounded-2xl"
            />
        </>
    );
};

export default PersonalDetailPage;
