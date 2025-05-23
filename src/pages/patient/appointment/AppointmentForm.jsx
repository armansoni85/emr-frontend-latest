import AppointmentDetailPageV1 from "./AppointmentDetailPageV1";
import AppointmentDetailPageV2 from "./AppointmentDetailPageV2";
import AppointmentDetailPageV3 from "./AppointmentDetailPageV3";
import { AppointmentSchedulePage } from ".";
import { useState } from "react";

const AppointmentForm = () => {
    const [showStepForm, setShowStepForm] = useState(false);
    const [showModalFirst, setShowModalFirst] = useState(false);
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1));
        if (step === 1) {
            setShowStepForm(false);
        }
    };

    const handleShowStepForm = () => {
        setStep(1);
        setShowStepForm(true);
        setShowModalFirst(false);
    };

    const handleSubmit = (data, isDirectSubmit = false) => {
        if (showModalFirst) {
            return handleShowStepForm();
        }
        console.log("Submit form data");
    };

    const Form = () => {
        switch (step) {
            case 1:
                return <AppointmentDetailPageV1 />;
            case 2:
                return <AppointmentDetailPageV2 />;
            case 3:
                return <AppointmentDetailPageV3 />;
            default:
                return (
                    <AppointmentSchedulePage
                        onSubmit={handleSubmit}
                        currentStep={step}
                        showModalFirst={showModalFirst}
                    />
                );
        }
    };

    return <Form />;
};

export default AppointmentForm;
