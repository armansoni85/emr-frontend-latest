import { InputWithLabel, MultipleInput } from "@src/components";

const ProfessionalInformationPage = () => {
    return (
        <>
            <div className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 px-3 py-3">
                <div className="">
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Speciality:"}
                        id={"speciality"}
                        type={"text"}
                        value={"Cardiology"}
                        readOnly=""
                    />
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Sub Speciality:"}
                        id={"subSpeciality"}
                        type={"select"}
                        value={"Interventional Cardiology"}
                        readOnly="">
                        <option value={"Interventional Cardiology"}>Interventional Cardiology</option>
                    </InputWithLabel>
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Medical License:"}
                        id={"medicalLicense"}
                        type={"text"}
                        value={"ML123456"}
                        readOnly=""
                    />
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Experience:"}
                        id={"experience"}
                        type={"text"}
                        value={"10 years"}
                        readOnly=""
                    />
                    <MultipleInput
                        wrapperClassName={"mb-4"}
                        label={"Qualification:"}
                        id={"qualification"}
                        defaultList={["MD, Cardiology", "PhD, Medical Science"]}
                    />
                </div>
                <div>
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Residental Address:"}
                        id={"residentialAddress"}
                        type={"textarea"}
                        placeholder={"Enter Address"}
                        value={"867 Shemika Trail, South Rosalbaborough, AR 84252-6233"}
                        readOnly=""
                    />

                    <MultipleInput
                        wrapperClassName={"mb-4"}
                        label={"Certifications:"}
                        id={"certifications"}
                        defaultList={["Board Certified Cardiologist", "Certified Medical Educator"]}
                    />
                </div>
            </div>
        </>
    );
};

export default ProfessionalInformationPage;
