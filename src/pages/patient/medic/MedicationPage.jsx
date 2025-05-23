import { useSelector } from "react-redux";

const MedicationPage = () => {
    const { showModal } = useSelector((state) => state.modal);

    const handleOpenModal = () => {
        showModal({
            id: "set-reminder-modal",
            title: "Set Reminder",
            content: (
                <>
                    <div className="mt-2 px-4 pt-3 pb-4 sm:pb-4">
                        <div className="mb-3">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white text-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 text-start font-medium">Doctor Name</th>
                                            <th className="py-2 px-4 text-start font-medium text-end">AI Visit Notes Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-body">
                                        <tr>
                                            <td className="py-2 px-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="reminderCheckbox"
                                                        className="form-checkbox h-5 w-5 text-success checked:bg-white"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="reminderCheckbox"
                                                        className="ml-2 text-gray-700">
                                                        To Edit Patient Profile
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-end text-success">Selected</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="reminderCheckbox"
                                                        className="form-checkbox h-5 w-5 text-success checked:bg-white"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="reminderCheckbox"
                                                        className="ml-2 text-gray-700">
                                                        To Set Self Reminders
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-end text-success">Selected</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id="reminderCheckbox"
                                                        className="form-checkbox h-5 w-5 text-success checked:bg-white"
                                                    />
                                                    <label
                                                        htmlFor="reminderCheckbox"
                                                        className="ml-2 text-gray-700">
                                                        To Schedule An Appointment
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-end text-muted">Disabled</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="disease"
                                    className="block text-nowrap my-auto">
                                    Notify Before:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <select
                                        id="disease"
                                        className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full">
                                        <option
                                            value=""
                                            disabled=""
                                            selected="">
                                            30 mins
                                        </option>
                                        {/* Add disease options here */}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mb-4 gap-2">
                                <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                    Set Reminder
                                </button>
                                <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ),
        });
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4 mb-3">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">Current Medications</h2>
                    <a
                        href="#"
                        className="text-primary"
                        onclick="openModal('modalTemplate')">
                        Set Reminder
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-start font-medium">Medicine Name</th>
                                <th className="py-2 px-4 text-start font-medium">Type</th>
                                <th className="py-2 px-4 text-start font-medium">Quantity</th>
                                <th className="py-2 px-4 text-start font-medium">Dosage</th>
                                <th className="py-2 px-4 text-start font-medium">Frequency</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">Amoxicillin</td>
                                <td className="py-2 px-4 border-b">Antibiotic</td>
                                <td className="py-2 px-4 border-b">30</td>
                                <td className="py-2 px-4 border-b">500 mg</td>
                                <td className="py-2 px-4 border-b">3 times a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Lisinopril</td>
                                <td className="py-2 px-4 border-b">Antihypertensive</td>
                                <td className="py-2 px-4 border-b">60</td>
                                <td className="py-2 px-4 border-b">10 mg</td>
                                <td className="py-2 px-4 border-b">Once a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Metformin</td>
                                <td className="py-2 px-4 border-b">Antidiabetic</td>
                                <td className="py-2 px-4 border-b">90</td>
                                <td className="py-2 px-4 border-b">500 mg</td>
                                <td className="py-2 px-4 border-b">Twice a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Atorvastatin</td>
                                <td className="py-2 px-4 border-b">Cholesterol-lowering</td>
                                <td className="py-2 px-4 border-b">45</td>
                                <td className="py-2 px-4 border-b">20 mg</td>
                                <td className="py-2 px-4 border-b">Once a day</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end items-center mt-4 mx-4">
                    <button className="px-6 py-1 text-sm bg-primary border border-primary rounded-full text-white hover:bg-primary hover:text-white transition-all duration-150">
                        Request to Refill
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4 mb-3">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">August 20, 2024 - August 30, 2024</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-start font-medium">Medicine Name</th>
                                <th className="py-2 px-4 text-start font-medium">Type</th>
                                <th className="py-2 px-4 text-start font-medium">Quantity</th>
                                <th className="py-2 px-4 text-start font-medium">Dosage</th>
                                <th className="py-2 px-4 text-start font-medium">Frequency</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">Amoxicillin</td>
                                <td className="py-2 px-4 border-b">Antibiotic</td>
                                <td className="py-2 px-4 border-b">30</td>
                                <td className="py-2 px-4 border-b">500 mg</td>
                                <td className="py-2 px-4 border-b">3 times a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Lisinopril</td>
                                <td className="py-2 px-4 border-b">Antihypertensive</td>
                                <td className="py-2 px-4 border-b">60</td>
                                <td className="py-2 px-4 border-b">10 mg</td>
                                <td className="py-2 px-4 border-b">Once a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Metformin</td>
                                <td className="py-2 px-4 border-b">Antidiabetic</td>
                                <td className="py-2 px-4 border-b">90</td>
                                <td className="py-2 px-4 border-b">500 mg</td>
                                <td className="py-2 px-4 border-b">Twice a day</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Atorvastatin</td>
                                <td className="py-2 px-4 border-b">Cholesterol-lowering</td>
                                <td className="py-2 px-4 border-b">45</td>
                                <td className="py-2 px-4 border-b">20 mg</td>
                                <td className="py-2 px-4 border-b">Once a day</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MedicationPage;
