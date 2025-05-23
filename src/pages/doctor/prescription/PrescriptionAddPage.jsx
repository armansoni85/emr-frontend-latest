const PrescriptionAddPage = () => {
    return (
        <>
            <div className="flex justify-end mb-4 gap-2">
                <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                    Download
                </button>
                <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                    Print
                </button>
                <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                    Cancel
                </button>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex gap-2 items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Schedule New Appointment</h2>
                    <span className="my-auto bg-primary bg-opacity-20 rounded-full p-1 cursor-pointer">
                        <i className="material-icons align-middle">mic</i>
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="patientName"
                            className="block text-nowrap my-auto">
                            Patient's Name:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <input
                                id="patientName"
                                type="text"
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                placeholder="Enter Patient's Name"
                            />
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="doctorName"
                            className="block text-nowrap my-auto">
                            Doctor's Name:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <select
                                id="doctorName"
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full">
                                <option
                                    value=""
                                    disabled=""
                                    selected="">
                                    Select Doctor's Name
                                </option>
                                {/* Add options here */}
                            </select>
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="dob"
                            className="block text-nowrap my-auto">
                            Date of Birth:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <input
                                id="dob"
                                type="date"
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                            />
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="disease"
                            className="block text-nowrap my-auto">
                            Disease:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <select
                                id="disease"
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full">
                                <option
                                    value=""
                                    disabled=""
                                    selected="">
                                    Select Disease
                                </option>
                                {/* Add options here */}
                            </select>
                        </div>
                    </div>
                    <div className="bg-grey rounded-2xl mx-3">
                        <div className="rounded-t-2xl py-3 px-5 border-b flex gap-2">
                            <h6 className="text-xl">Add Medication</h6>
                            <span className="my-auto bg-primary bg-opacity-20 rounded-full p-1 cursor-pointer">
                                <i className="material-icons align-middle">mic</i>
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="pb-3">
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="medicineName"
                                        className="block text-nowrap my-auto">
                                        Medicine Name:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <input
                                            id="medicineName"
                                            type="text"
                                            defaultValue="Paracetamol"
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                            placeholder="Enter Medicine Name"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="type"
                                        className="block text-nowrap my-auto">
                                        Type:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <input
                                            id="type"
                                            type="text"
                                            defaultValue=""
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                            placeholder="Enter Type"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-nowrap my-auto">
                                        Quantity:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <input
                                            id="quantity"
                                            type="number"
                                            defaultValue=""
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                            placeholder="Enter Quantity"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="dosage"
                                        className="block text-nowrap my-auto">
                                        Dosage:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <input
                                            id="dosage"
                                            type="text"
                                            defaultValue="500mg"
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                            placeholder="Enter Dosage"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="frequency"
                                        className="block text-nowrap my-auto">
                                        Frequency:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <input
                                            id="frequency"
                                            type="text"
                                            defaultValue="Twice a day"
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                            placeholder="Enter Frequency"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button className="px-4 py-3 text-sm bg-primary border border-primary rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150">
                                    Add Current Medication
                                </button>
                                <button
                                    onclick="openModal('modalAlert')"
                                    className="px-4 py-3 text-sm bg-primary border border-primary rounded-full text-white hover:bg-opacity-[0.9] transition-all duration-150">
                                    Send Pharmacy
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-grey rounded-2xl mx-3">
                        <div className="rounded-t-2xl py-3 px-5 border-b">
                            <h6 className="text-xl">Current Medication List</h6>
                        </div>
                        <div className="p-6">
                            <ol className="list-decimal ps-3">
                                <li className="ps-3 mb-4">
                                    <div className="relative bg-white text-body rounded-full px-5 py-3">
                                        <span>Paracetamol</span>
                                        <span className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer">Once a Day</span>
                                    </div>
                                </li>
                                <li className="ps-3 mb-4">
                                    <div className="relative bg-white text-body rounded-full px-5 py-3">
                                        <span>Ibuprofen</span>
                                        <span className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer">Twice a Day</span>
                                    </div>
                                </li>
                                <li className="ps-3 mb-4">
                                    <div className="relative bg-white text-body rounded-full px-5 py-3">
                                        <span>Amoxicillin</span>
                                        <span className="bg-grey rounded-full px-5 py-2 absolute right-1 top-[4px] cursor-pointer">
                                            Three times a Day
                                        </span>
                                    </div>
                                </li>
                            </ol>
                            <div id="result-pharmacy">
                                <div className="mb-4 grid lg:grid-cols-3">
                                    <label
                                        htmlFor="pharmacy_notes"
                                        className="block text-nowrap my-auto">
                                        Pharmacy Notes:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <textarea
                                            id="pharmacy_notes"
                                            type="text"
                                            className="text-body focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-lg"
                                            placeholder="Enter Pharmacy Notes"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrescriptionAddPage;
