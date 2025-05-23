const PatientMedicalDetailPage = () => {
    return (
        <>
            <div className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 p-6">
                <div className="col-span-2 bg-grey mb-2 rounded-2xl">
                    <div className="grid lg:grid-cols-2 p-3">
                        <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                            <label
                                htmlFor="bloodGroup"
                                className="block text-nowrap my-auto">
                                Consulting Doctor:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="bloodGroup"
                                    className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Edna Gilbert
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                            <label
                                htmlFor="bloodGroup"
                                className="block text-nowrap my-auto">
                                For (Disease or Allergy)
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="bloodGroup"
                                    className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Jaundice
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="bloodGroup"
                        className="block text-nowrap my-auto">
                        Blood Group:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="bloodGroup"
                            type="text"
                            defaultValue="O+"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Blood Group"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="bloodPressure"
                        className="block text-nowrap my-auto">
                        Blood Pressure:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="bloodPressure"
                            type="text"
                            defaultValue="120/80 mmHg"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Blood Pressure"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="weight"
                        className="block text-nowrap my-auto">
                        Weight:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="weight"
                            type="text"
                            defaultValue="56.600Kg"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Weight"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="heartRate"
                        className="block text-nowrap my-auto">
                        Heart Rate:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="heartRate"
                            type="text"
                            defaultValue="72bpm"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Heart Rate"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="height"
                        className="block text-nowrap my-auto">
                        Height:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="height"
                            type="text"
                            defaultValue="5feet 8inches"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Height"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="respiratoryRate"
                        className="block text-nowrap my-auto">
                        Respiratory Rate:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="respiratoryRate"
                            type="text"
                            defaultValue="16 breaths/min"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Respiratory Rate"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="smokingStatus"
                        className="block text-nowrap my-auto">
                        Smoking Status:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="smokingStatus"
                            type="text"
                            defaultValue="Non-Smoker"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Smoking Status"
                        />
                    </div>
                </div>
                <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                    <label
                        htmlFor="temperature"
                        className="block text-nowrap my-auto">
                        Temperature:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <input
                            readOnly=""
                            id="temperature"
                            type="text"
                            defaultValue="98.6F"
                            className="focus:outline-none w-full mt-1 px-5 py-3  border rounded-full"
                            placeholder="Enter Temperature"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientMedicalDetailPage;
